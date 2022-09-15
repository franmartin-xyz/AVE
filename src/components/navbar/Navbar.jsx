import "./navbar.css"
import React,{useEffect, useState} from 'react'
import {RiGoogleFill,RiCloseLine,RiMenu3Line} from "react-icons/ri"
import { Link } from "react-router-dom"
import { getAuth,GoogleAuthProvider, signInWithPopup, signOut,onAuthStateChanged } from 'firebase/auth'

const Navbar = () => {
  const adminUsers = ["franmartin241001@gmail.com","valesanos.esperanza@gmail.com"]; 
  const logo = "https://firebasestorage.googleapis.com/v0/b/websiteave-c6330.appspot.com/o/logo.png?alt=media&token=504ba522-88eb-419d-9316-19eebe06b0fb"
  const [toggleMenu, setToggleMenu] = useState(false);
  const [authing, setAuthing] = useState(false);
  const [isLogged,setIsLogged] = useState(false);
  const auth = getAuth();
  useEffect(()=>{
    onAuthStateChanged(auth,user=>{
      user ? setIsLogged(true) : setIsLogged(false);
    })
  },[authing])
    const signInWithGoogle = async () => {
        signInWithPopup(auth, new GoogleAuthProvider())
            .then((response) => {
                setAuthing(true);
            })
            .catch((error) => {
                setAuthing(false);
            });
    };
  const googleWidget = {fill:`white`,width:"30px", height:"30px"}
  return (
    <nav className='nm__navbar'>
      <div className='nm__navbar-links'>
        <div className='nm__navbar-links-logo'>
        <Link to="/ave"><img className='nm__img-logo' src={logo} alt="logo" /></Link>
        </div>
        <div className='nm__navbar-links_container'>
          <p><Link to="/ave">Inicio</Link></p>
          <p><Link to="/ave/galeria">Galería 3D</Link></p>
          {isLogged && adminUsers.includes(auth.currentUser.email) && <p><Link to="/ave/noticias">Noticias</Link></p>}
          <p onClick={()=>setToggleMenu(false)}><Link to="/ave/contacto">Contacto</Link></p>
        </div>
      </div>
      {!isLogged && 
        <div id='singInDiv' onClick={()=>{signInWithGoogle()}}><RiGoogleFill style={googleWidget}/><span>Inicia Sesión</span></div>
      }
      {isLogged &&  
      <div className="nm__navbar-sign">
        <button type="button" onClick={()=>signOut(auth).then(setAuthing(false))}>Sign Out</button>
      </div>
      } 
      <div className="nm__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="nm__navbar-menu_container scale-up-center">
          <div className="nm__navbar-menu_container-links">
          <p onClick={()=>setToggleMenu(false)}><Link to="/ave/">Inicio</Link></p>
          <p onClick={()=>setToggleMenu(false)}><Link to="/ave/galeria">Galería 3D</Link></p>
         {isLogged && adminUsers.includes(auth.currentUser.email) && <p onClick={()=>setToggleMenu(false)}><Link to="/noticias">Noticias</Link></p>}
         <p onClick={()=>setToggleMenu(false)}><Link to="/ave/contacto">Contacto</Link></p>
          </div>
        </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar