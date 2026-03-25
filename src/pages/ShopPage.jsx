import React, { useEffect, useState } from 'react';
import { ShoppingCart, Info, Flower, Plus } from 'lucide-react';
import { api } from "../api/index";
import ImageModal from "../components/imageModal";
import './ShopPage.scss';


const ShopPage = () => {
    const [flowers, setFlowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedImage,  setSelectedImage ] = useState(null);

    useEffect(() => {
    const loadFlowers = async () => {
      try {
        setLoading(true);
        const data = await api.getFlowers();
        setFlowers(data);
     } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
            loadFlowers();
  }, []); 


  if (error) return (
    <div className="page" style={{textAlign:'center', padding:'50px'}}>
      <h2 style={{color: '#ef4444'}}>Ошибка: {error}</h2>
      <p>Убедитесь, что сервер бэкенда запущен</p>
    </div>
  );

  return (
    <div className="page">
      <header className="header">
        <div className="header__inner">
          <div className="brand">FLOWER STORE</div>
          <button className="btn btn--primary">
            <ShoppingCart size={18} /> Корзина
          </button>
        </div>
      </header>

      <main className="container">
        <div className="toolbar">
          <h1 className="title">Каталог цветов</h1>
          <span className="badge">{flowers.length} в наличии</span>
        </div>

        <div className="shopGrid">
          {flowers.map((item) => (
            <div key={item.id || item._id} className="productCard">
              <img 
                src={item.image.startsWith('http') ? item.image : `http://localhost:5001${item.image}`} 
                alt={item.name} 
                onClick = {() => setSelectedImage(item.image)}
                style={{ cursor: 'pointer'}}
                className="productCard__image" 
              />
              <div className="productCard__content">
                <div style={{display:'flex', justifyContent:'space-between'}}>
                  <h3 className="productCard__title">{item.name}</h3>
                  <span className="productCard__price">{item.price}₽</span>
                </div>
                <p style={{fontSize:'14px', opacity:0.7, margin:'10px 0'}}>
                  {item.description}
                </p>
                <button className="btn btn--primary" style={{marginTop:'auto'}}>
                  Купить
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
          {selectedImage && (
          <ImageModal 
          imageUrl={selectedImage.startsWith('http') ? selectedImage : `http://localhost:5001${selectedImage}`} 
          onClose={() => setSelectedImage(null)} 
          />
)}
    </div>
  );
};

export default ShopPage;