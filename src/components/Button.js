import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { label, disabled, onClick, type } = this.props;

    return (
      <button
        type={ type }
        disabled={ disabled }
        onClick={ onClick }
      >
        { label }
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit']),
};

Button.defaultProps = {
  onClick: () => {},
  type: 'button',
  disabled: true,
};

export default Button;
