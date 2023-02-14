import "./galery.css"
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../components/functions/firebase';
import ReactPaginate from "react-paginate"
import * as Scroll from "react-scroll";
import uuid from "react-uuid";
import { Link } from "react-router-dom";
import { isMobile } from 'react-device-detect';
const Galery = () => {
  const [DataEmblems,setDataEmblems] = useState([])
  const [EmblemArray,setArray] = useState([]);
  const [pageNumber,setPageNumber]=useState(0);
  const [loaded,setLoaded] = useState(false);
  const modelRef = React.useRef();

  
  useEffect(()=>{
        const LogosCollection = collection(db,"logos");
    getDocs(LogosCollection).then(
      document  => {setDataEmblems(document.docs[1].data().logos.urls);}
    );
  },[])
  useEffect(()=>{
    setArray(DataEmblems);
  },[DataEmblems])

  useEffect(()=>{console.log(loaded)},[loaded])

  const itemsPerPage=5;
  const pagesVisited = pageNumber * itemsPerPage
  useEffect(()=>{console.log("pageNumber",pageNumber)},[pageNumber])
  const pageCount = Math.ceil(EmblemArray.length / itemsPerPage);
  useEffect(()=>{console.log("pageCount",pageCount)},[pageCount])

  const displayItems =  EmblemArray.slice(pagesVisited,pagesVisited+itemsPerPage).map((url)=>{
    return( 
      <div className='escudo__cont'  key={uuid()}>
      <model-viewer
      class="model"
      src={url.url}
      alt="A rock"
      skybox
      exposure="1"
      camera-controls
      ar-scale="auto"
      ar-modes="webxr"
      camera-orbit="90deg 90deg 4.7m"
      max-camera-orbit="auto auto 6m"
      progress="1"
      >
    </model-viewer>
    <Link className='escudo__detailsBtn' to={`/AVE/galeria/${url.id}`}>ver más</Link>
  </div>
  )
})

  const changePage = (obj)=>{
    setPageNumber(obj.selected);
    setTimeout(()=>{Scroll.animateScroll.scrollToTop()},100)
  }

  function filterArrayByUrl(array, input) {
    return array.filter(function(obj) {
      return obj.id.toLowerCase().includes(input.toLowerCase());
    });
  }

  function search(e){
    const res = filterArrayByUrl(EmblemArray,e.target.value.toLowerCase())
    if(res.length>0 && e.target.value !== ""){
      setArray(res)
    } 
    else{
      setArray(DataEmblems);
    }
    changePage({"selected":0})
 }

  return (
    <div className='cont'>
      <div className="form__group field">
        <input type="input" autoComplete="off" onChange={(e)=>search(e)} className="form__field" placeholder="Buscar por Apellido" name="search" id='search' ref={(ref) => {
        modelRef.current = ref;
      }}/>
        <label unselectable="on" htmlFor="search" className="form__label" id="search__label">Buscar por Apellido</label>
      </div>
      <div className="Main__cont">
        {displayItems}
       { displayItems.length > 0 && <ReactPaginate 
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBtn"}
          previousLinkClassName={"previousBtn"}
          nextLinkClassName={"nextBtn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
          pageRangeDisplayed={5}
        />}
      </div>
    </div>
  );
}

export default Galery