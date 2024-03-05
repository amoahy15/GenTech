import React from 'react';
import placeholderImage from '../assets/images/art3.jpeg';

const ImageColumn = ({ imageUrl }) => (
    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', maxWidth: '50%' }}>
        <img src={imageUrl} alt="Image" style={{ minWidth: '100%', maxWidth: '100%', height: 'auto', objectFit: 'cover', alignItems: 'center'}} />
    </div>
);

const TextColumn = ({ text, header, info}) => (
    <div style={{ flex: 2, maxWidth:'50%'}}>
        <div style={{ width: '100%', backgroundColor: 'red', maxWidth: '100%', flex: 1, margin: '0 auto', borderRadius:'10px' }}>
            <h1 style = {{textAlign: 'center', paddingBottom: '20px'}}>{header}</h1>
            <h3 style = {{textAlign: 'center'}}>{info}</h3>
            <p style={{padding: '20px' }}>{text}</p>
        </div>
    </div>
);


const FlexibleColumns = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch', margin: '0px 20px', padding: '40px'}}>
          <ImageColumn imageUrl={placeholderImage} />
          <div style={{ margin: '0 20px' }} />
          <TextColumn text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." header= "TITLE" info = "Year, genre, etc"/>
        </div>
      );
};

export default FlexibleColumns;