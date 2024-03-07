import React from 'react';

const TextColumn = ({ text, header, info }) => (
  <div style={{ flex: 2, maxWidth: '50%', border: '1px solid #cccccc', borderRadius: '10px', padding: '10px' }}>
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'left' }}>{header}</h1>
      <h3 style={{ textAlign: 'left', color: 'gray', paddingBottom: '10px'}}><i>{info}</i></h3>
      <p>{text}</p>
    </div>
  </div>
);

export default TextColumn; 