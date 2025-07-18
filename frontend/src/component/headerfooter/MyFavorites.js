import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import './favorite.css'; // style this as needed

const MyFavorites = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchFavorites(currentUser.uid);
      } else {
        setUser(null);
        setFavorites([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchFavorites = async (userId) => {
    try {
      const res = await fetch(`https://motomartbackend.onrender.com/api/favorites/${userId}`);
      const data = await res.json();
      console.log("🔎 Fetched favorites:", data);
      setFavorites(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch favorites:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="fav-page">Please log in to view your favorites.</div>;
  }

  if (loading) {
    return <div className="fav-page">Loading your favorites...</div>;
  }

  return (
    <div className="fav-page">
      <h2>❤️ My Favorite Vehicles</h2>

      {Array.isArray(favorites) && favorites.length > 0 ? (
        <div className="fav-grid">
          {favorites.map((fav) => (
            <div key={fav._id} className="fav-card">
              <img src={fav.image} alt={fav.title} />
              <h3>{fav.title}</h3>
              <p>{fav.details?.price}</p>
              <ul>
                {fav.details?.features?.map((f, i) => (
                  <li key={i}>🚗 {f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>No favorites yet.</p>
      )}
    </div>
  );
};

export default MyFavorites;
