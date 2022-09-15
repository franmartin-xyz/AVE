import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Navbar,Footer,AuthProtection} from "./components"
import { Home,Galery,News, Contact } from "./pages"
function App() {
  return (
    <div>
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='ave/' element={<Home/>}/>
          <Route path='ave/galeria/' element={<Galery />} />
          <Route path='ave/contacto/' element={<Contact/>} />
          <Route path='ave/noticias/' element={<AuthProtection><News/></AuthProtection>}/>
        </Routes>
      <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;
