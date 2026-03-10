import React from "react";
import FlowerItem from "./flowerItem";

export default function FlowerList({ flowers, onEdit, onDelete }) {
    if (!flowers.length) return <div className="empty">Товаров нет</div>;
    return (
        <div className="list">
            {flowers.map(f => (
                <FlowerItem key={f.id} flower={f} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </div>
    );
}
