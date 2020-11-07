import React from "react";
import Carousel from "react-bootstrap/Carousel";

const Carousello = () => {
  const [index, setIndex] = React.useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Carousel activeIndex={index} onSelect={handleSelect} interval={5000}>
        <Carousel.Item style={{ height: 500 }}>
          <img
            className="d-block w-100"
            src="https://images.everyeye.it/img-articoli/it-capitolo-2-recensione-dell-ultra-hd-blu-ray-4k-dolby-vision-v6-46698.jpg"
            alt="First slide"
            style={{ height: 500 }}
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{ height: 500}}>
          <img
            className="d-block w-100"
            src="https://cdn.dday.it/system/uploads/news/main_image/26466/main_skyhdrmain.jpg"
            alt="Second slide"
            style={{ height: 500}}
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{ height: 500}} >
          <img
            className="d-block w-100"
            src="https://i.pinimg.com/originals/09/32/93/093293aec861568b494332050c09c316.png"
            alt="Third slide"
            style={{ height: 500}}
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item style={{ height: 500}} >
          <img
            className="d-block w-100"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTiclcmC4PzUmKElz1RrxYo5TXuaUYDPdSj6w&usqp=CAU"
            alt="Third slide"
            style={{ height: 500}}
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};
export default Carousello;