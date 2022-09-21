import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../components/functions/firebase';
import "./galery.css"
const Galery = () => {
  const [Array,setArray] = useState([]);
  const modelRef = React.useRef();
  function search(e){
    const res = Array.filter((url) => {url = url.toLowerCase(); return url.includes(e.target.value.toLowerCase())})
    if(res.length>0 && e.target.value !== "") setArray(res); else {
      const LogosCollection = collection(db,"logos");
      getDocs(LogosCollection).then(
      document  => { setArray(document.docs[0].data().urls);}
      );
    }
 }
  useEffect(()=>{
    const LogosCollection = collection(db,"logos");
    getDocs(LogosCollection).then(
      document  => { setArray(document.docs[0].data().urls);}
    );
  },[])
  return (
    <div className='cont'>
      <div className="form__group field">
        <input type="input" autoComplete="off" onChange={(e)=>search(e)} className="form__field" placeholder="Buscar por Apellido" name="search" id='search' />
        <label unselectable="on" htmlFor="search" className="form__label" id="search__label">Buscar por Apellido</label>
      </div>
    <div className="Main__cont">
      {Array.map((url,i)=>{
        return( 
          <div className='escudo__cont'  key={i}>
          <model-viewer
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