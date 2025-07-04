import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './page5.css';
import RangeRoverLoading from '../slidePage/Range-Roverloading.jpg';
import JaguarLoading from '../slidePage/Jaguarloading.jpg';
import bmwloading from '../slidePage/bmwloading.jpg';
import mercedesloading from '../slidePage/mercedesloading.jpg';
//AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

{/* Loading Animation */ }
const LoadingOverlay = ({ isLoading }) => {
    if (!isLoading) return null;

    return (
        <div className="loading-overlay">
            <div className="glass-loader">
                <div className="spinner"></div>
                <p className="loading-text">
                    <i className="bi bi-lightning-charge-fill"></i> Please wait... loading details
                </p>
            </div>
        </div>
    );
};

const Page5 = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [loadingJaguar, setLoadingJaguar] = useState(false);
    const [loadingRover, setLoadingRover] = useState(false);
    const [loadingBmw, setLoadingbmw] = useState(false);
    const [LoadingMercedes, setLoadingMercedes] = useState(false);

    /*Scroll up animation */
    useEffect(() => {
        AOS.init({
            duration: 1000, // animation duration in milliseconds
            once: false     // set to false to animate again on scroll up
        });
    }, []);

    const handleJaguarClick = () => {
        setLoadingJaguar(true);
        setTimeout(() => {
            window.location.href = "/jaguar";
        }, 2000);
    };

    const handleRoverClick = () => {
        setLoadingRover(true);
        setTimeout(() => {
            window.location.href = "/rover";
        }, 2000);
    };

    const handleBmwClick = () => {
        setLoadingbmw(true);
        setTimeout(() => {
            window.location.href = "/bmw";
        }, 2000);
    };

    const handleMercedesClick = () => {
        setLoadingMercedes(true);
        setTimeout(() => {
            window.location.href = "/mercedes";
        }, 2000);
    };

    return (
        <div className="B1Page">
            <LoadingOverlay isLoading={isLoading} />{/* This is a loading animation */}
            <div className="bgPaper5">
                <h5>Luxury vehicles</h5>
                <h1>Reimagining</h1>
                <h1>the future</h1>
            </div>

            {/* Animated click */}
            <div className="ConstantBG5">
                <i
                    className="bi bi-arrow-down-circle bounce-arrow"
                    style={{
                        position: 'absolute',
                        top: '55vh',
                        right: '20px',
                        fontSize: '3.5rem',
                        color: '#fff',
                        borderRadius: '50%',
                        padding: '10px',
                        cursor: 'pointer',
                        zIndex: 1000,
                    }}
                    title="Scroll Down"
                ></i>
                <div className="T5Page" >
                    <h2 className="constantBGT1page">Welcome to the renaissance</h2>
                    <p className="constantBGT1page5">
                        "We bring you truly distinct, global brands that define modern luxury, embrace our modernist design philosophy and are emotionally compelling and unique."
                    </p>
                    <a className="btn-boxpage5 mt-4 appearIntroPage5" href="/luxury" target="_blank">Discover</a>
                </div>
                <div className="premium-highlight-section">
                    <p className="premium-text">
                        Explore our exclusive collection of <strong>Premium Cars</strong> handpicked for enthusiasts & connoisseurs.
                        <a
                            className="premium-cta-button"
                            href="/luxuryvh"
                            //   target="_blank"
                            title="Browse Premium Segment"
                        >
                            View Collection
                        </a>
                    </p>
                </div>

                <div className="row">
                    {/* Jaguar Card */}
                    <div className="col-md-6" data-aos="fade-up">
                        {loadingJaguar ? (
                            <div className="lux-card loading-card appearIntro">
                                <img
                                    src={JaguarLoading}
                                    alt="Jaguar Loading"
                                    className="loading-image"
                                />
                                <p className="loading-text">Loading Jaguar Experience...</p>
                            </div>
                        ) : (
                            <div className="lux-card lux-card1 appearIntro">
                                <div className="caption-wrp">
                                    <h2 className="mb-2">Jaguar</h2>
                                    <p className="mb-p">
                                        Introducing a new era characterised by the advent of all-electric vehicles, combining
                                        exhilarating performance, dramatic design, and a captivating sense of theatre.
                                    </p>
                                    <a className="readmore-cta"
                                        onClick={() => {
                                            handleJaguarClick(true);
                                            setIsLoading(true);
                                            setTimeout(() => {
                                                setIsLoading(false);
                                                // navigate('/bmw');
                                            }, 1500); // Adjust the delay if needed
                                        }}
                                    >Visit website</a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Land Rover Card */}
                    <div className="col-md-6" data-aos="fade-up">
                        {loadingRover ? (
                            <div className="lux-card loading-card appearIntro">
                                <img
                                    src={RangeRoverLoading}
                                    alt="Range Rover Loading"
                                    className="loading-image"
                                />
                                <p className="loading-text">Loading Range Rover Experience...</p>
                            </div>
                        ) : (
                            <div className="lux-card lux-card2 appearIntro">
                                <div className="caption-wrp">
                                    <h2 className="mb-2">Land Rover</h2>
                                    <p className="mb-p">
                                        "Vehicles at the pinnacle of opulent elegance. With sleek contours and a commanding presence, step inside a world of luxurious comfort and adventure."
                                    </p>
                                    <a className="readmore-cta"
                                        onClick={() => {
                                            handleRoverClick(true);
                                            setIsLoading(true);
                                            setTimeout(() => {
                                                setIsLoading(false);
                                                // navigate('/rover');
                                            }, 1500); // Adjust the delay if needed
                                        }}
                                    >Visit website</a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page5;
