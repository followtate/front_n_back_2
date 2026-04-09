<<<<<<< HEAD
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";
import { api } from "../api/index";
import "./LoginPage.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.loginUser(form);
      console.log("Login Success:", response);

      navigate("/shop");
    } catch (err) {
      setError(
        err.response?.data?.message || "Ошибка входа. Проверьте данные.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <header className="header">
        <div className="header__inner">
          <div className="brand">FLOWER STORE</div>
        </div>
      </header>

      <main className="container">
        <div className="auth-container">
          <div className="auth-card">
            <h1>Вход</h1>
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="input-group">
                <User size={18} />
                <input
                  type="text"
                  placeholder="Логин"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  disabled={loading}
                  required
                />
              </div>
              <div className="input-group">
                <Lock size={18} />
                <input
                  type="password"
                  placeholder="Пароль"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  disabled={loading}
                  required
                />
              </div>

              {error && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "14px",
                    marginBottom: "10px",
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="btn btn--primary"
                disabled={loading}
              >
                {loading ? "Загрузка..." : "Продолжить"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';
import { api } from "../api/index"; 
import './LoginPage.scss';

const LoginPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
           
            const response = await api.loginUser(form);
            console.log("Login Success:", response);
            
            navigate('/shop'); 
        } catch (err) {
           
            setError(err.response?.data?.message || "Ошибка входа. Проверьте данные.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <header className="header">
                <div className="header__inner">
                    <div className="brand">FLOWER STORE</div>
                </div>
            </header>

            <main className="container">
                <div className="auth-container">
                    <div className="auth-card">
                        <h1>Вход</h1>
                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="input-group">
                                <User size={18} />
                                <input 
                                    type="text" 
                                    placeholder="Логин" 
                                    value={form.username} 
                                    onChange={(e) => setForm({...form, username: e.target.value})}
                                    disabled={loading}
                                    required 
                                />
                            </div>
                            <div className="input-group">
                                <Lock size={18} />
                                <input 
                                    type="password" 
                                    placeholder="Пароль" 
                                    value={form.password} 
                                    onChange={(e) => setForm({...form, password: e.target.value})}
                                    disabled={loading}
                                    required 
                                />
                            </div>
                            
                            {error && (
                                <p style={{color: '#ef4444', fontSize: '14px', marginBottom: '10px'}}>
                                    {error}
                                </p>
                            )}

                            <button 
                                type="submit" 
                                className="btn btn--primary" 
                                disabled={loading}
                            >
                                {loading ? "Загрузка..." : "Продолжить"}
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LoginPage;
>>>>>>> 7cf8fb48272148dcc2c81ba0d57d597dfcda47d5
