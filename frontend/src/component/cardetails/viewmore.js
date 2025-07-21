import React from "react";
import { useNavigate } from "react-router-dom";
import './viewmore.css';

const Viewmore = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/cardetails');
    };

    return (
        <div className="carslidefeatured-card">
            <div className="carslidefeatured-info">
                <p className="carslidefeatured-img-wrapper" style={{ textAlign: "center", padding: "8vh", textTransform: "uppercase", fontSize:"18px"}}>To view more</p>
                <button className="viewmorenav-button" onClick={handleClick}>
                    EXPLORE →
                </button>
            </div>
        </div>
    );
};

export default Viewmore;
