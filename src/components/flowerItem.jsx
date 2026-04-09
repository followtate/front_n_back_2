import React from "react";

export default function FlowerItem({ flower, onEdit, onDelete }) {
<<<<<<< HEAD
  return (
    <div className="userRow">
      <div className="userMain">
        <span className="userId">#{flower.id}</span>
        <span className="userName">{flower.name}</span>
        <span>{flower.category}</span>
        <span className="userAge">{flower.price} ₽</span>
        <span>Запас: {flower.count}</span>
      </div>
      <div className="userActions">
        <button className="btn" onClick={() => onEdit(flower)}>
          Ред.
        </button>
        <button className="btn btn--danger" onClick={() => onDelete(flower.id)}>
          Удалить
        </button>
      </div>
    </div>
  );
=======
    return (
        <div className="userRow">
            <div className="userMain">
                <span className="userId">#{flower.id}</span>
                <span className="userName">{flower.name}</span>
                <span>{flower.category}</span>
                <span className="userAge">{flower.price} ₽</span>
                <span>Запас: {flower.count}</span>
            </div>
            <div className="userActions">
                <button className="btn" onClick={() => onEdit(flower)}>Ред.</button>
                <button className="btn btn--danger" onClick={() => onDelete(flower.id)}>Удалить</button>
            </div>
        </div>
    );
>>>>>>> 7cf8fb48272148dcc2c81ba0d57d597dfcda47d5
}
