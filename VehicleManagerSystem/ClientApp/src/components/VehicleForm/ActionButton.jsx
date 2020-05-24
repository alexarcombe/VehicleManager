import React from 'react';
import { Fab, Tooltip } from '@material-ui/core';

function ActionButton(props) {
  const { name, children, ...rest } = props;
  const button = <Fab {...rest}>{children}</Fab>;

  return props.disabled ? (
    button
  ) : (
    <Tooltip title={name} aria-label={name}>
      {button}
    </Tooltip>
  );
}

export default ActionButton;
