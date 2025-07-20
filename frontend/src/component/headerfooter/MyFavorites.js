import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import './favorite.css';

const LoadingOverlay = ({ isLoading }) => {
    if (!isLoading) return null;
    return (
        <div className="app-loading-overlay">
            <div className="app-glass-loader">
                <div className="app-spinner"></div>
                <p className="app-loading-text">
                    <i className="bi bi-lightning-charge-fill"></i> Please wait... loading details
                </p>
            </div>
        </div>
    );
};

const MyFavorites = () => {
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Only keep one loading flag

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                fetchFavorites(currentUser.uid);
            } else {
                setUser(null);
                setFavorites([]);
                setIsLoading(false); // End loading for unauthenticated
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchFavorites = async (userId) => {
        try {
            const res = await fetch(`https://motomartbackend.onrender.com/api/favorites/${userId}`);
            const data = await res.json();
            setFavorites(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("❌ Failed to fetch favorites:", err);
        } finally {
            setIsLoading(false); // ✅ Hide loader only after fetching
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to remove this from your favorites?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`https://motomartbackend.onrender.com/api/favorites/delete/${id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setFavorites((prev) => prev.filter((fav) => fav._id !== id));
            } else {
                console.error("❌ Failed to delete favorite");
            }
        } catch (err) {
            console.error("❌ Delete error:", err);
        }
    };


    if (!user) return <div className="fav-page">Please log in to view your favorites.</div>;

    return (
        <div className="fav-page">
            <LoadingOverlay isLoading={isLoading} />
            {!isLoading && (
                <>
                    <h2>❤️ My Favorite Vehicles</h2>
                    {favorites.length === 0 ? (
                        <p>No favorites yet.</p>
                    ) : (
                        <div className="fav-grid">
                            {favorites.map((fav) => (
                                <div key={fav._id} className="fav-card">
                                    <img src={fav.image} alt={fav.title} />
                                    <div className="fav-info">
                                        <h3>{fav.title}</h3>
                                        <p className="price">{fav.details?.price}</p>
                                        <ul className="features">
                                            {fav.details?.features?.map((f, i) => (
                                                <li key={i}>⚫ {f}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button className="remove-btn" onClick={() => handleDelete(fav._id)}>Remove</button>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MyFavorites;
