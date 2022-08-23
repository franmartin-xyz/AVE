import "./main.css"
import React from 'react'

const Main = () => {
  const modelRef = React.useRef();
  const arr = ["Escudo_01_Zuber.glb","./ZuberLogo.glb","./ZuberLogo2.glb","./Hacha de Metal.glb"];
  return (
    <div className="Main__cont">
      {arr.map((url)=>{
        return( 
        <model-viewer
        key={url}
        class="model"
        src={url}
        auto-rotate
        auto-rotate-delay="1000"
        alt="A rock"
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

export default Main