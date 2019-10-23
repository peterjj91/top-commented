import React from 'react';
import { Container } from 'reactstrap';
import Filter from './../Filter';
import PostList from '../PostsList';

export default class App extends React.PureComponent {
  constructor() {
    super();

    this.initialState = {
      values: {
        max_range: Infinity,
        current_value: 0,
        startRefreshing: false,
      },
      status: {
        loading: true,
      },
    };

    this.state = this.initialState;
  }

  onPostLoaded = event => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value,
      },
      status: {
        loading: false,
      },
    }));
  };

  onStartAutoRefresh = event => {
    const { name, value, startRefreshing } = event.target;

    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value,
        startRefreshing,
      },
    }));
  };

  render() {
    const { status, values } = this.state;

    return (
      <Container fluid={true}>
        <h1>Top commented.</h1>

        {status.loading && 'Loading...'}

        {!status.loading && (
          <Filter
            values={values}
            onStartAutoRefresh={this.onStartAutoRefresh}
          />
        )}

        <PostList onPostLoaded={this.onPostLoaded} values={values} />
      </Container>
    );
  }
}
