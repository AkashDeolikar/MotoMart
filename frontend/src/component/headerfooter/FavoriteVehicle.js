// import React, { useState } from 'react';
// import "./feedback.css";

// const FeedBack = () => {
//     const [feedback, setFeedback] = useState('');
//     const [isSubmitted, setIsSubmitted] = useState(false);
//     const [error, setError] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (feedback.trim() === '') {
//             setError('Feedback cannot be empty.');
//             return;
//         }

//         console.log('User Feedback:', feedback);

//         setTimeout(() => {
//             setIsSubmitted(true);
//             setFeedback('');
//             setError('');
//         }, 500);
//     };

//     if (isSubmitted) {
//         return (
//             <div className="feedback-container submitted">
//                 <h2>Thank You for Your Feedback!</h2>
//                 <p>We appreciate you taking the time to share your thoughts.</p>
//                 <button className="back-button" onClick={() => setIsSubmitted(false)}>
//                     Submit More Feedback
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <div className="feedback-container">
//             <h2>Provide Your Feedback</h2>
//             <form onSubmit={handleSubmit} className="feedback-form">
//                 <div className="form-group">
//                     <label htmlFor="feedbackText">What are your thoughts or suggestions?</label>
//                     <textarea
//                         id="feedbackText"
//                         className="feedback-textarea"
//                         value={feedback}
//                         onChange={(e) => {
//                             setFeedback(e.target.value);
//                             if (e.target.value.trim() !== '') {
//                                 setError('');
//                             }
//                         }}
//                         rows="6"
//                         placeholder="Your feedback helps us improve..."
//                         required
//                     ></textarea>
//                     {error && <p className="error-message">{error}</p>}
//                 </div>

//                 <button type="submit" className="submit-feedback-button">
//                     Submit Feedback
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default FeedBack;

import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './feedback.css'; // Rename to favorite.css if needed

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
            const timer = setTimeout(() => {
                setError('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleAddToFavorites = async () => {
    if (!user) {
        setError('You must be logged in to save favorites.');
        return;
    }

    if (!vehicle?.id || !vehicle?.title) {
        setError('Vehicle data is missing or invalid.');
        return;
    }

    // ✅ Optimistically update UI first
    setIsSubmitted(true);
    setError('');

    const payload = {
        userId: user.uid,
        vehicleId: vehicle.id,
        title: vehicle.title,
        image: vehicle.videoPoster,
        details: {
            ...vehicle.vehicleInfo,
            link: vehicle.link
        },
    };

    try {
        // Fire & forget saving
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
        console.error("❌ Error saving favorite:", err.message);

        // Rollback optimistic update
        setIsSubmitted(false);
        setError(err.message || 'Something went wrong.');
    }
};


    return (
        <>
            <div className="main-action-group">
                <div
                    className={`turn-on-button ${isSubmitted ? 'saved' : ''}`}
                    onClick={handleAddToFavorites}
                    style={{
                        cursor: isSubmitted ? 'not-allowed' : 'pointer',
                        backgroundColor: isSubmitted ? '#16d643ff': '#8ab4f8',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    {isSubmitted ? 'Saved ❤️' : 'Add to ❤️'}
                </div>
            </div>

            {error && <div className="toast-error">⚠️ {error}</div>}
        </>
    );
};

export default FavoriteVehicle;
