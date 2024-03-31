import ArtTextCols from "../annotationComponents/ImageTextColumn";
import Carousel from '../Carousel.js'
import img from '../../assets/images/Frida_Kahlo/Frida_Kahlo_10.jpg'
import img2 from '../../assets/images/Frida_Kahlo/Frida_Kahlo_11.jpg'
import img3 from '../../assets/images/Frida_Kahlo/Frida_Kahlo_12.jpg'

import img4 from '../../assets/images/Frida_Kahlo/Frida_Kahlo_13.jpg'
import img5 from '../../assets/images/Frida_Kahlo/Frida_Kahlo_14.jpg'

function ReviewPage() {
  return (
  <div>
    <div>
        <div style={{paddingBottom: '75px'}}>
            
        </div>
          <div>

            <ArtTextCols text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}></ArtTextCols>
            <h1 style={{margin: '50px'}}>REVIEWS</h1>
            <h1 style={{margin: '50px'}}>TRENDING</h1>
            
        </div>
          
      </div>

        <div style={{paddingBottom: '50px', padding: '10px 5vw'}}>
          <Carousel images={[img, img2, img3, img4, img5]}></Carousel>
        </div>
  </div>
  );
}

export default ReviewPage;