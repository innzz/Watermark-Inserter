import './App.css';
import { useRef, useEffect, useState } from "react";

export default function App() {
  const imgContainerRef = useRef(null);
  const [watermark, setWatermark] = useState(true);
  const [watermarked, setWatermarked] = useState("watermarked");

  useEffect(() => {
    
    const imgContainerSelector = imgContainerRef.current.querySelectorAll(
      ".watermarked"
    );

    console.log("watermark ", watermark);
    console.log("imgContainerSelector ", imgContainerSelector[0].dataset);
    if (watermark) {
      //To reapeat same watermark on multiple images
      imgContainerSelector.forEach(element => {
          element.dataset.watermark = (
            element.dataset.watermark + "   "
          ).repeat(300);
      });

      //To repeat watermasrk on single image
      // imgContainerSelector.dataset.watermark = (
      //   imgContainerSelector.dataset.watermark + "   "
      // ).repeat(300);
    } else {
      imgContainerSelector.forEach(element => {
        element.dataset.watermark = "";
      });
      // imgContainerSelector.dataset.watermark = "";
    }
  }, [watermark]);

  const removeWatermark = () => {
    setWatermark(false);
  };

  const addWaterMark = () => {
    setWatermark(true);
  };

  return (
    <div className="App" ref={imgContainerRef}>
      <h1>Watermark Image in React using CSS</h1>
      <h2>Toggle watermark to see some magic happen!</h2>

      <button onClick={removeWatermark}>Remove watermark</button>
      <button onClick={addWaterMark}>Add watermark</button>
      <br />
      <br />

      <div className={watermarked} data-watermark="inzamam">
        <img
          src="https://source.unsplash.com/Dm-qxdynoEc/800x799"
          alt="mushroom"
        />
      </div>
      <div className="watermarked" data-watermark="inzamam">
        <img
          src="https://source.unsplash.com/Dm-qxdynoEc/800x799"
          alt="mushroom"
        />
      </div>
      <div className="watermarked" data-watermark="inzamam">
        <img
          src="https://source.unsplash.com/Dm-qxdynoEc/800x799"
          alt="mushroom"
        />
      </div>
      <div className="watermarked" data-watermark="inzamam">
        <img
          src="https://source.unsplash.com/Dm-qxdynoEc/800x799"
          alt="mushroom"
        />
      </div>
    </div>
  );
}

