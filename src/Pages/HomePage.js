import React from "react";
import "./HomePage.css"; 
import { Link } from "react-router-dom";


const HomePage = () => {
  
  return (
    <>
    <div className="home-page">
      <div className="background-image">
        <img src="images/bg1.jpg" alt="" />
      </div>
      <div className="content">
        <h1>Tech Studio Welcomes You!</h1>
        <p><i>Let’s Build the Future Together</i></p>
        <button className="hero-btn">
          <Link to="/product" >LEARN MORE</Link>
        </button>
      </div>
    </div>
    <section className="info">
          <h2>Our Partners</h2>
          <p>We collaborate with leading technology companies to bring you the best products and innovations in the industry.</p>

        <div className="row">
          <div className="info-col">
            <img src="images/apple.jpg" alt=""/>
              <div className="layer">
                <h3>Apple</h3>
              </div>
          </div>
          <div className="info-col">
            <img src="images/samsung.jpg" alt=""/>
              <div className="layer">
                <h3>Samsung</h3>
              </div>
          </div>
          <div className="info-col">
            <img src="images/huaweii.jpg" alt=""/>
              <div className="layer">
                <h3>Huawei</h3>
              </div>
          </div>
        </div>
      </section>
      <section className="cta" style={{
    backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)), url(images/contact.jpg)`,
  }}>
          <h1>Need help?Let’s connect—contact us now!</h1>
          <button className="hero-btn">
          <Link to="/about" >CONTACT US</Link>
        </button>
      </section>

    </>

  );
};

export default HomePage;
