import Link from 'next/link';
import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg={12}>
            <div className="text-center base-color-1">
              Copyright &copy;{' '}
              <Link href="/" className="base-link-color">
                NiftyTrader
              </Link>
              . All rights reserved {currentYear}
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
