import React, {useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./rover.css";

import rover1 from './roverAssets/rover1.jpg';
import rover2 from './roverAssets/rover2.jpg';
import rover3 from './roverAssets/rover3.jpg';
import rover4 from './roverAssets/rover4.jpg';

const tabData = [
  {
    title: "ELECTRIC HYBRID",
    image: rover1,
    specs: [
      { label: "ELECTRIC RANGE (UP TO)", value: "121", unit: "KM", desc: "Expected real-world range of up to 94km." },
      { label: "PUBLIC CHARGING (FROM)", value: "<60", unit: "MINUTES", desc: "Charge up to 80% in under an hour." },
      { label: "HOME CHARGING (FROM)", value: "5", unit: "HOURS", desc: "Up to 100% using 7kW AC charger." }
    ],
    description: 'Available as an extended range plug-in electric hybrid (PHEV). The 3.0-litre 6 cylinder Ingenium petrol engine with 160 kW motor is fitted with P460e or P550e variants.',
    cta: "https://www.rangerover.com/lr/en_in/l460_k25/_/a-si6-550_a-ab_a-swb_h/ipr/personalise/model/"
  },
  {
    title: "SV PETROL V8",
    image: rover2,
    specs: [
      { label: "TOP SPEED", value: "261", unit: "KM/H" },
      { label: "MAXIMUM POWER", value: "452", unit: "kW" },
      { label: "0-100 KM/H", value: "4.5", unit: "S" }
    ],
    description: 'Providing immediate response with exceptional drivability, the 4.4-litre V8 engine has 452 kW and 750 Nm of torque - taking Range Rover SV from 0‑100 km/h in 4.5 seconds with Dynamic Launch engaged.',
    cta: "https://www.rangerover.com/lr/en_in/l460_k25/_/a-v8-615-sv_a-sv_a-swb_p/ipr/personalise/model/"
  },
  {
    title: "PETROL V8",
    image: rover3,
    specs: [
      { label: "TOP SPEED", value: "250", unit: "KM/H" },
      { label: "MAXIMUM POWER", value: "390", unit: "kW" },
      { label: "0-100 KM/H", value: "4.6", unit: "S" }
    ],
    description: 'Uncompromising power and performance with heightened efficiency. The new 4.4-litre V8 engine has 390 kW and 750 Nm of torque and can take Range Rover from 0‑100 km/h in 4.6 seconds with Dynamic Launch engaged.',
    cta: "https://www.rangerover.com/lr/en_in/l460_k25/_/a-v8-530_a-ab_a-swb_p/ipr/personalise/engine/"
  },
  {
    title: "DIESEL MILD HYBRID",
    image: rover4,
    specs: [
      { label: "TOP SPEED", value: "234", unit: "KM/H" },
      { label: "MAXIMUM POWER", value: "258", unit: "kW" },
      { label: "0-100 KM/H", value: "6.0", unit: "S" }
    ],
    description: `Range Rover’s mild hybrid engines harvest, store and redeploy energy normally lost during deceleration. Available with a range of diesel and petrol engines.`,
    cta: "https://www.rangerover.com/lr/en_in/l460"
  },
]

const Bmw = () => {
    const [activeTab ] = useState('ELECTRIC HYBRID');
      const [activeIndex, setActiveIndex] = useState(0);
      const active = tabData[activeIndex];
    return(
        <div className="roverpage">
              <Swiper
                pagination={{
                  clickable: true,
                  el: ".custom-paginationROVER",
                  bulletClass: "custom-rover",
                  bulletActiveClass: "custom-rover-active",
                }}
                modules={[Pagination, EffectFade]}
                spaceBetween={30}
                slidesPerView={1}
                effect="fade"
                fadeEffect={{ crossFade: true }}
              >
                <SwiperSlide>
                  <div className="rover-box">
                    <div className="rover-types">
                      <div className="rover-sv">
                        <div className="pageswipe">
                          <h2 className="headingSwipe">RANGE ROVER-SV</h2>
                          <p className="psgswipe">Refined. Luxurious. Exclusive.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
        
                <SwiperSlide>
                  <div className="rover-box">
                    <div className="rover-types">
                      <div className="rover-autobiography">
                        <div className="pageswipe">
                          <h2 className="headingSwipe">RANGE ROVER-AUTOBIOGRAPHY</h2>
                          <p className="psgswipe">The unmistakeable expression of refinement and luxury..</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
        
                <SwiperSlide>
                  <div className="rover-box">
                    <div className="rover-types">
                      <div className="rover-luxury">
                        <div className="pageswipe">
                          <h2 className="headingSwipe">RANGE ROVER-LUXURY RED</h2>
                          <p className="psgswipe">Lorem ipsum dolor sit amet.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
        
                <SwiperSlide>
                  <div className="rover-box">
                    <div className="rover-types">
                      <div className="rover-hse">
                        <div className="pageswipe">
                          <h2 className="headingSwipe">RANGE ROVER-HSE</h2>
                          <p className="psgswipe">Range Rover in its purest form.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
        
              <div className="custom-paginationROVER"></div>
        
              {/* <li class="cmp-readyToGoBar__item"> */}
              <div className="listrover">
                <a
                  className="cmp-readyToGoBar__link"
                  href="https://www.findmeasuv.in/pricing_pdf/land-rover-vehicles-price-in-india.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="VIEW PRICES - View vehicle prices online."
                >
                  <i className="bi bi-book"></i>
                  <h2 className="cmp-readyToGoBar__heading headline headline--s" aria-hidden="true">
                    <div className="cmp-readyToGoBar__heading-inner">
                      <p className="view-prices-title"><i class="bio bi-chevron-right small-icon"></i> VIEW PRICES</p>
                    </div>
                  </h2>
                  <div className="cmp-readyToGoBar__copy body-copy" aria-hidden="true">
                    <p>View vehicle prices online.</p>
                  </div>
                </a>
              </div>
        
              <br />
        
              <div className="rover-det-spec-block">
                <div className="rover-tabs-container">
                  <h1 className="title1">HEIGHTENED PERFORMANCE</h1>
                  <p className="subtitle">
                    The original luxury SUV, leading with Range Rover Electric and efficient plug-in and mild hybrids.
                  </p>
        
                  <div className="tabs-header">
                    {tabData.map((tab, idx) => (
                      <button
                        key={idx}
                        className={`tab-button ${activeIndex === idx ? "active" : ""}`}
                        onClick={() => setActiveIndex(idx)}
                      >
                        {tab.title}
                      </button>
                    ))}
                  </div>
        
                  <div className="tab-main">
                    <img className="tab-image" src={active.image} alt={active.title} />
                    <div className="tab-info">
                      <div className="specs">
                        {active.specs.map((spec, i) => (
                          <div key={i} className="spec-item">
                            <p className="spec-label">{spec.label}</p>
                            <div className="spec-value">{spec.value} <span>{spec.unit}</span></div>
                            {spec.desc && <p className="spec-desc">{spec.desc}</p>}
                          </div>
                        ))}
                      </div>
                      <p className="titleH">{active.title}</p>
                      <p className="descriptionn">{active.description}</p>
                      {/* <a className="cta-button" href={active.cta} target="_blank" rel="noreferrer">
                        BUILD YOUR OWN
                      </a> */}
                    </div>
                  </div>
                </div>
        
                <br/>
                <br/>
                <br/>
                <a className="btn-boxpage5 mt-4 appearIntroPage5" href="/page5">View More</a>
                
              </div>
        
              {/* </li> */}
            </div>
    );
}

export default Bmw;