import React, { useEffect, useState } from 'react'
import "swiper/css"
import "swiper/css/pagination";
import "./home.css"
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../components/functions/firebase'
import { TextReader, Spinner, PostInfo } from '../components';
import * as dayjs from "dayjs"
import {Swiper,SwiperSlide} from 'swiper/react';
import { Pagination } from "swiper";
import uuid from 'react-uuid';
const Home = () => {
  const [news,setNews] = useState([]);
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    const NewsCollection = collection(db,"noticias");
    setLoading(true);
    getDocs(NewsCollection).then(
      snapshop=>{
        snapshop.docs.forEach((doc,i)=>{
          let datas = {...doc.data(),id:doc.id};
          i===0 ? setNews([datas]) : setNews(prevState=>[...prevState,datas])
        })
        setLoading(false)
      }
    ).catch(
      err => {PostInfo("error",`Hay un Problema al descargar las Noticias ${err}`)
      setLoading(false)}
    );
  },[]);
  news.length>0 && news.sort((data,a)=>{return a.time.seconds - data.time.seconds});
  return (
    <div className='news'>
      { news.length>0 ? (
          news.map((data)=>{
            return(
              <div key={uuid()} className="news__cont">
                <div className='news__img-cont'>
                  {
                    data.imagesURL.length >1 ?(
                    <Swiper 
                      pagination={{dynamicBullets: true}}
                      modules={[Pagination]}
                      className="news__swiper"
                    >{
                  data.imagesURL.map((url)=>{return(
                    <SwiperSlide key={uuid()}>
                      <img src={url} alt="imagen de noticia" />
                    </SwiperSlide>
                    )})}
                    </Swiper>)
                    :
                    <img src={data.imagesURL[0]} alt="imagen de noticia" />
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
      : loading ?  <Spinner /> : <span className='new__noNews'>No hay noticias</span>
      }
    </div>
  )
}

export default Home