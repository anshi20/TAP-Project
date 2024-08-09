import React from 'react';
import PropTypes from 'prop-types';
import './TextTile.css';

export default function TextTile({ title, content, footer }) {
  return (
    <div className="text-tile">
      <div className="text-tile-header">
        <h3>{title}</h3>
      </div>
      <div className="text-tile-content">
        <p>{content}</p>
      </div>
      {footer && (
        <div className="text-tile-footer">
          <p>{footer}</p>
        </div>
      )}
    </div>
  );
}

TextTile.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  footer: PropTypes.string,
};
