import "./App.scss";
import { Todo } from "./components/Todo";
import icon from "./imgs/icon-sun.png";
function App() {
  return (
    <div className="app">
      <header>
        <div className="flexbox">
          <div className="head">
            <h1>TODO</h1>
            <img src={icon} alt="icon" className="icon" />
          </div>

          <div className="txt-enter">
            <Todo />
          </div>
        </div>
      </header>
    </div>
  );
}
export default App;
