# Intégration React (Vite) ↔ Spring Boot (JWT) — Procédure complète

Ce guide explique **la procédure de bout en bout** pour intégrer :
- un backend Spring Boot (REST + Spring Security + JWT) dans `backOffice`
- un frontend React (Vite + React Router) dans `frontOffice`

L’objectif est de comprendre **l’ordre des étapes**, **pourquoi elles existent**, et **où est le code** dans ton projet.

---

## 0) Vue d’ensemble (le scénario complet)

### Le flux “Login”
1. L’utilisateur remplit le formulaire React (email + password)
2. React appelle `POST /api/auth/login` (backend)
3. Le backend vérifie les identifiants (DB + BCrypt)
4. Le backend génère un JWT et renvoie `{ token, tokenType, user }`
5. Le frontend stocke `token` (localStorage/sessionStorage)
6. Le frontend redirige vers la page demandée (ex: `/`) 
7. Pour toutes les API protégées ensuite : le frontend envoie `Authorization: Bearer <token>`

### Le flux “Register”
1. React appelle `POST /api/auth/register` avec `{ nom, email, password }`
2. Le backend crée l’utilisateur + rôle par défaut
3. Le backend renvoie `{ token, tokenType, user }` (souvent auto-login)
4. Le frontend stocke `token` + redirige

---

## 1) Backend — le contrat des endpoints (ce que le front doit envoyer/recevoir)

### 1.1 Endpoints
- `POST /api/auth/login`
- `POST /api/auth/register`

Où :
- `backOffice/src/main/java/com/auth/controller/AuthController.java`

### 1.2 JSON attendu (Request DTO)
**Login** :
```json
{ "email": "...", "password": "..." }
```
Où :
- `backOffice/src/main/java/com/auth/dto/LoginRequestDto.java`

**Register** :
```json
{ "nom": "...", "email": "...", "password": "..." }
```
Où :
- `backOffice/src/main/java/com/auth/dto/RegisterRequestDto.java`

### 1.3 JSON renvoyé (Response DTO)
Le backend renvoie :
```json
{ "token": "...", "tokenType": "Bearer", "user": { ... } }
```
Où :
- `backOffice/src/main/java/com/auth/dto/AuthResponseDto.java`

---

## 2) Backend — logique métier (validation + erreurs)

Où :
- `backOffice/src/main/java/com/auth/service/AuthService.java`

### 2.1 Login
Ce que fait le backend :
- cherche l’utilisateur par email
- vérifie que le compte est activé (`enabled`)
- compare le mot de passe (`BCryptPasswordEncoder.matches`)

Erreurs typiques :
- `401 UNAUTHORIZED` → identifiants invalides
- `403 FORBIDDEN` → compte désactivé

### 2.2 Register
Ce que fait le backend :
- refuse si l’email existe déjà (`409 CONFLICT`)
- crée ou récupère le rôle par défaut (ex: `USER`)
- encode le password en BCrypt

---

## 3) Backend — JWT (génération et validation)

### 3.1 Génération du token
Où :
- `backOffice/src/main/java/com/auth/service/JwtService.java`

Le token contient :
- `subject` = email
- `issuedAt` / `expiration`
- claims `roles` et `permissions`

### 3.2 Validation du token dans les requêtes protégées
Où :
- `backOffice/src/main/java/com/auth/security/JwtAuthenticationFilter.java`

La procédure :
1. Le filtre lit `Authorization`
2. Attend un format `Bearer <token>`
3. Extrait le token
4. Extrait le username (email) depuis le JWT
5. Vérifie validité/expiration
6. Charge l’utilisateur et met une authentification dans `SecurityContext`

---

## 4) Backend — Spring Security (qui est protégé et qui est public)

Où :
- `backOffice/src/main/java/com/auth/security/SecurityConfig.java`

Tu as :
- `/api/auth/**` → `permitAll()` (accessible sans token)
- tout le reste → `authenticated()` (token obligatoire)

Règles :
- Le backend est stateless (`SessionCreationPolicy.STATELESS`)
- CSRF désactivé (classique pour une API JWT)

---

## 5) Backend — CORS (la procédure “invisible” qui casse tout si oubliée)

Pourquoi ?
- En dev, React tourne souvent sur `http://localhost:5173` et Spring sur `http://localhost:8080`.
- Le navigateur bloque les appels si le backend n’autorise pas l’origine (CORS).

Où :
- `backOffice/src/main/java/com/auth/config/CorsConfig.java`

Ce que ça fait :
- autorise `http://localhost:5173`
- autorise méthodes et headers

Règle pratique :
- Si tu hardcode `http://localhost:8080` dans le front, il te faut CORS.
- Si tu utilises un proxy Vite, tu peux éviter CORS en dev.

---

## 6) Frontend — React Router + protection des routes

### 6.1 Où sont définies les routes
Où :
- `frontOffice/src/App.jsx`

Ton app met la majorité des pages derrière :
```jsx
<Route element={<RequireAuth />}> ... </Route>
```

### 6.2 Le guard (RequireAuth)
Où :
- `frontOffice/src/app/RequireAuth.jsx`

Procédure :
1. Lire le token depuis `localStorage` (ex: clé `token`)
2. Si pas de token → rediriger vers `/auth/login`
3. Sauvegarder la route d’origine via `state: { from: location }`

Pourquoi `state.from` ?
- Pour revenir automatiquement à la page demandée après login.

---

## 7) Frontend — appeler le backend (Login)

Où :
- `frontOffice/src/pages/auth/Login.jsx`

Procédure recommandée :
1. Récupérer `location` depuis `useLocation()` (react-router)
2. Calculer `from = location.state?.from?.pathname ?? '/'`
3. Faire `POST /api/auth/login` (axios/fetch)
4. Sauver `token` dans le storage
5. `navigate(from, { replace: true })`

⚠️ Point important :
- `location` doit venir de `useLocation()`.
- `window.location` (API navigateur) n’a pas `state.from`.

---

## 8) Frontend — la suite après login : appeler les APIs protégées

Après login, le backend protège toutes les routes (sauf `/api/auth/**`).
Donc pour appeler une API protégée tu dois envoyer le header :

```http
Authorization: Bearer <token>
```

Exemple axios (simple) :
```js
const token = localStorage.getItem('token')

await axios.get('http://localhost:8080/api/products', {
  headers: { Authorization: `Bearer ${token}` },
})
```

### 8.1 Pourquoi ce n’est pas suffisant (en vrai projet)
Si tu fais ça endpoint par endpoint :
- tu vas forcément oublier le header sur une route → `401 Unauthorized`
- tu vas dupliquer `http://localhost:8080` et la config un peu partout
- tu vas répéter la même gestion d’erreurs (ex: token expiré → logout)

La bonne pratique : **1 seul client API** pour toute l’app.

### 8.2 Solution recommandée : une instance axios `api` + interceptors

#### A) Le fichier du client API
Où :
- `frontOffice/src/app/api.jsx`

Ce fichier crée une instance axios avec :
- `baseURL` → tu n’écris plus `http://localhost:8080/api` partout
- un **request interceptor** → ajoute automatiquement `Authorization: Bearer <token>` sur toutes les requêtes
- un **response interceptor** → si `401`, supprime le token et renvoie vers `/auth/login`

Code (référence) :
```jsx
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/api",
  // si tu mets un proxy Vite plus tard, tu peux remplacer par: baseURL: "/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.assign("/auth/login");
    }
    return Promise.reject(err);
  },
);
```

#### B) Comment l’utiliser (très important)
Principe : au lieu de faire `axios.get("http://localhost:8080/api/..." )`, tu fais :

```js
import { api } from "../app/api";

const res = await api.get("/products");
// appelle automatiquement GET http://localhost:8080/api/products
// et ajoute Authorization si token présent
```

Tu peux l’utiliser pour :
- endpoints publics (ex: `/auth/login`) → pas besoin de token, l’interceptor n’ajoute rien si token absent
- endpoints protégés (ex: `/products`, `/users`) → le token est ajouté automatiquement

#### C) Exemple : Login avec `api`
Dans `frontOffice/src/pages/auth/Login.jsx`, remplace :
- `axios.post("http://localhost:8080/api/auth/login", ...)`
par :

```js
import { api } from "../../app/api";

const response = await api.post("/auth/login", {
  email,
  password,
});

localStorage.setItem("token", response.data.token);
```

#### D) Exemple : appeler une API protégée (après login)
```js
import { api } from "../../app/api";

export async function fetchProducts() {
  const res = await api.get("/products");
  return res.data;
}
```

Ce qui se passe derrière :
- `api.get("/products")` → requête vers `/api/products`
- l’interceptor lit `localStorage.token`
- si présent → ajoute `Authorization: Bearer <token>`
- si le backend répond `401` → token supprimé + redirection login

Règle de qualité (très importante) :
- Centralise tes appels API dans un seul fichier (ex: `api.js`) ou une instance axios + interceptor.
- Sinon tu vas oublier le header sur certains endpoints.

---

## 9) Frontend — AuthProvider (attention au “mode demo”)

Où :
- `frontOffice/src/app/auth.jsx`

Actuellement ton `AuthProvider` est un template “demo” (il fabrique un user en local et ne connaît pas le token).

Conséquences possibles :
- La Topbar peut afficher “Guest” même si tu es connecté (token présent)
- Le bouton logout peut ne pas supprimer `localStorage.token`

Où l’UI utilise `AuthProvider` :
- `frontOffice/src/components/layout/Topbar.jsx`

Règle :
- Décide une stratégie claire :
  - **Stratégie simple** : tout se base sur le token (RequireAuth + logout supprime token)
  - **Stratégie propre** : AuthProvider stocke `{ token, user }` et tout le UI se base dessus

---

## 10) Checklist de debug (quand ça ne marche pas)

### Login OK mais pas de redirection
- Est-ce que `RequireAuth` re-redirige vers `/auth/login` ?
- Est-ce que le token est bien stocké ? (`localStorage.getItem('token')`)
- Est-ce que tu utilises bien `useLocation()` pour `from` ?

### Appels API protégés renvoient 401
- Est-ce que tu envoies bien `Authorization: Bearer <token>` ?
- Est-ce que le token est expiré ?
- Est-ce que l’endpoint est bien protégé par Spring Security ?

### Erreur CORS
- Si tu appelles `http://localhost:8080` depuis le front : vérifier `CorsConfig`
- Sinon mettre un proxy Vite et appeler `/api/...`

---

## 11) Règles à suivre (résumé)

- Ne hardcode pas le backend partout : utilise un client API central.
- Toujours envoyer `Authorization: Bearer <token>` sur les routes protégées.
- Le guard lit le token et redirige vers login avec `state.from`.
- Après login, rediriger vers `from` avec `replace: true`.
- CORS (si origines différentes) ou proxy Vite (en dev).

---

Si tu veux, je peux te proposer une structure “propre” (un fichier `api.js` + axios interceptors + `logout` qui supprime token) pour que tous les modules (products, customers, stock, etc.) soient faciles à intégrer.
