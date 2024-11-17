import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Grid from "./components/Grid/Grid";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
      <>
          <Navbar/>
          <Sidebar/>
          <div className="absolute left-0 top-14 w-full"><Grid/></div>


      </>
  );
}

export default App;
