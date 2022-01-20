import { useState } from "react";

const Warehouse = (props) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const createWarehouseHandler = () => {
    console.log("inside createWarehouseHandler : ");
    props.newWarehouse({
      name: name,
      address: address,
    });
    props.onCreate();
  };

  const createNewWarehouseHandler = () => {
    let url = "http://localhost:8080/warehouse/create";
    let method = "POST";
    console.log("name:", name);
    console.log("address : ", address);

    fetch(url, {
      method: method,
      body: JSON.stringify({
        name: name,
        address: address,
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        <label>Address</label>
        <input
          type="text"
          id="address"
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
      </div>

      <button onClick={createNewWarehouseHandler}>CREATE Warehouse</button>
    </div>
  );
};
export default Warehouse;
