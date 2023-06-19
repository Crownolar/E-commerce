import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [apiData, setApiData] = useState([]);
  const [hit, setHit] = useState(0);

  const url = `https://fakestoreapi.com/products`;

  const getAllData = () => {
    const startIndex = hit * 3;
    const endIndex = startIndex + 3;
    axios.get(url).then((res) => {
      const allData = res.data;
      const newData = allData.slice(startIndex, endIndex);
      setApiData(newData);
    });
  };

  console.log(apiData);

  useEffect(() => {
    getAllData();
  }, [hit]);

  const addNum = () => {
    setHit((prevHit) => prevHit + 1);
  };

  const Subnum = () => {
    if (hit <= 0) {
      setHit(0);
    } else {
      setHit((prevHit) => prevHit - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setHit((prevHit) => (prevHit + 1) % 7);
    }, 3000);

    return () => clearInterval(interval); 
  }, []);

  console.log(hit);

  const renderCarouselImages = () => {
    return apiData.map((item, index) => (
      <div className={`img${index + 1}`} key={index}>
        <div className="image">
          <img src={item.image} alt={`Image ${index}`} />
        </div>
        <h3>{item.title}</h3>
      </div>
    ));
  };
 
  return (
    <>
      <main>
        <section>
          <div className="Home">
            <header>
              <h1>Carousel</h1>
            </header>
            <article>
              <div className="Left">
                <div className="less" onClick={Subnum}></div>
              </div>
              <div className="carousel">{renderCarouselImages()}</div>
              <div className="Right">
                <div className="less" onClick={addNum}></div>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
