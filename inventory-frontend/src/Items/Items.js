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
  }, [fetchItems]);

  const editItemHandler = (event, itemId) => {
    event.preventDefault();
  };

  const deleteItemHandler = (event, itemId) => {
    event.preventDefault();
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
        this.setState((prevState) => {
          const updatedPosts = prevState.posts.filter((p) => p._id !== postId);
          return { posts: updatedPosts, postsLoading: false };
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ postsLoading: false });
      });
  };

  let itemsRender = items.map((item) => (
    <Item
      item={item}
      key={item._id}
      editItemHandler={editItemHandler.bind(this, item._id)}
      deleteItemHandler={deleteItemHandler.bind(this, item._id)}
    ></Item>
  ));
  return (
    <>
      <div>Items</div>
      <div>{itemsRender}</div>
    </>
  );
};

export default Items;
