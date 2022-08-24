import React from 'react'
import {default as arr} from "./arr"
const Galery = () => {
  const modelRef = React.useRef();
  
  return (
    <div className="Main__cont">
      {arr.map((url)=>{
        return( 
        <model-viewer
        key={url}
        class="model"
        src={url}
        // auto-rotate
        auto-rotate-delay="1000"
        alt="A rock"
        skybox
        exposure="1.5"
        camera-controls
        ar-scale="auto"
        ar-modes="webxr"
        camera-orbit="90deg 90deg 10m"
        ref={(ref) => {
          modelRef.current = ref;
        }}
        >
      </model-viewer>)})}
    </div>
  );
}

export default Galery