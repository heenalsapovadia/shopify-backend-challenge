import react, { useState, useEffect } from "react";
const Items = () => {
  const [items, setItems] = useState(null);

  const fetchItems = () => {
    console.log("fetch items");
    fetch("http://localhost:8080/inventory/items")
      .then((result) => {
        if (result.status !== 200) {
          throw new Error("Could not fetch Items from inventory");
        }
        return result.json();
      })
      .then((itemsData) => {
        console.log("Fetched items successfully", itemsData);
        setItems(itemsData.item);
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  let itemsRender = items.map((item) => (
    <div>
      <h1>{item.name}</h1>
      <h2>{item.brand}</h2>
      <h3>{item.quantity}</h3>
    </div>
  ));
  return (
    <>
      <div>Items</div>
      <div>{itemsRender}</div>
    </>
  );
};

export default Items;
