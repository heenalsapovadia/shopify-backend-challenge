import react, { useState } from "react";
import "./App.css";
import Header from "./Header/Header";
import Items from "./Items/Items";
import CreateItem from "./Items/CreateItem";

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
      {createItems && <CreateItem></CreateItem>}
    </div>
  );
}

export default App;
