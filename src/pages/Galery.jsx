import React, { useState } from 'react'
import {default as arr} from "./arr"
import "./galery.css"
const Galery = () => {
  const [Array,setArray] = useState(arr);
  const modelRef = React.useRef();
  function search(e){
  const res = arr.filter((url) => {url = url.toLowerCase(); return url.includes(e.target.value.toLowerCase())})
  setArray(res);
  }
  return (
    <div className='cont'>
      <div className="form__group field">
        <input type="input" autoComplete="off" onChange={(e)=>search(e)} className="form__field" placeholder="Buscar por Apellido" name="search" id='search' />
        <label unselectable="on" htmlFor="search" className="form__label" id="search__label">Buscar por Apellido</label>
      </div>
    <div className="Main__cont">
      {Array.map((url)=>{
        return( 
          <div className='escudo__cont'>
          <model-viewer
          key={url}
          class="model"
          src={url}
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
        </model-viewer>
        <button className='escudo__detailsBtn'>ver más</button>
      </div>
      )})}
    </div>
          </div>
  );
}

export default Galery