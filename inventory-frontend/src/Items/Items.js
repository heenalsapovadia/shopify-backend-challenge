import react, { useState, useEffect } from "react";
import Item from "./Item";

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

  const editItemHandler = (itemId) => {
    // event.preventDefault();
    
    // setItems((prevState) => {
    //   const toEditItem = { ...prevState.find((i) => i._id === itemId) };
    // });
  };

  const deleteItemHandler = (itemId) => {
    // event.preventDefault();
    console.log("ITEM_ID", itemId);
    fetch("http://localhost:8080/inventory/item/" + itemId, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Deleting a post failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        setItems((prevState) => {
          const updatedItems = prevState.filter((p) => p._id !== itemId);
          return updatedItems;
        });
      })
      .catch((err) => {
        console.log(err);
        // this.setState({ postsLoading: false });
      });
  };

  let itemsRender = items
    ? items.map((item) => (
        <Item
          item={item}
          key={item._id}
          onEdit={editItemHandler.bind(this, item._id)}
          onDelete={deleteItemHandler.bind(this, item._id)}
        ></Item>
      ))
    : [];
  return (
    <>
      <div>Items</div>
      <div>{itemsRender.length!=0 && itemsRender}</div>
      
    </>
  );
};

export default Items;
