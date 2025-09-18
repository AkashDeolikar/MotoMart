import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './favorite.css';

const FavoriteVehicle = ({ vehicle }) => {
  const [user, setUser] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleAddToFavorites = async () => {
    if (isSubmitted) return;
    if (!user) {
      setError('You must be logged in to save favorites.');
      return;
    }
    if (!vehicle?.id || !vehicle?.title) {
      setError('Vehicle data is missing or invalid.');
      return;
    }

    setIsSubmitted(true);
    setError('');

    const payload = {
      userId: user.uid,
      vehicleId: vehicle.id,
      title: vehicle.title,
      image: vehicle.videoPoster,
      details: {
        ...vehicle.vehicleInfo,
        link: vehicle.link,
      },
    };

    try {
      const response = await fetch(
        'https://motomartbackend.onrender.com/api/favorites',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errRes = await response.json();
        throw new Error(errRes.message || 'Failed to save favorite');
      }
    } catch (err) {
      console.error('❌ Error saving favorite:', err.message);
      setIsSubmitted(false);
      setError(err.message || 'Something went wrong.');
    }
  };

  return (
    <>
      <button
        className={`google-favorite-btn ${isSubmitted ? 'saved' : ''}`}
        onClick={handleAddToFavorites}
        disabled={isSubmitted}
        aria-pressed={isSubmitted}
      >
        <span className="material-icons" style={{ fontSize: '18px', marginRight: '6px' }}>
          {isSubmitted ? 'favorite' : 'favorite_border'}
        </span>
        {isSubmitted ? 'Saved' : 'Add'}
      </button>

      {error && <div className="google-toast-error">{error}</div>}
    </>
  );
};

export default FavoriteVehicle;
