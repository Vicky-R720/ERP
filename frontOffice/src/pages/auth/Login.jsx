import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../../components/ui/Card.jsx'
import { Input } from '../../components/ui/Input.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { Link } from "react-router-dom";
import axios from "axios";

export function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const from = location.state?.from?.pathname ?? '/'

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem("token", response.data.token);
      window.dispatchEvent(new Event("storage"));
      alert("Login reussi")

      console.log(localStorage.getItem("token"));
      
      navigate(from, {replace: true});
      console.log("NAVIGATE OK");
    } catch (error) {
      console.log(error);
      alert("Erreur login")
    }
  };

  return (
    <div className="auth">
      <Card className="auth__card">
        <h1 className="page__title">Login</h1>
        <p className="page__muted">Sign in to access the ERP.</p>

        <form
          className="form"
          onSubmit={handleLogin}
        >
          <label className="label">
            Email
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              required
            />
          </label>

          <label className="label">
            Password
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              required
            />
          </label>

          <label className="checkbox">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember me
          </label>

          <Button type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>

          <div className="auth__links">
            <Link to="/auth/forgot">Forgot password?</Link>
            <span>•</span>
            <Link to="/auth/register">Create account</Link>
          </div>
        </form>
      </Card>
    </div>
  )
}
