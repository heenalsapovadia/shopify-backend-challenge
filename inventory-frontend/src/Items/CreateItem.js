import { useState, useEffect } from "react";
const CreateItem = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [warehouse, setWarehouse] = useState("");

  const [warehouses, setWarehouses] = useState([
    { name: "waterfront warehouse" },
    { name: "abc warehouse" },
  ]);

  const postItem = (event) => {
    let url = "http://localhost:8080/inventory/item";
    let method = "POST";

    fetch(url, {
      method: method,
      body: JSON.stringify({
        name: name,
        brand: brand,
        quantity: quantity,
        warehouse: warehouse,
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
      })
      .catch((err) => {
        console.log(err);
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
    fetchWarehouseList();
  }, []);

  const warehouseRender = warehouses.map((warehouse) => (
    <option value={warehouse.name}>{warehouse.name}</option>
  ));

  return (
    <div>
      <div>
        <label>Name</label>
        <input
          type="text"
          id="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
      </div>
      <div>
        <label>Brand</label>
        <input
          type="text"
          id="brand"
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Brand"
        />
      </div>
      <div>
        <label>Quantity</label>
        <input
          type="number"
          id="quantity"
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
        />
      </div>
      <div>
        <label for="warehouses">Warehouse</label>
        <select
          name="warehouses"
          id="warehouses"
          value={warehouse}
          onChange={(e) => {
            console.log(e.target.value);
            setWarehouse(e.target.value);
          }}
        >
          {warehouseRender}
        </select>
      </div>
      <button onClick={postItem}>CREATE ITEM</button>
    </div>
  );
};
export default CreateItem;
