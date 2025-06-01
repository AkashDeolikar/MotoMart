import React, { useState } from 'react';
import "./feedback.css";

const FeedBack = () => {
    const [feedback, setFeedback] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (feedback.trim() === '') {
            setError('Feedback cannot be empty.');
            return;
        }

        console.log('User Feedback:', feedback);

        setTimeout(() => {
            setIsSubmitted(true);
            setFeedback('');
            setError('');
        }, 500);
    };

    if (isSubmitted) {
        return (
            <div className="feedback-container submitted">
                <h2>Thank You for Your Feedback!</h2>
                <p>We appreciate you taking the time to share your thoughts.</p>
                <button className="back-button" onClick={() => setIsSubmitted(false)}>
                    Submit More Feedback
                </button>
            </div>
        );
    }

    return (
        <div className="feedback-container">
            <h2>Provide Your Feedback</h2>
            <form onSubmit={handleSubmit} className="feedback-form">
                <div className="form-group">
                    <label htmlFor="feedbackText">What are your thoughts or suggestions?</label>
                    <textarea
                        id="feedbackText"
                        className="feedback-textarea"
                        value={feedback}
                        onChange={(e) => {
                            setFeedback(e.target.value);
                            if (e.target.value.trim() !== '') {
                                setError('');
                            }
                        }}
                        rows="6"
                        placeholder="Your feedback helps us improve..."
                        required
                    ></textarea>
                    {error && <p className="error-message">{error}</p>}
                </div>

                <button type="submit" className="submit-feedback-button">
                    Submit Feedback
                </button>
            </form>
        </div>
    );
};

export default FeedBack;