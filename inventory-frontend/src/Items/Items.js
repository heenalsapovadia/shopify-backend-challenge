import react, { useState, useEffect } from "react";
import Item from "./Item";

const Items = (props) => {
  const [items, setItems] = useState(null);
  const [warehouses, setWarehouses] = useState([
    { name: "waterfront warehouse" },
    { name: "abc warehouse" },
  ]);

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

  const fetchWarehouseList = () => {
    // fetch
    console.log("fetch warehouses");
    fetch("http://localhost:8080/warehouse/get")
      .then((result) => {
        if (result.status !== 200) {
          throw new Error("Could not fetch Items from inventory");
        }
        return result.json();
      })
      .then((warehouseData) => {
        console.log("Fetched items successfully", warehouseData);
        setWarehouses(warehouseData.item);
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    fetchItems();
    fetchWarehouseList();
  }, []);

  const editItemHandler = (item) => {
    console.log("Item to edit : ", item);
    props.editItem();
    props.onEdit();
  };

  // const deleteItemHandler = (itemId) => {
  //   // event.preventDefault();
  //   console.log("ITEM_ID", itemId);
  //   fetch("http://localhost:8080/inventory/item/" + itemId, {
  //     method: "DELETE",
  //   })
  //     .then((res) => {
  //       if (res.status !== 200 && res.status !== 201) {
  //         throw new Error("Deleting a post failed!");
  //       }
  //       return res.json();
  //     })
  //     .then((resData) => {
  //       console.log(resData);
  //       setItems((prevState) => {
  //         const updatedItems = prevState.filter((p) => p._id !== itemId);
  //         return updatedItems;
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       // this.setState({ postsLoading: false });
  //     });
  // };

  const deleteItemHandler = (item) => {
    console.log("item to delete : ", item);
    props.onDelete(item._id);
  };

  let itemsRender = props.items
    ? props.items.map((item) => (
        <Item
          item={item}
          key={item._id}
          onEdit={editItemHandler.bind(this, item)}
          onDelete={deleteItemHandler.bind(this, item)}
          warehouses = {warehouses}
          refresh={props.refresh}
        ></Item>
      ))
    : [];
  console.log(props.items);
  return (
    <>
      <div>Items</div>
      <div>{itemsRender.length != 0 && itemsRender}</div>
    </>
  );
};

export default Items;
