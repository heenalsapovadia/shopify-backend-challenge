import react, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header/Header";
import Items from "./Items/Items";
import CreateItem from "./Items/CreateItem";
import EditItem from "./Items/EditItem";
import Warehouse from "./Items/Warehouse";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [viewItems, setViewItems] = useState(false);
  const [createItems, setCreateItems] = useState(false);
  const [createWarehouse, setCreateWarehouse] = useState(false);
  const [editItems, setEditItems] = useState(false);
  const [items, setItems] = useState(null);
  const [warehouses, setWarehouses] = useState([
    { name: "waterfront warehouse" },
    { name: "abc warehouse" },
  ]);
  const [editItem, setEditItem] = useState(null);
  const [newWarehouse, setNewWarehouse] = useState(null);

  const viewItemsHandler = () => {
    setViewItems(true);
    setCreateItems(false);
    setEditItems(false);
    setCreateWarehouse(false);
    console.log("view items handler");
  };

  const createItemsHandler = () => {
    setViewItems(false);
    setCreateItems(true);
    setEditItems(false);
    setCreateWarehouse(false);
  };

  const editItemsHandler = () => {
    setViewItems(false);
    setCreateItems(false);
    setEditItems(true);
    setCreateWarehouse(false);
  };

  const createWarehouseHandler = () => {
    setViewItems(false);
    setCreateItems(false);
    setEditItems(false);
    setCreateWarehouse(true);
  };

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
        console.log(items);
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

  const setItemToEdit = (item) => {
    // editItemHandler();
    setEditItem(item);
  };

  const editItemHandler = () => {
    let url = "http://localhost:8080/inventory/item";
    let method = "POST";

    if (editItem.hasOwnProperty("_id")) {
      let itemId = editItem._id;
      url = "http://localhost:8080/inventory/item/" + itemId;
      method = "PUT";
      console.log("Sending Put request");
      console.log(editItem);
    }

    fetch(url, {
      method: method,
      body: JSON.stringify({
        name: editItem.name,
        brand: editItem.brand,
        quantity: editItem.quantity,
        warehouse: editItem.warehouse,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Creating Item failed!");
        }
        return res.json();
      })
      .then((res) => {
        console.log("res", res);
        const item = res.item;

        setItems((prevState) => {
          if (method === "POST") {
            let updatedItems = [
              ...prevState,
              {
                name: res.item.name,
                brand: res.item.brand,
                quantity: res.item.quantity,
                warehouse: res.item.warehouse,
                _id: res.item._id,
              },
            ];
            return updatedItems;
          } else {
            const itemIndex = prevState.findIndex((i) => i._id === item._id);
            let updatedItems = [...prevState];
            updatedItems[itemIndex] = item;
            return updatedItems;
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setItemHandler = (item) => {
    console.log("ind");
    console.log(item);
    setEditItem((prevState) => {
      console.log(prevState);
      return {
        name: item.name,
        brand: item.brand,
        quantity: item.quantity,
        warehouse: item.warehouse,
      };
    });
    console.log(editItem);
  };

  const setNewWarehouseHandler = (warehouse) => {
    setNewWarehouse({
      name: warehouse.name,
      address: warehouse.address,
    });
    console.log(newWarehouse);
  };

  const createNewWarehouseHandler = () => {
    let url = "http://localhost:8080/warehouse/create";
    let method = "POST";

    fetch(url, {
      method: method,
      body: JSON.stringify({
        name: newWarehouse.name,
        address: newWarehouse.address,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Creating Item failed!");
        }
        return res.json();
      })
      .then((res) => {
        console.log("warehouse res", res);
        setWarehouses((prevState) => {
          let updatedWarehouses = [
            ...prevState,
            {
              name: newWarehouse.name,
              address: newWarehouse.address,
            },
          ];
          return updatedWarehouses;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteItemHandler = (itemId) => {
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
      });
  };

  useEffect(() => {
    fetchItems();
    fetchWarehouseList();
  }, []);

  useEffect(() => {
    fetchItems();
    fetchWarehouseList();
  }, [viewItems, createItems, createWarehouse]);

  useEffect(() => {
    fetchItems();
    fetchWarehouseList();
  }, [refresh]);

  return (
    <div className="App">
      <Header
        viewItems={viewItemsHandler}
        createItems={createItemsHandler}
        createWarehouse={createWarehouseHandler}
      ></Header>
      {viewItems && (
        <Items
          items={items}
          onEdit={editItemsHandler}
          editItem={setItemToEdit}
          onDelete={deleteItemHandler}
          refresh={setRefresh}
        ></Items>
      )}
      {createItems && (
        <CreateItem
          warehouses={warehouses}
          editItem={setItemHandler}
          onCreate={editItemHandler}
        ></CreateItem>
      )}
      {createWarehouse && (
        <Warehouse
          newWarehouse={setNewWarehouseHandler}
          onCreate={createNewWarehouseHandler}
        ></Warehouse>
      )}
    </div>
  );
}

export default App;
