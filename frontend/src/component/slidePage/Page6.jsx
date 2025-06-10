import React from "react";
import './page1.css';

const Page6 = () => {
  return (
    <div className="B1Page">
      <div className="bgPaper">
        <h5>Innovations</h5>
        <h1>Creating tommorows</h1>
        <h1>Today</h1>
      </div>

      <div className="ConstantBG">
        <div className="T1Page">
          <h2 className="constantBGT1page">Shaping the unseen</h2>
          <p className="constantBGT1page">
            A strong understanding of customer demands, the emerging economic
            landscape, combined with a purposeful, agile approach drives our
            growth.
          </p>
          <p className="constantBGT1page">
            Pushing frontiers to reimagine the future, our ‘Open Innovation’
            strategy accelerates next-gen technology and fosters
            collaborations with start-ups, scale-ups and like-minded
            enterprises. We focus on electrification, connectivity, digital
            services, metaverse, intelligent enterprise, manufacturing, supply
            chain and sustainability. Building on our engineering and
            innovation expertise, we enable customers to make the right choices
            with our future-ready vehicles and mobility solutions.
          </p>
        </div>
      </div>

      <div className="drops">
        <div className="firstdrop">
          <p className="d-inline-flex gap-1">
            <button
              className="btn-attractive"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseDesign"
              aria-expanded="false"
              aria-controls="collapseDesign"
            >
              <h3 className="dropheading text-center mb-1">Design <i class="bi bi-menu-down"></i></h3>
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
            className="btn-attractive"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTechnology"
            aria-expanded="false"
            aria-controls="collapseTechnology"
          >
            <h3 className="dropheading text-center mb-1">Technology <i class="bi bi-menu-down"></i></h3>
          </button>
        </p>
        <div className="collapse" id="collapseTechnology">
          <div className="drop-flex">
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
    </div>
  );
};

export default Page6;
