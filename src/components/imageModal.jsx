import React from 'react';
import { X } from 'lucide-react';

export default function ImageModal({ imageUrl, onClose }) {
    if (!imageUrl) return null;

    return (
        <div 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                cursor: 'pointer'
            }}
            onClick={onClose}
        >
           
            <button 
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    padding: '10px'
                }}
                onClick={onClose}
            >
                <X size={40} strokeWidth={1.5} />
            </button>

           
            <img 
                src={imageUrl} 
                alt="Увеличенное фото" 
                style={{
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    cursor: 'default'
                }}
                onClick={(e) => e.stopPropagation()} 
            />
        </div>
    );
}
