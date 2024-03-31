import React from 'react';
import '../styles/profile.modules.css';
import profilephoto from '../../assets/images/Frida_Kahlo/Frida_Kahlo_3.jpg'; 
import background from '../../assets/images/Gustav_Klimt/Gustav_Klimt_2.jpg'; 
import Carousel from '../Carousel';
import img1 from '../../assets/images/Edgar_Degas/Edgar_Degas_1.jpg';
import img2 from '../../assets/images/Edgar_Degas/Edgar_Degas_8.jpg';
import img3 from '../../assets/images/Edgar_Degas/Edgar_Degas_4.jpg';
import img4 from '../../assets/images/Edgar_Degas/Edgar_Degas_10.jpg';
import img5 from '../../assets/images/Edgar_Degas/Edgar_Degas_9.jpg';
import img6 from '../../assets/images/Edgar_Degas/Edgar_Degas_19.jpg';
import img7 from '../../assets/images/Salvador_Dali/Salvador_Dali_1.jpg';
import img8 from '../../assets/images/Salvador_Dali/Salvador_Dali_2.jpg';
import img9 from '../../assets/images/Salvador_Dali/Salvador_Dali_3.jpg';
import img10 from '../../assets/images/Salvador_Dali/Salvador_Dali_4.jpg';
import img11 from '../../assets/images/Salvador_Dali/Salvador_Dali_5.jpg';
import img12 from '../../assets/images/Salvador_Dali/Salvador_Dali_6.jpg';
import img13 from '../../assets/images/Salvador_Dali/Salvador_Dali_7.jpg';
import imga from '../../assets/images/Gustav_Klimt/Gustav_Klimt_1.jpg';
import imgb from '../../assets/images/Gustav_Klimt/Gustav_Klimt_2.jpg';
import imgc from '../../assets/images/Gustav_Klimt/Gustav_Klimt_15.jpg';
import imgd from '../../assets/images/Gustav_Klimt/Gustav_Klimt_14.jpg';
import imge from '../../assets/images/Gustav_Klimt/Gustav_Klimt_21.jpg';
import imgf from '../../assets/images/Gustav_Klimt/Gustav_Klimt_6.jpg';

function Collection() {
  return (
    <div style={{paddingTop: '15vh', paddingLeft: '5vw', paddingRight: '5vw', marginBottom: '20px'}}>
        <div style={{paddingBottom: '50px', paddingTop: '20px'}}>
            <h2 style={{paddingBottom: '20px'}}>IMPRESSIONISM</h2>
            <Carousel images={[img1 , img2, img3, img4, img5, img6]}></Carousel>
        </div>
        <div style={{paddingBottom: '50px'}}>
            <h2 style={{paddingBottom: '20px'}}>SURREALISM</h2>
            <Carousel images={[img7 , img8, img9, img10, img11, img12]}></Carousel>
        </div>
        <div style={{paddingBottom: '50px'}}>
            <h2 style={{paddingBottom: '20px'}}>ART NOVEAU</h2>
            <Carousel images={[imga, imgb, imgc, imgd, imge, imgf]}></Carousel>
        </div>
      </div>
  );
}

export default Collection;