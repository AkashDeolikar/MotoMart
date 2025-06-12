import React from "react";
import './page2.css';

const Page1 = () => {
    return (
        <div className="B1Page2">
            <div className="bgPaper2">
                <h5>Future of mobility</h5>
                <h1>Safer<i class="bi bi-chevron-double-right"></i>Smarter<i class="bi bi-chevron-double-right"></i>Greener</h1>

            </div>

            <div className="ConstantBG">
                <div className="T2Page">
                    <h2 className="constantBGT2page">WELCOME TO THE FUTURE</h2>
                    <h3 className="constantBGT2page">HUMAN-CENTRIC, SMART & GREEN</h3>

                    {/* Block 1: Image on Right */}
                    <div className="drop-flex2">
                        <div className="drop-text2">
                                <p>Smart customers aspire vehicles that deliver climate change neutrality, best-in-class features and safety. No compromises.</p>
                                <p>We are putting these progressive ideas into action. Leaner designs, cleaner materials, greener powertrains and purposeful recycling will make our vehicles more aspirational.</p>
                                <p>Future-ready technologies – hydrogen-powered internal combustion engines, efficient fuel delivery systems, battery electric powertrains and hydrogen fuel cell powered electric will accelerate the adoption of clean mobility. Our vision, commitment and capability are bringing the promise of tomorrow closer.</p>
                        </div>
                        <div className="drop-image2">
                            <img src="https://www.tatamotors.com/wp-content/themes/TataMotors/images/welcome-to-1.png" alt="Design Illustration" />
                        </div>
                    </div>

                    {/* Block 2: Image on Left */}
                    <div className="drop-flex2 reverse">
                        <div className="drop-text2">
                            <p>We are spearheading the transition to sustainable, connected and safer mobility. Combining our core strength in engineering with innovative technologies and a human-centric design philosophy, we are transforming our entire product portfolio, value chain and operations.</p>
                            <p>We are exploring every new opportunity to create augmented experiences for customers, in line with their aspirations, needs and lifestyle.</p>
                            <p>Our focused investments in developing world-class, new-age powertrains will drive super performance – noiseless and with zero emissions. Continually decarbonising mobility is essential to achieve our goal of Net Zero by 2045.</p>
                        </div>
                        <div className="drop-image2">
                            <img src="https://www.tatamotors.com/wp-content/themes/TataMotors/images/welcome-to-2.png" alt="Design Illustration" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="drops">
                <div className="firstdrop">
                    <p className="d-inline-flex gap-1">
                        <button
                            className="btn-attractive2"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseDesign"
                            aria-expanded="false"
                            aria-controls="collapseDesign"
                        >
                            <h3 className="dropheading text-center mb-1">DESIGN <i class="bi bi-menu-down"></i></h3>
                        </button>
                    </p>
                    <div className="collapse" id="collapseDesign">
                        <div className="drop-flex">
                            <div className="drop-image">
                                <img
                                    src="https://www.tatamotors.com/wp-content/themes/TataMotors/images/innovation-pix1.jpg"
                                    alt="Design Illustration"
                                />
                            </div>
                            <div className="drop-text">
                                <h3>Building a new paradigm</h3>
                                <p>Design is our bedrock for innovation. We envision the future to develop truly irresistible vehicles for personal, passenger and cargo mobility. Our design teams based in Italy, the UK and India have created a unique, human-centric design language visible in our latest launches and vehicle concepts.</p>
                                <p>Design shapes the way how vehicles look, perform and engage with their drivers and the environment. Our talented designers are bold to predict the future, intelligent to shape it into reality, creative to make it look beautiful, caring to make it safe and conscious to make it environment friendly. By integrating such human-centric designs with new-age technologies, we are building the future today.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="seconddrop">
                <p className="d-inline-flex gap-1">
                    <button
                        className="btn-attractive2"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTechnology"
                        aria-expanded="false"
                        aria-controls="collapseTechnology"
                    >
                        <h3 className="dropheading text-center mb-1">TECHNOLOGY <i class="bi bi-menu-down"></i></h3>
                    </button>
                </p>
                <div className="collapse" id="collapseTechnology">
                    <div className="drop-flex3">
                        <div className="drop-image">
                            <img
                                src="https://www.tatamotors.com/wp-content/themes/TataMotors/images/innovation-pix2.jpg"
                                alt="Design Illustration"
                            />
                        </div>
                        <div className="drop-text">
                            <h3>Shaping concept to reality</h3>
                            <p>Our expertise in understanding and transforming multiple technology trends helps us shape the future of mobility. We are at the forefront of developing efficient, sustainable and convenient transportation solutions to move people and cargo.</p>
                            <p>Automotive technology is an always evolving landscape of advancements. To stay ahead of curve, we challenge the status quo with groundbreaking concepts and game-changing features to make our vehicles smarter and safer. As vehicles rapidly transform into ‘software on wheels’, we are integrating sophisticated systems to connect them seamlessly with the outside world. This enriching experience blends convenience and efficiency, with technology enhancing every aspect of the journey.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="btn-group" role="group" aria-label="Basic outlined example">
                <button type="button" className="btn btn-outline-primary">Left</button><p>Lorem ipsum dolor sit.</p>
                <button type="button" className="btn btn-outline-primary">Middle</button>
                <button type="button" className="btn btn-outline-primary">Right</button>
            </div> */}
        </div >
    );
};

export default Page1;
