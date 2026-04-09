import React, { useEffect, useState } from "react";
import "./AdminPage.scss"; 
import FlowerList from "../components/flowerList";
import FlowerModal from "../components/flowerModal";
import { api } from "../api/index";

export default function AdminPage() {
    const [flowers, setFlowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState({ open: false, mode: "create", data: null });

    useEffect(() => { load(); }, []);

    const load = async () => {
        try {
            const data = await api.getFlowers();
            setFlowers(data);
        } finally { setLoading(false); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Удалить?")) {
            await api.deleteFlower(id);
            setFlowers(prev => prev.filter(f => f.id !== id));
        }
    };

    const handleSubmit = async (payload) => {
        if (modal.mode === "create") {
            const res = await api.createFlower(payload);
            setFlowers(prev => [...prev, res]);
        } else {
            const res = await api.updateFlower(payload.id, payload);
            setFlowers(prev => prev.map(f => f.id === payload.id ? res : f));
        }
        setModal({ open: false, mode: "create", data: null });
    };

    return (
        <div className="page">
            <header className="header">
                <div className="header__inner"><div className="brand">FLOWER SHOP</div></div>
            </header>
            <main className="main">
                <div className="container">
                    <div className="toolbar">
                        <h1 className="title">Ассортимент</h1>
                        <button className="btn btn--primary" onClick={() => setModal({ open: true, mode: "create", data: null })}>+ Добавить</button>
                    </div>
                    {loading ? <div>Загрузка...</div> : 
                    <FlowerList flowers={flowers} onDelete={handleDelete} onEdit={(f) => setModal({ open: true, mode: "edit", data: f })} />}
                </div>
            </main>
            <FlowerModal open={modal.open} mode={modal.mode} initialUser={modal.data} onClose={() => setModal({ ...modal, open: false })} onSubmit={handleSubmit} />
        </div>
    );
}
