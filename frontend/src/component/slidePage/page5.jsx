import React, { useState } from "react";
import './page5.css';
import RangeRoverLoading from '../slidePage/Range-Roverloading.jpg';
import JaguarLoading from '../slidePage/Jaguarloading.jpg';

const Page5 = () => {
    const [loadingJaguar, setLoadingJaguar] = useState(false);
    const [loadingRover, setLoadingRover] = useState(false);

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

    return (
        <div className="B1Page">
            <div className="bgPaper5">
                <h5>Luxury vehicles</h5>
                <h1>Reimagining</h1>
                <h1>the future</h1>
            </div>

            <div className="ConstantBG5">
                <div className="T5Page">
                    <h2 className="constantBGT1page">Welcome to the renaissance</h2>
                    <p className="constantBGT1page5">
                        We bring you truly distinct, global brands that define modern luxury, embrace our modernist design philosophy and are emotionally compelling and unique.
                    </p>
                    <a className="btn-boxpage5 mt-4 appearIntroPage5" href="/luxury" target="_blank">Discover</a>
                </div>

                <div className="row">
                    {/* Jaguar Card */}
                    <div className="col-md-6">
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
                                    <a className="readmore-cta" onClick={handleJaguarClick}>Visit website</a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Land Rover Card */}
                    <div className="col-md-6">
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
                                        Vehicles at the pinnacle of opulent elegance. With sleek contours and a commanding presence, step inside a world of luxurious comfort and adventure.
                                    </p>
                                    <a className="readmore-cta" onClick={handleRoverClick}>Visit website</a>
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
