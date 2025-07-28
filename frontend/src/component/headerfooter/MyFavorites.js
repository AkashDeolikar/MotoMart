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
    const [isLoading, setIsLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                fetchFavorites(currentUser.uid);
            } else {
                setUser(null);
                setFavorites([]);
                setIsLoading(false);
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
            setIsLoading(false);
        }
    };

    const toggleSelect = (id) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((itemId) => itemId !== id)
                : [...prevSelected, id]
        );
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
                setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
            } else {
                console.error("❌ Failed to delete favorite");
            }
        } catch (err) {
            console.error("❌ Delete error:", err);
        }
    };

    const handleBulkDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete selected items?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`https://motomartbackend.onrender.com/api/favorites/delete-multiple`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ids: selectedItems }),
            });

            if (res.ok) {
                setFavorites((prev) => prev.filter((fav) => !selectedItems.includes(fav._id)));
                setSelectedItems([]);
            } else {
                console.error("❌ Bulk delete failed");
            }
        } catch (err) {
            console.error("❌ Bulk delete error:", err);
        }
    };

    if (!user) return <div className="fav-page">Please log in to view your favorites.</div>;

    return (
        <div className="fav-page">
            <LoadingOverlay isLoading={isLoading} />
            {!isLoading && (
                <>
                    <h2>❤️ My Favorite Vehicles</h2>
                    {selectedItems.length > 0 && (
                        <button className="bulk-remove-btn" onClick={handleBulkDelete}>
                            Remove Selected ({selectedItems.length})
                        </button>
                    )}
                    {favorites.length === 0 ? (
                        <p>No favorites yet.</p>
                    ) : (
                        <div className="fav-grid">
                            {favorites.map((fav) => (
                                <div key={fav._id} className="fav-card">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(fav._id)}
                                        onChange={() => toggleSelect(fav._id)}
                                        className="fav-checkbox"
                                        title="Select this favorite"
                                    />
                                    <img src={fav.image} alt={fav.title} />
                                    <div className="fav-info">
                                        <h3>{fav.title}</h3>
                                        <p className="price">{fav.details?.price}</p>
                                        <ul className="features">
                                            {fav.details?.engineAndTransmission?.engineType && (
                                                <li>{fav.details.engineAndTransmission.engineType}</li>
                                            )}
                                            {fav.details?.engineAndTransmission?.displacement && (
                                                <li>{fav.details.engineAndTransmission.displacement}</li>
                                            )}
                                            {fav.details?.fuelAndPerformance?.mileage && (
                                                <li>{fav.details.fuelAndPerformance.mileage}</li>
                                            )}
                                            {fav.details?.features?.map((f, i) => (
                                                <li key={i}>⚫ {f}</li>
                                            ))}
                                        </ul>
                                        {fav.details?.link && (
                                            <a
                                                href={fav.details.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="external-link-button"
                                                aria-label={`Visit official page for ${fav.title}`}
                                            >
                                                Visit Official Page
                                            </a>
                                        )}
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


// import React, { useState, useEffect } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from '../../firebase';
// import './favorite.css';

// const LoadingOverlay = ({ isLoading }) => {
//     if (!isLoading) return null;
//     return (
//         <div className="app-loading-overlay">
//             <div className="app-glass-loader">
//                 <div className="app-spinner"></div>
//                 <p className="app-loading-text">
//                     <i className="bi bi-lightning-charge-fill"></i> Please wait... loading details
//                 </p>
//             </div>
//         </div>
//     );
// };

// const MyFavorites = () => {
//     const [user, setUser] = useState(null);
//     const [favorites, setFavorites] = useState([]);
//     const [isLoading, setIsLoading] = useState(true); // Only keep one loading flag

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//             if (currentUser) {
//                 setUser(currentUser);
//                 fetchFavorites(currentUser.uid);
//             } else {
//                 setUser(null);
//                 setFavorites([]);
//                 setIsLoading(false); // End loading for unauthenticated
//             }
//         });

//         return () => unsubscribe();
//     }, []);

//     const fetchFavorites = async (userId) => {
//         try {
//             const res = await fetch(`https://motomartbackend.onrender.com/api/favorites/${userId}`);
//             const data = await res.json();
//             setFavorites(Array.isArray(data) ? data : []);
//         } catch (err) {
//             console.error("❌ Failed to fetch favorites:", err);
//         } finally {
//             setIsLoading(false); // ✅ Hide loader only after fetching
//         }
//     };

//     const handleDelete = async (id) => {
//         const confirmDelete = window.confirm("Are you sure you want to remove this from your favorites?");
//         if (!confirmDelete) return;

//         try {
//             const res = await fetch(`https://motomartbackend.onrender.com/api/favorites/delete/${id}`, {
//                 method: 'DELETE',
//             });
//             if (res.ok) {
//                 setFavorites((prev) => prev.filter((fav) => fav._id !== id));
//             } else {
//                 console.error("❌ Failed to delete favorite");
//             }
//         } catch (err) {
//             console.error("❌ Delete error:", err);
//         }
//     };


//     if (!user) return <div className="fav-page">Please log in to view your favorites.</div>;

//     return (
//         <div className="fav-page">
//             <LoadingOverlay isLoading={isLoading} />
//             {!isLoading && (
//                 <>
//                     <h2>❤️ My Favorite Vehicles</h2>
//                     {favorites.length === 0 ? (
//                         <p>No favorites yet.</p>
//                     ) : (
//                         <div className="fav-grid">
//                             {favorites.map((fav) => (
//                                 <div key={fav._id} className="fav-card">
//                                     <img src={fav.image} alt={fav.title} />
//                                     <div className="fav-info">
//                                         <h3>{fav.title}</h3>
//                                         <p className="price">{fav.details?.price}</p>
//                                         <ul className="features">
//                                             {/* Static engine info */}
//                                             {/* For CAR only */}
//                                             {fav.details?.engineAndTransmission?.engineType && (
//                                                 <li> {fav.details.engineAndTransmission.engineType}</li>
//                                             )}
//                                             {fav.details?.engineAndTransmission?.displacement && (
//                                                 <li> {fav.details.engineAndTransmission.displacement}</li>
//                                             )}
//                                             {fav.details?.fuelAndPerformance?.mileage && (
//                                                 <li> {fav.details.fuelAndPerformance.mileage}</li>
//                                             )}

//                                             {/* For BIKE only */}
//                                             {fav.details?.features?.map((f, i) => (
//                                                 <li key={i}>⚫ {f}</li>
//                                             ))}
//                                         </ul>

//                                         {/* ✅ Add external link button if link exists */}
//                                         {fav.details?.link && (
//                                             <a
//                                                 href={fav.details.link}
//                                                 target="_blank"
//                                                 rel="noopener noreferrer"
//                                                 className="external-link-button"
//                                                 aria-label={`Visit official page for ${fav.title}`}
//                                             >
//                                                 Visit Official Page
//                                             </a>
//                                         )}
//                                     </div>
//                                     <button className="remove-btn" onClick={() => handleDelete(fav._id)}>Remove</button>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default MyFavorites;
