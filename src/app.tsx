import reactLogo from "./assets/react.svg";
import "./app.css";
import { Home } from "./views/home";

const App = () => (
  <div className="app">
    <div className="app__row">
      <a href="https://www.thisisbud.com/" target="_blank" rel="noreferrer">
        <img src="/bud.svg" className="logo" alt="Bud logo" />
      </a>
      <a href="https://reactjs.org" target="_blank" rel="noreferrer">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>
    <Home />
  </div>
);

export default App;
