import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import UICard from '../UICard';
import { API_URL } from './../../api/api';

export default class PostsList extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      initialPosts: [],
      sortedPosts: [],
      showSearchPosts: [],
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
        this.setState(() => ({
          initialPosts: this.sortPosts(data.data.children),
        }));

        this.props.onPostLoaded({
          target: {
            name: 'max_range',
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

  timer = () => {
    this.onTimerFilterPosts();

    this.timerClearStorage();

    this.timerStart();
  };

  onTimerFilterPosts = () => {
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

  timerClearStorage = () => {
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        counter: 0,
      },
      showSearchPosts: [],
    }));
  };

  timerStart = () => {
    const interval = setInterval(() => {
      this.timerStop(interval);

      this.timerStartCountAndShowPosts();
    }, 1000);
  };

  timerContinue = () => {};

  timerStop = interval => {
    if (!this.props.values.startRefreshing) {
      console.log(
        'click stop startRefreshing',
        !this.props.values.startRefreshing
      );
      return clearInterval(interval);
    }

    if (this.state.values.counter === this.state.sortedPosts.length - 1) {
      console.log('end');
      return clearInterval(interval);
    }

    if (this.props.values.current_value === 0) {
      console.log('000');
      return clearInterval(interval);
    }
  };

  timerStartCountAndShowPosts = () => {
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        counter: prevState.values.counter + 1,
      },
      showSearchPosts: [
        ...prevState.showSearchPosts,
        this.state.sortedPosts[prevState.values.counter],
      ],
    }));
  };

  renderingPostsList(posts) {
    if (posts[0] === false) {
      return <p>Sorry, not found</p>;
    }

    return (
      <Row className="mt-3">
        {posts.map(({ data }) => {
          return (
            <Col sm={4} md={3} key={data.created_utc}>
              <UICard
                thumbnail={data.thumbnail}
                title={data.title}
                num_comments={data.num_comments}
                permalink={data.permalink}
              />
            </Col>
          );
        })}
      </Row>
    );
  }

  componentDidMount() {
    this.getPosts();
  }

  componentDidUpdate(prevProps) {
    const { values } = this.props;

    if (values.current_value !== prevProps.values.current_value) {
      this.setState(prevState => ({
        values: {
          ...prevState.values,
          current_value: this.props.values.current_value,
        },
      }));

      this.timer();
    }
  }

  render() {
    const { showSearchPosts, initialPosts } = this.state;
    const { values } = this.props;

    return (
      <React.Fragment>
        {this.renderingPostsList(showSearchPosts)}

        {initialPosts.length > 0 && !values.current_value && (
          <React.Fragment>
            <p>All Posts</p>
            {this.renderingPostsList(initialPosts)}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
