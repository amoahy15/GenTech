import React from 'react';

const TextColumn = ({ text, header, name, year, rating }) => (
  <div style={{ flex: 2, maxWidth: '100%', border: '1px solid #cccccc', borderRadius: '10px', padding: '10px', maxHeight: '600px', overflow: 'auto' }}>
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'left' }}>{header}</h1>
      <h3 style={{ textAlign: 'left', color: 'gray', paddingBottom: '10px'}}><i>{name}, {year}</i></h3>
      <h3 style={{ textAlign: 'left', color: 'gray', paddingBottom: '10px'}}>
        <i>
          {rating || rating === 0 ? (rating > 0 ? (`Average rating: ${rating.toFixed(1)}` ): 'No ratings yet') : 'No ratings yet'}
        </i>
      </h3>
      <p>{text}</p>
    </div>
  </div>
);

export default TextColumn;
