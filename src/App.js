import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Navbar,Footer,AuthProtection} from "./components"
import { Home,Galery,News, Contact, Detail } from "./pages"
function App() {
  return (
    <div id='root_wrapper'>
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='AVE/' element={<Home/>}/>
          <Route path='AVE/galeria/' element={<Galery />} />
          <Route path='AVE/contacto/' element={<Contact/>} />
          <Route path='AVE/galeria/:id' element={<Detail/>} />
          <Route path='AVE/noticias/' element={<AuthProtection><News/></AuthProtection>}/>
        </Routes>
      <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;
