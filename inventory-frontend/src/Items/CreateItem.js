import { useState } from "react";

const CreateItem = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState(0);

  const nameChangeHandler = (name) => {
    setName(name);
  };
  const brandChangeHandler = (brand) => {
    setBrand(brand);
  };
  const quantityChangeHandler = (quantity) => {
    setQuantity(quantity);
  };

  const postItem = (event) => {
    let url = "http://localhost:8080/inventory/item";
    let method = "POST";
    let body = {
      name: name,
      brand: brand,
      quantity: quantity,
    };
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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

  return (
    <div>
      <input type="text" id="name" onChange={nameChangeHandler}>
        Name
      </input>
      <input type="text" id="brand" onChange={brandChangeHandler}>
        Brand
      </input>
      <input type="number" id="quantity" onChange={quantityChangeHandler}>
        Quantity
      </input>
      <button onClick={postItem}>CREATE ITEM</button>
    </div>
  );
};
export default CreateItem;
