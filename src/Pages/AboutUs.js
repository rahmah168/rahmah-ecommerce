import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import './AboutUs.css'; 



const AboutUs = () => {
  return (
    <Container className="about-us" style={{marginTop: "15vh"}}>
      <Row className="text-center mb-5">
        <Col>
          <h1>About SATO</h1>
          <p className="lead">
            Welcome to SATO! We are a passionate team dedicated to bringing you the finest products and services.
          </p>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col md={6}>
          <div className="mission-vision-container">
            <h2>Our Mission</h2>
            <p>
              At SATO, our mission is to deliver high-quality products that meet the needs of our customers. We strive to
              innovate and continuously improve our offerings to ensure that you receive the best value for your investment.
            </p>
          </div>
        </Col>
        <Col md={6}>
          <div className="mission-vision-container">
            <h2>Our Vision</h2>
            <p>
              Our vision is to be a leader in our industry, known for our commitment to excellence, integrity, and customer
              satisfaction. We aim to build lasting relationships with our clients and partners based on trust and mutual
              respect.
            </p>
          </div>
        </Col>
      </Row>
      <Row className="contact-us text-center mb-5">
        <Col>
          <h2 className="fw-bold mb-4">Contact Us</h2>
          <p>
            We would love to hear from you! If you have any questions or feedback, please reach out to us at{' '}
            <a href="mailto:support@sato.com">support@sato.com</a>.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
