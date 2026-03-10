import React, { useEffect, useState } from "react";

export default function FlowerModal({ open, mode, initialUser, onClose, onSubmit }) {
    const [form, setForm] = useState({ name: "", category: "", price: "", count: "", description: "" });

    useEffect(() => {
        if (open) setForm(initialUser || { name: "", category: "", price: "", count: "", description: "" });
    }, [open, initialUser]);

    if (!open) return null;

    return (
        <div className="backdrop" onMouseDown={onClose}>
            <div className="modal" onMouseDown={e => e.stopPropagation()}>
                <div className="modal__header">
                    <strong>{mode === "edit" ? "Редактировать" : "Добавить"} цветок</strong>
                    <button className="btn" onClick={onClose}>✕</button>
                </div>
                <form className="form" onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>
                    <label className="label">Название <input className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required /></label>
                    <label className="label">Категория <input className="input" value={form.category} onChange={e => setForm({...form, category: e.target.value})} required /></label>
                    <label className="label">Цена <input className="input" type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required /></label>
                    <label className="label">Кол-во <input className="input" type="number" value={form.count} onChange={e => setForm({...form, count: e.target.value})} required /></label>
                    <div className="modal__footer">
                        <button type="button" className="btn" onClick={onClose}>Отмена</button>
                        <button type="submit" className="btn btn--primary">Сохранить</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
