import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Grid from "./components/Grid/Grid";
import Sidebar from "./components/Sidebar/Sidebar";
import {
    BrowserRouter,
    Route, Routes, useLocation
} from "react-router-dom";
import AboutUs from "./components/AboutUs/AboutUs";
function App() {
  return (
      <>
          <BrowserRouter>
          <Navbar/>
          <Sidebar/>
              <Routes>
          <Route path="*" element={<PathDisplayWrapper/>} />
              </Routes>
      </BrowserRouter>
      </>
  );
}
function PathDisplayWrapper() {
    const location = useLocation();
    if(location.pathname === "/about-us"){
        return <AboutUs/>
    }
    return <Grid key={location.key} location={location} page={1} />;
}
export default App;
