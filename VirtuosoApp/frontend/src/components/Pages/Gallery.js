
import Row from "../Navigation/rowScroll";
import Carousel from "../carouselcomponents/Carousel";
import Collections from "./Collections";

const Gallery = () => {
  return (
    <div >
        <Row title="Paintings">
          <div style={{paddingBottom: '50px', padding: '10px 8vw'}}>
            <Collections category="painting" />
          </div>
          
        </Row>
        <Row title="Sculpture">
          <div style={{paddingBottom: '50px', padding: '10px 8vw'}}>
          <Collections category="sculpture" />
          </div>
          
        </Row>
        <Row title="Renaissance">
          <div style={{paddingBottom: '50px', padding: '10px 8vw'}}>
          <Collections category="renaissance" />
          </div>
        </Row>
        <img></img>
      </div>
  )
};


export default Gallery;
