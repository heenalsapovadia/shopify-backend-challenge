import { useState, useEffect } from "react";

const Item = ({ item, onEdit, onDelete, warehouses, refresh }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(item.name);
  const [brand, setBrand] = useState(item.brand);
  const [quantity, setQuantity] = useState(item.quantity);
  const [warehouse, setWarehouse] = useState(item.warehouse);

  const warehouseRender = warehouses.map((warehouse) => (
    <option value={warehouse.name}>{warehouse.name}</option>
  ));

  const editItem = () => {
    let url = "http://localhost:8080/inventory/item/" + item._id;
    let method = "PUT";

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
          throw new Error("Editing Item failed!");
        }
        return res.json();
      })
      .then((res) => {
        console.log("res", res);
        // form gayab
        setEditing(false);
        refresh(Math.random())
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <p>{item.name}</p>
        <p>{item.brand}</p>
        <p>{item.quantity}</p>
        <button onClick={() => setEditing(!editing)}>Edit</button>
        <button onClick={() => onDelete()}>Delete</button>
      </div>
      {editing ? (
        <div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </div>
          <div>
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Brand"
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
            />
          </div>
          <div>
            <label htmlFor="warehouses">Warehouse</label>
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
          <button
            onClick={() => {
              editItem();
            }}
          >
            EDIT ITEM
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Item;
