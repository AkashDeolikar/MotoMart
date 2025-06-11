import React from "react";
import './page5.css';

const Page5 = () => {
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
                    <p className="constantBGT1page">
                        We bring you truly distinct, global brands that define modern luxury, embrace our modernist design philosophy and are emotionally compelling and unique. Steeped in a rich legacy of timeless designs, always at the avant-garde of technologies, we are on an exceptional journey to make a more lasting and positive impact on the world around us.
                    </p>
                    <a className="btn-boxpage5 mt-4 appearIntroPage5" href="/luxury" target="_blank">Discover</a>
                </div>

                {/* Image Section Below the Text */}
                <div className="row">
                    <div className="col-md-6">
                        <div className="lux-card lux-card1 appearIntro">
                            <div className="caption-wrp">
                                <h2 className="mb-2">Jaguar</h2>
                                <p>
                                    Introducing a new era characterised by the advent of all-electric vehicles, combining
                                    exhilarating performance, dramatic design, and a captivating sense of theatre.
                                </p>
                                <a href="https://www.jaguar.com/index.html" className="readmore-cta">Visit website</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="lux-card lux-card2 appearIntro">
                            <div className="caption-wrp">
                                <h2 className="mb-2">Land Rover</h2>
                                <p>
                                    Vehicles at the pinnacle of opulent elegance. With sleek contours and a commanding presence, step inside a world of luxurious comfort and adventure.
                                </p>
                                <a href="https://www.landrover.com/index.html" className="readmore-cta">Visit website</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page5;
