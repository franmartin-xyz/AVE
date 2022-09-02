import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../components/functions/firebase'
import { TextReader, Spinner, PostInfo } from '../components';
import "./home.css"
import * as dayjs from "dayjs"
const Home = () => {
  const [news,setNews] = useState([]);
  useEffect(()=>{
    const NewsCollection = collection(db,"noticias");
    getDocs(NewsCollection).then(
      snapshop=>{
        snapshop.docs.map((doc,i)=>{
          let datas = {...doc.data(),id:doc.id};
          i===0 ? setNews([datas]) : setNews(prevState=>[...prevState,datas])
        })
      }
    ).catch(
      err => PostInfo("error",`Hay un Problema al descargar las Noticias ${err}`)
    );
  },[]);
  news.sort((data,a)=>{return a.time.seconds - data.time.seconds});
  return (
    <div className='news'>
      { news.length>0 ? (
          news.map((data,i)=>{
            return(
              <div key={i} className="news__cont">
                <div className='news__img-cont'>
                  {
                  data.imagesURL.map((url,i)=>{return(
                    <img src={url} alt="imagen de noticia" key={i}/>
                    )})
                  } 
                </div>
                <title className='news__title'>{data.title}</title>
                <div className='news__text'>
                  <TextReader newState={data.text}/>
                </div>
                <span className='news__time'>{
                  dayjs(new Date(data.time.seconds*1000)).format("DD/MM/YYYY hh:mm") 
                }</span>
              </div>
            )
        })
      ) 
      : <Spinner />
      }
    </div>
  )
}

export default Home