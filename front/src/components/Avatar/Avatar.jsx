import React from 'react';

import "./avatar.scss";

export default function Avatar({ src, alt, size }) {
    return (
        <img
          src={src}
          alt={alt}
          className="avatar-icon"
        />
      );
}
