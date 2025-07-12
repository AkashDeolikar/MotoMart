import React from "react";
import './page3.css';

import img1 from '../slidePage/img1.jpg'
import img2 from '../slidePage/img2.jpg'
import img3 from '../slidePage/img3.jpg'

const Page3 = () => {
    return (
        <div className="B1Page3">
            <div className="bgPaper3">
                <h5>Automotive Engineering for Society</h5>
                <h1>Empowering Mobility, Empowering People</h1>
            </div>

            <div className="ConstantBG">
                <div className="T2Page">
                    <h2 className="constantBGT2page">AUTOMOTIVE ENGINEERING FOR SOCIETY</h2>

                    {/* Block 1: Image on Right */}
                    <div className="drop-flex2">
                        <div className="drop-text2">
                            <p>Automotive engineering is not just about building vehicles—it's about building a better future. Engineers today focus on sustainable mobility solutions that improve the quality of life for communities across the globe.</p>
                            <p>By incorporating advanced materials, electric drivetrains, and eco-friendly designs, the industry is making transportation cleaner, safer, and more accessible for all.</p>
                        </div>
                        <div className="drop-image2">
                            <img
                                src={img1}
                                alt="Sustainable Automotive"
                            />
                        </div>
                    </div>

                    {/* Block 2: Image on Left */}
                    <div className="drop-flex2 reverse">
                        <div className="drop-text2">
                            <p>Community-centric automotive innovation addresses local mobility challenges. Whether it's designing last-mile EVs or low-cost public transport systems, engineers are shaping mobility for every socioeconomic layer.</p>
                            <p>These innovations empower remote and rural areas with reliable and safe transportation, connecting people to education, jobs, and healthcare.</p>
                        </div>
                        <div className="drop-image2">
                            <img
                                src={img2}
                                alt="Rural EV Mobility"
                            />
                        </div>
                    </div>

                    {/* Block 3: Image on Right */}
                    <div className="drop-flex2">
                        <div className="drop-text2">
                            <p>Skill development in automotive engineering is driving socio-economic upliftment. Through training programs on electric vehicles, autonomous systems, and vehicle diagnostics, youth from underserved communities are finding career paths in future mobility.</p>
                            <p>This transformation is turning engineering into a tool for societal equity and sustainable progress.</p>
                        </div>
                        <div className="drop-image2">
                            <img
                                src={img3}
                                alt="Engineering Training for Youth"
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Page3;
