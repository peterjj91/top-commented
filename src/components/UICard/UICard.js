import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import errorImage from './../../assets/images/image-not-found.jpg';

export default class UICard extends React.PureComponent {
  static propTypes = {
    thumbnail: PropTypes.string,
    title: PropTypes.string,
    num_comments: PropTypes.number,
    permalink: PropTypes.string,
  };

  render() {
    const { thumbnail, title, num_comments, permalink } = this.props;

    return (
      <Card className="mb-4">
        <div className="card-img-wrapper">
          <CardImg
            top
            width="100%"
            src={thumbnail === 'self' ? errorImage : thumbnail}
            alt="Card image cap"
          />
        </div>
        <CardBody>
          <CardTitle>
            <strong>{title}</strong>
          </CardTitle>
          <CardSubtitle className="font-weight-light">
            Numbers of comments: {num_comments}
          </CardSubtitle>
          <a href={permalink}>Link</a>
        </CardBody>
      </Card>
    );
  }
}
