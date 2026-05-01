import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Card } from '../../components/ui/Card.jsx'
import { Input } from '../../components/ui/Input.jsx'
import { Button } from '../../components/ui/Button.jsx'
import axios from "axios";

export function Register() {

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:8080/api/auth/register", {
        nom: name,
        email,
        password
      }
      )
      navigate("/auth/login");
    } catch (error) {

      console.log(error);
      console.log(error.response?.data);
      console.log(error.response?.status);
      alert("Erreur inscription");

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="auth">
      <Card className="auth__card">
        <h1 className="page__title">Register</h1>
        <p className="page__muted">Create a new account (demo only).</p>

        <form
          className="form"
          onSubmit={handleRegister}
        >
          <label className="label">
            Name
            <Input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label className="label">
            Email
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </label>
          <label className="label">
            Password
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </label>

          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create account'}
          </Button>

          <div className="auth__links">
            <Link to="/auth/login">Back to login</Link>
          </div>
        </form>
      </Card>
    </div>
  )
}
