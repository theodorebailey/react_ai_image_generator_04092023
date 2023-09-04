import React, { useState, useRef } from 'react'
import './ImageGenerator.css';
import default_image from '../assets/default_image.svg';


export default function ImageGenerator() {

  // initialise useState with a slash
  // so we can use to search in a url
  const [image_url, setImage_url] = useState("/")
  // useRef to reference the element of the webpage
  let inputRef = useRef(null);

  // update classname of loading bar and loading text
  const [loading,setLoading] = useState(false);

  // works but no free credits
  const apiKey = process.env.REACT_APP_AI_IMAGE_API_KEY_04092023;

  const imageGenerator = async () => {
    if (inputRef.current.value===""){
      return 0;
    }
    setLoading(true);
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
          // delete key prior to posting on github
          Authorization: 
          `Bearer ${apiKey}`,
          "User-Agent": "Chrome",
        },
        body:JSON.stringify({
          // prompt value in search field 
          prompt: `${inputRef.current.value}`,
          // number of images
          n:1,
          size:"512x512"
        }),
      }
    );

    // response data from json method
    let data = await response.json();

    console.log(data);

    // data array in api response
    let data_array = data.data;

    setImage_url(data_array[0].url)
    // hide loading animation text and bar
    setLoading(false);
    
    
  }


  return (
    <div className="ai-image-generator">
      <div className="header">AI image <span>generator</span></div>
      <div className="img-loading">
        <div className="image">
          {/*  */}
          <img src={image_url==="/"?default_image:image_url} alt="" />
        </div>
        <div className="loading">
            <div className={loading?"loading-bar-full":"loading-bar"}></div>
            <div className={loading?"loading-text":"display-none"}>Loading...</div>
          </div>
      </div>
      <div className="search-box">
        <input type="text" ref={inputRef} className="search-input" placeholder="Describe what you want to see" />
        <div className="generate-btn" onClick={() =>{imageGenerator()}}>
          Generate
        </div>
      </div>
    </div>
  )
}
