const EditItem = (props) => {
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
          <button onClick={postItem}>EDIT ITEM</button>
        </div>
      );
  };
  export default EditItem;
  