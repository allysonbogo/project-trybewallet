import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Input extends Component {
  render() {
    const { type, name, label, onChange, value, dataTestId } = this.props;

    return (
      <label htmlFor={ name }>
        { label }
        <div>
          <input
            type={ type }
            name={ name }
            value={ value }
            onChange={ onChange }
            id={ name }
            data-testid={ dataTestId }
            required
          />
        </div>
      </label>
    );
  }
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  dataTestId: PropTypes.string.isRequired,
};

Input.defaultProps = {
  label: '',
  value: '',
  name: '',
  onChange: null,
};

export default Input;
