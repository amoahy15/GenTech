
import Row from "../Navigation/rowScroll";
import Carousel from "../carouselcomponents/Carousel";
import Collections from "./Collections";

const Gallery = () => {
  return (
    <div >
        
        <Row title="Impressionism">
          <div style={{paddingBottom: '50px', padding: '40px 8vw'}}>
            <Collections category="impressionism" />
          </div>
          
        </Row>
        <Row title="Renaissance">
          <div style={{paddingBottom: '50px', padding: '40px 8vw'}}>
          <Collections category="renaissance" />
          </div>
        </Row>
        <Row title="Degas">
          <div style={{paddingBottom: '50px', padding: '40px 8vw'}}>
            <Collections category="Degas" />
          </div>
          
        </Row>
        <Row title="Sculpture">
          <div style={{paddingBottom: '50px', padding: '40px 8vw'}}>
          <Collections category="sculpture" />
          </div>
          
        </Row>
        
        <Row title="Paintings">
          <div style={{paddingBottom: '50px', padding: '40px 8vw'}}>
            <Collections category="painting" />
          </div>
          
        </Row>
        <Row title="Monet">
          <div style={{paddingBottom: '50px', padding: '40px 8vw'}}>
            <Collections category="Monet" />
          </div>
          
        </Row>
        <img></img>
      </div>
  )
};


export default Gallery;
