import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Navbar,Footer,Main} from "./components"
function App() {
  return (
    <BrowserRouter>
    <div>
      <Navbar/>
      <Main/>
      <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
