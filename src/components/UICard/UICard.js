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
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    num_comments: PropTypes.number,
    permalink: PropTypes.string,
  };

  render() {
    const { thumbnail, title, num_comments, permalink } = this.props;

    return (
      <Card>
        <CardImg top width="100%" src={thumbnail} alt="Card image cap" />
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>Numbers of comments: {num_comments}</CardSubtitle>
          <Badge href={permalink} color="light">
            Light
          </Badge>
        </CardBody>
      </Card>
    );
  }
}
