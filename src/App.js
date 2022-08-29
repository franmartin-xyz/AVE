import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Navbar,Footer,AuthProtection} from "./components"
import { Home,Galery,News } from "./pages"
function App() {
  return (
    <div>
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/AVE/' element={<Home/>}/>
          <Route path='/galeria' element={<Galery />} />
          <Route path='/noticias' element={<AuthProtection><News/></AuthProtection>}/>
        </Routes>
      <Footer/>
    </BrowserRouter>
    </div>
  );
}

export default App;
