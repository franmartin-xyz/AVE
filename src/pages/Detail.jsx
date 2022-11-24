import React, { useState, useEffect } from 'react'
import "./detail.css"
import {db} from "../components/functions/firebase"
import {doc, getDoc, getDocs,collection} from "firebase/firestore"
import { useParams } from 'react-router-dom'
import { Spinner } from '../components'
function Detail() {
  const [details,setDetails] = useState()
  const [src,setSrc] = useState()
  const [Array,setArray] = useState([]);
  let {id} = useParams();

  
  useEffect(()=>{
    async function data(id){
      const docRef = doc(db, "details",id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDetails(docSnap.data().data);
      } else {
        console.log("No such document!");
      }
    }  
    data(id);
  },[]);

  useEffect(()=>{
    const LogosCollection = collection(db,"logos");
    getDocs(LogosCollection).then(
      document  => { setArray(document.docs[1].data().logos.urls); Array.find((url)=>{
        id===url.id && setSrc(url.url)
      })}
    ); 
  },[details])

  const modelRef = React.useRef();
  return(
    <div className='detail_cont'>
      {details !== undefined ? (
        <>
        <model-viewer
      class="model-detail"
      src={src}
      alt="A rock"
      skybox
      exposure="0.9"
      camera-controls
      ar-scale="auto"
      ar-modes="webxr"
      camera-orbit="90deg 90deg 4.7m"
      max-camera-orbit="auto auto 6m"
      ref={(ref) => {
        modelRef.current = ref;
      }}
      >
    </model-viewer>
    <div className='detail_text'>
        <p>Familia:{details.Familia}</p>
        <p>Pueblo de Origen: {details.PuebloOrigen}</p>
        <p>Tomo: {details.Tomos}</p>
        <br />
        <p className='detail_texto'>Texto sin Traducir: {details.TextoSinTraducir}</p>
        <br />
        <p className='detail_texto'>Texto Traducido: {details.TextoTraducido}</p>
    </div>
        </>
      ):(<><Spinner/></>)
      }
    </div>
  )
}

export default Detail
