import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Badge,
} from 'reactstrap';

export default class UICard extends React.Component {
  static propTypes = {
    img: PropTypes.string,
    title: PropTypes.string,
    count: PropTypes.number,
    link: PropTypes.string,
  };

  render() {
    const { img, title, count, link } = this.props;

    return (
      <Card>
        <CardImg top width="100%" src={img} alt="Card image cap" />
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>Numbers of comments: {count}</CardSubtitle>
          <Badge href={link} color="light">
            Light
          </Badge>
        </CardBody>
      </Card>
    );
  }
}
