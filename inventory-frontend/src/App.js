import react, { useState } from "react";
import "./App.css";
import Header from "./Header/Header";
import Items from "./Items/Items";

function App() {
  const [viewItems, setViewItems] = useState(false);
  const [createItems, setCreateItems] = useState(false);

  const viewItemsHandler = () => {
    setViewItems(true)
    setCreateItems(false)
    console.log("view items handler")
  }

  const createItemsHandler = () => {
    setViewItems(false)
    setCreateItems(true)
  }

  return (
    <div className="App">
      <Header viewItems = {viewItemsHandler} createItems = {createItemsHandler}></Header>
      {viewItems && <Items></Items>}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
