import React from 'react';
import UICard from './../UICard';
import { Container, Row, Col } from 'reactstrap';

export default class App extends React.Component {
  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col sm={4} md={3}>
            <UICard img="s" title="asd" count={1} link="sd" />
          </Col>
          <Col sm={4} md={3}>
            <UICard img="s" title="asd" count={1} link="sd" />
          </Col>
          <Col sm={4} md={3}>
            <UICard img="s" title="asd" count={1} link="sd" />
          </Col>
          <Col sm={4} md={3}>
            <UICard img="s" title="asd" count={1} link="sd" />
          </Col>
        </Row>
      </Container>
    );
  }
}
