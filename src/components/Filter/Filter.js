import React from 'react';
import PropTypes from 'prop-types';

export default class Filter extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      values: {
        current_value: 0,
        startRefreshing: false,
      },
    };
  }

  static propTypes = {
    values: PropTypes.object,
    onStartAutoRefresh: PropTypes.func.isRequired,
  };

  onChangeFilter = event => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: Number(value),
      },
    }));
  };

  onClick = () => {
    const { values } = this.state;

    this.setState(prevState => ({
      values: {
        ...prevState.values,
        startRefreshing: !prevState.values.startRefreshing,
      },
    }));

    this.props.onStartAutoRefresh({
      target: {
        name: 'current_value',
        value: values.current_value,
        startRefreshing: !values.startRefreshing,
      },
    });
  };

  render() {
    const { values } = this.state;

    return (
      <div className="form-group">
        <label forhtml="current_value">
          Current filter:{' '}
          {values.current_value === 0 ? 'all' : values.current_value}
          <button
            // disabled={!values.current_value}
            className="ml-2 btn btn-outline-primary"
            onClick={this.onClick}
          >
            {!values.startRefreshing
              ? 'Start auto-refresh'
              : 'Stop auto-refresh'}
          </button>
        </label>

        <input
          type="range"
          id="current_value"
          name="current_value"
          value={values.current_value}
          className="custom-range"
          disabled={values.startRefreshing}
          min={0}
          max={this.props.values.max_range}
          onChange={this.onChangeFilter}
        />
      </div>
    );
  }
}
