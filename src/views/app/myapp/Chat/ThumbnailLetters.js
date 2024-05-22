import React from 'react';
import classnames from 'classnames';

const ThumbnailLetters = ({ text, color, className, rounded, small, extraSmall }) => {
  let letters = '';
  if (text.indexOf(' ') > -1) {
    text.split(' ').forEach((word) => {
      if (word.length > 1) letters += word.slice(0, 1);
    });
  } else {
    letters += text.slice(0, 2);
  }

  if (letters.length > 2) {
    letters = letters.slice(0, 2);
  }

  // Define inline styles for extra small size
  const extraSmallStyles = {
    width: '40px',
    height: '40px',
    fontSize: '1.0em',
    padding: '.7em',
  };

  // Define inline styles for small size
  const smallStyles = {
    width: '50px',
    height: '50px',
    fontSize: '0.75em',
    padding: '0.25em',
  };

  let appliedStyles = {};
  if (extraSmall) {
    appliedStyles = extraSmallStyles;
  } else if (small) {
    appliedStyles = smallStyles;
  }

  return (
    <div
      className={`align-self-center list-thumbnail-letters ${
        color ? `btn-${color}` : ''
      } ${className} ${classnames({
        'rounded-circle': rounded,
      })}`}
      title={text}
      style={appliedStyles}
    >
      {letters}
    </div>
  );
};

export default React.memo(ThumbnailLetters);
