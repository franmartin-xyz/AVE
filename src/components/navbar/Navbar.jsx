import "./navbar.css"
import React,{useContext,useState} from 'react'
import {RiGoogleFill,RiCloseLine,RiMenu3Line} from "react-icons/ri"
import { Link } from "react-router-dom"
import logo from "../assets/logo.png"
const Navbar = () => {
  // const {user, setUser} = useContext(userLoginContext);
   const [user,setUser] = useState({});
  const [toggleMenu, setToggleMenu] = useState(false);
  
  const handleLogin = ()=>{
  //   function singInWithGoogle (){
  //     signInWithPopup(auth,provider)
  //     .then((res)=> {
  //       console.log (jwt_decode(res.user.accessToken));
  //       const userMail = jwt_decode(res.user.accessToken).email;
  //       let userName = jwt_decode(res.user.accessToken).name;
  //       userName = userName.split(" ");
  //       console.log(userMail);
  //       setUser({email:userMail,given_name:userName[0],surname:userName[1]});
  //     })
  //     .catch(err => {console.log (err)})
  //     }
  //   singInWithGoogle();
   }; 

   function handleSingOut(e){
  //   setUser({});
   }
  const googleWidget = {fill:`white`,width:"30px", height:"30px"}
  return (
    <nav className='nm__navbar'>
      <div className='nm__navbar-links'>
        <div className='nm__navbar-links-logo'>
        <Link to="NauticaMartinTienda/"><img className='nm__img-logo' src={logo} alt="logo" /></Link>
        </div>
        <div className='nm__navbar-links_container'>
          <p><Link to="NauticaMartinTienda/">Inicio</Link></p>
          <p><Link to="NauticaMartinTienda/mypurchase">Galería 3D</Link></p>
          <p><Link to="NauticaMartinTienda/products">Noticias</Link></p>
        </div>
      </div>
      {Object.keys(user).length == 0 &&
        <div id='singInDiv' onClick={()=>{handleLogin()}}><RiGoogleFill style={googleWidget}/><span>Inicia Sesión</span></div>
      }
      {Object.keys(user).length != 0 &&  <div className="nm__navbar-sign">
        <span className='nm__navbar-sign-welcome'>Hola! {user.given_name}</span>
        <button type="button" onClick={(e)=>handleSingOut(e)}>Sign Out</button>
      </div>}
      <div className="nm__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="nm__navbar-menu_container scale-up-center">
          <div className="nm__navbar-menu_container-links">
          <p><Link to="NauticaMartinTienda/">Inicio</Link></p>
          <p><Link to="NauticaMartinTienda/mypurchase">Galería 3D</Link></p>
          <p><Link to="NauticaMartinTienda/products">Noticias</Link></p>
          </div>
        </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar