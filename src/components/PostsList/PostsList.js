import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import UICard from '../UICard';
import { API_URL } from './../../api/api';
import _ from 'lodash';

export default class PostsList extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      initialPosts: [],
      sortedPosts: [],
      showPosts: [],
      values: {
        current_value: 0,
        counter: 0,
      },
    };
  }

  static propTypes = {
    onPostLoaded: PropTypes.func.isRequired,
    values: PropTypes.object,
  };

  getPosts = () => {
    const link = `${API_URL}/r/reactjs.json?limit=100`;

    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        // const allSortingPosts = Array.from(
        //   new Set(data.data.children.map(item => item.data.num_comments))
        // );

        this.setState(() => ({
          initialPosts: this.sortPosts(data.data.children),
        }));

        this.props.onPostLoaded({
          target: {
            name: 'max_range',
            // value: Math.max(...allSortingPosts),
            value: 400,
          },
        });
      });

    return true;
  };

  sortPosts = posts => {
    return posts.sort((a, b) =>
      a.data.num_comments > b.data.num_comments ? -1 : 1
    );
  };

  filterPosts = () => {
    const {
      values: { current_value },
    } = this.props;

    let sortedPosts = this.state.initialPosts.filter(
      i => i.data.num_comments >= current_value
    );

    !sortedPosts.length && sortedPosts.push(false);

    this.setState({
      sortedPosts,
    });
  };

  continueShowPosts = () => {};

  showPosts = () => {
    this.filterPosts();

    this.setState(prevState => ({
      values: {
        ...prevState.values,
        counter: 0,
      },
      showPosts: [],
    }));

    const onTimerTick = () => {
      this.setState(prevState => ({
        values: {
          ...prevState.values,
          counter: prevState.values.counter + 1,
        },
        showPosts: [
          ...prevState.showPosts,
          this.state.sortedPosts[prevState.values.counter],
        ],
      }));
    };

    const interval = setInterval(() => {
      if (!this.props.values.startRefreshing) {
        return clearInterval(interval);
      }

      if (this.state.values.counter === this.state.sortedPosts.length) {
        return clearInterval(interval);
      }

      if (this.props.values.current_value === 0) {
        return clearInterval(interval);
      }

      onTimerTick();
    }, 1000);
  };

  renderingPostsList(posts) {
    if (posts[0] === false) {
      console.log('oops');
      return <p>Sorry, not found</p>;
    }

    return posts.map(({ data }) => {
      return (
        <Row className="mt-3" key={data.created_utc}>
          <Col sm={4} md={3} key={data.created_utc}>
            <UICard
              thumbnail={data.thumbnail}
              title={data.title}
              num_comments={data.num_comments}
              permalink={data.permalink}
            />
          </Col>
        </Row>
      );
    });
  }

  componentDidMount() {
    this.getPosts();
  }

  componentDidUpdate(prevProps) {
    const { values } = this.props;

    if (!_.isEqual(values.current_value, prevProps.values.current_value)) {
      this.showPosts();
    }
  }

  render() {
    const { showPosts, initialPosts } = this.state;
    const { values } = this.props;

    return (
      <React.Fragment>
        {this.renderingPostsList(showPosts)}

        {values.current_value === 0 && this.renderingPostsList(initialPosts)}
      </React.Fragment>
    );
  }
}
