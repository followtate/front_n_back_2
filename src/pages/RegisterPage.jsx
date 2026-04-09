<<<<<<< HEAD
import React, { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.scss";

const RegisterPage = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwods don't match");
      return;
    }
    try {
      const response = await api.registerUser({
        username: form.username,
        password: form.password,
      });
      alert("Account created! You can now login.");
      navigate("/login");
    } catch (err) {
      console.dir(err);

      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Check if Server is running on port 5001";

      alert(`Registration failed: ${errorMsg}`);
    }
  };

  return (
    <div className="page">
      <header className="header">
        <div className="header__inner">
          <div className="brand">FLOWER SHOP</div>
        </div>
      </header>

      <main className="main">
        <div className="authCard">
          <h2 className="authCard__title">Создать новый аккаунт</h2>

          <form onSubmit={handleSubmit} className="form">
            <div className="formGroup">
              <label>Имя пользователя</label>
              <input
                type="text"
                placeholder="Enter username"
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>

            <div className="formGroup">
              <label>Пароль</label>
              <input
                type="password"
                placeholder="Enter password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <div className="formGroup">
              <label>Подтвердить пароль</label>
              <input
                type="password"
                placeholder="Confirm password"
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                required
              />
            </div>
            <button type="submit" className="btn btn--primary">
              Создать аккаунт
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
=======
import React, { useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.scss';

const RegisterPage = () => {
    const [form, setForm] = useState({ username: '', password: '' ,confirmPassword: ''});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if( form.password  !== form.confirmPassword){
            alert("Passwods don't match");
            return;
        }
        try {
            const response = await api.registerUser({ 
            username: form.username, 
            password: form.password 
        });
            alert("Account created! You can now login.");
            navigate('/login');
        } catch (err) {
    console.dir(err); 
    
    
    const errorMsg = err.response?.data?.message || 
                     err.response?.data?.error || 
                     err.message || 
                     "Check if Server is running on port 5001";
                     
    alert(`Registration failed: ${errorMsg}`);
}
    };

    return (
        <div className="page">
            <header className="header">
                <div className="header__inner">
                    <div className="brand">FLOWER SHOP</div>
                </div>
            </header>

            <main className="main">
                <div className="authCard">
                    <h2 className="authCard__title">Создать новый аккаунт</h2>
                    
                    <form onSubmit={handleSubmit} className="form">
                        <div className="formGroup">
                            <label>Имя пользователя</label>
                            <input 
                                type="text" 
                                placeholder="Enter username" 
                                onChange={e => setForm({...form, username: e.target.value})} 
                                required
                            />
                        </div>
                        
                        <div className="formGroup">
                            <label>Пароль</label>
                            <input 
                                type="password" 
                                placeholder="Enter password" 
                                onChange={e => setForm({...form, password: e.target.value})} 
                                required
                            />
                        </div>
                        
                        <div className="formGroup">
                            <label>Подтвердить пароль</label>
                            <input
                            type="password"
                            placeholder="Confirm password"
                            onChange={e => setForm({...form, confirmPassword: e.target.value})} 
                            required
                            />
                        </div>
                        <button type="submit" className="btn btn--primary">
                            Создать аккаунт
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default RegisterPage;
>>>>>>> 7cf8fb48272148dcc2c81ba0d57d597dfcda47d5
