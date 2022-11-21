import React, { useState, useEffect } from 'react'
import "./detail.css"
import {db} from "../components/functions/firebase"
import {doc, getDoc} from "firebase/firestore"
import { useParams } from 'react-router-dom'
function Detail() {
  const [details,setDetails] = useState()
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
    data(id) ; 
  },[]);
  useEffect(()=>{console.log(details)},[details])

  return(
    <div className='detail_cont'>
      {details !== undefined ? (
        <>
        <p>Familia:{details.Familia}</p>
        <p>Pueblo de Origen: {details.PuebloOrigen}</p>
        <p>Tomo: {details.Tomos}</p>
        <br />
        <p>Texto sin Traducir: {details.TextoSinTraducir}</p>
        <br />
        <p>Texto Traducido: {details.TextoTraducido}</p>
        </>
      ):("no hay datos")
      }
    </div>
  )
}

export default Detail
