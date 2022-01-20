import { useState, useEffect } from "react";

const EditItem = (props) => {
  const [name, setName] = useState(props.item.name);
  const [brand, setBrand] = useState(props.item.brand);
  const [quantity, setQuantity] = useState(props.item.quantity);
  const [warehouse, setWarehouse] = useState(props.item.warehouse);

  useEffect(() => {
    console.log("edit item props", props);
  }, []);

  const editItemHandler = () => {
    console.log("inside editItemHandler : ");
    props.editItem({
      name: name,
      brand: brand,
      quantity: quantity,
      warehouse: warehouse,
    });
    props.onEdit();
  };

  const editItem = () => {
    let url = "http://localhost:8080/inventory/item/" + props.item._id;
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
        // let updatedItems = [
        //   ...props.items,
        //   {
        //     name: name,
        //     brand: brand,
        //     quantity: quantity,
        //     warehouse: warehouse,
        //   },
        // ];
        // props.onCreate(updatedItems);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const warehouseRender = props.warehouses.map((warehouse) => (
    <option value={warehouse.name}>{warehouse.name}</option>
  ));

  return (
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
      <button onClick={editItem}>EDIT ITEM</button>
    </div>
  );
};
export default EditItem;
