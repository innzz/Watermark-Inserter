import './App.css';
import { useRef, useEffect, useState } from "react";
import watermark from 'watermarkjs';
import { render } from '@testing-library/react';

export default function App() {
  const imageToWaterMarkRef = useRef();
  const [imageToWaterMark, setImageToWaterMark] = useState('');
  const [loader, setLoader] = useState(false);
  const [prevImageToWaterMark, setPrevImageToWaterMark] = useState('');
  const [watermarkAdded, setWatermarkAdded] = useState(false);
  const [preview, setPreview] = useState(null);

  const setPreviewImage = (imageToWaterMark,position)=>{
    setPrevImageToWaterMark(imageToWaterMark);
      const options = {
                init(img) {
                  img.crossOrigin = 'anonymous'
                }
        };
        if (position === "center") {
          setLoader(true);
          watermark([imageToWaterMark, '/Logo_Bookone.svg'], options)
          .image(watermark.image.center(0.6))
          .then(img => {setLoader(false);setPreview(img.src)});
        }
        else if (position === "lower right"){
          setLoader(true);
          watermark([imageToWaterMark, '/Logo_Bookone.svg'], options)
          .image(watermark.image.lowerRight(0.6))
          .then(img => {setLoader(false);setPreview(img.src)});
        }
        else if (position === "upper right"){
          setLoader(true);
          watermark([imageToWaterMark, '/Logo_Bookone.svg'], options)
          .image(watermark.image.upperRight(0.6))
          .then(img => {setLoader(false);setPreview(img.src)});
        }
        else if (position === "lower left"){
          setLoader(true);
          watermark([imageToWaterMark, '/Logo_Bookone.svg'], options)
          .image(watermark.image.lowerLeft(0.6))
          .then(img => {setLoader(false);setPreview(img.src)});
        }
        else if (position === "upper left"){
          setLoader(true);
          watermark([imageToWaterMark, '/Logo_Bookone.svg'], options)
          .image(watermark.image.upperLeft(0.6))
          .then(img => {setLoader(false);setPreview(img.src)});
        }
  }

  const addWaterMark = (imageToWaterMark,position)=>{
    if (imageToWaterMark){
      const reader = new FileReader();
      reader.onloadend = ()=>{
        setWatermarkAdded(true);
        setPreviewImage(reader.result,position);
      }
      reader.readAsDataURL(imageToWaterMark);
    }
  }

  const removeWatermark = ()=>{
    const prevImage = prevImageToWaterMark;
    setWatermarkAdded(false);
    setPreview(prevImage);
  }

  useEffect(() => {
    if (imageToWaterMark){
      const reader = new FileReader();
      reader.onloadend = ()=>{
        setWatermarkAdded(false);
        setPreview(reader.result);
      }
      reader.readAsDataURL(imageToWaterMark);
    }
    else{
      setPreview(null);
    }

  }, [imageToWaterMark])
  

  return (
    <div className="App-container">
      <div className="contentContainer">
          <div className="leftSection">
            <div className="inputSection">
              <input ref={imageToWaterMarkRef} style={{display: "none"}} type="file" accept="image/*" onChange={(e)=> {
                const file = e.target.files[0];
                if (file && file.type.substring(0,5) === "image") {
                  setImageToWaterMark(file);
                }
                else{
                  setImageToWaterMark(null);
                }
              }} />
              <div className="input">
              <button onClick={(e)=>{
                e.preventDefault();
                imageToWaterMarkRef.current.click();
              }}>Browse...</button>
              <input type="text" value={imageToWaterMark !== null ? imageToWaterMark.name : ''} />
              </div>
              <span>Select the image to watermark</span>
            </div>
            {watermarkAdded ? imageToWaterMark !== "" ? <button className='addRemoveToggleBtn' onClick={()=> removeWatermark(imageToWaterMark)}>Remove watermark</button> : <button disabled className='addRemoveToggleBtn disabledAddToggleBtn'>Remove watermark</button> : imageToWaterMark !== "" ? <button className='addRemoveToggleBtn' onClick={()=> addWaterMark(imageToWaterMark,"center")}>Add watermark</button> : <button className='addRemoveToggleBtn disabledAddToggleBtn'>Add watermark</button>}
            <div className="positionsSection">
              {imageToWaterMark !== "" ? <h3>Select position</h3> : <h3>Select image to enable these options</h3>}
              {imageToWaterMark !== ""
              ?
              <div className="positions">
                <div className="positionInput">
                  <input onClick={()=> addWaterMark(imageToWaterMark,"lower right")} type="radio" name="position" />
                  <span>Lower right</span>
                </div>
                <div className="positionInput">
                  <input onClick={()=> addWaterMark(imageToWaterMark,"upper right")} type="radio" name="position" />
                  <span>Upper right</span>
                </div>
                <div className="positionInput">
                  <input onClick={()=> addWaterMark(imageToWaterMark,"lower left")} type="radio" name="position" />
                  <span>Lower left</span>
                </div>
                <div className="positionInput">
                  <input onClick={()=> addWaterMark(imageToWaterMark,"upper left")} type="radio" name="position" />
                  <span>Upper left</span>
                </div>
                <div className="positionInput">
                  <input onClick={()=> addWaterMark(imageToWaterMark,"center")} type="radio" name="position" />
                  <span>Center</span>
                </div>
              </div>
              :
              <div className="positions">
                <div className="positionInput">
                  <input disabled type="radio" name="position" />
                  <span>Lower right</span>
                </div>
                <div className="positionInput">
                  <input disabled type="radio" name="position" />
                  <span>Top right</span>
                </div>
                <div className="positionInput">
                  <input disabled type="radio" name="position" />
                  <span>Lower left</span>
                </div>
                <div className="positionInput">
                  <input disabled type="radio" name="position" />
                  <span>Top left</span>
                </div>
                <div className="positionInput">
                  <input disabled type="radio" name="position" />
                  <span>Center</span>
                </div>
              </div>
              }
              {imageToWaterMark !== "" ? <a href={preview} download="myfile.jpeg" className='imageDownloadButton'>Download Image</a> : <a className='disabledAddToggleBtn'>Download Image</a>}
            </div>
          </div>
          <div className="rightSection">
            <h1>Preview</h1>
            <div className="previewImgContainer" >
              {preview !== null && loader === false ? <>{loader === false ? <img src={preview} /> : <img style={{border: "none",marginTop: "100px"}} src="https://media.tenor.com/0Q5kA1OnDwkAAAAi/load-loading.gif" /> }</> : <img style={{border: "none",marginTop: "100px"}} src="https://media.tenor.com/0Q5kA1OnDwkAAAAi/load-loading.gif" /> }
            </div>
          </div>
      </div>
    </div>
  );
}

