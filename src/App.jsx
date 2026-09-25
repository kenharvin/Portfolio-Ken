import NavBar from "./components/navBar/navBar.jsx";
import "./App.css";
import Home from "./components/home/home.jsx";
import About from "./components/home/about.jsx";
import Projects from "./components/projects/projects.jsx";
import Contact from "./components/contact/contact.jsx";

function App() {
  return (
    <div className="app">
      <NavBar />
      <Home />
      <About />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;