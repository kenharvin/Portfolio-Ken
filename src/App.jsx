import NavBar from "./components/NavBar/navBar.jsx";
import "./App.css";
import Home from "./components/home/home.jsx";
import About from "./components/home/about.jsx";
import Projects from "./components/projects/projects.jsx";

function App() {
  return (
    <div className="app">
      <NavBar />
      <Home />
      <About />
      <Projects />
    </div>
  );
}

export default App;