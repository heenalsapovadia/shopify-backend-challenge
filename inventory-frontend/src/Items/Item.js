const Item = ({item, editItemHandler, deleteItemHandler}) => {
  return (
    <div>
      <div>
        <h1>{item.name}</h1>
        <h2>{item.brand}</h2>
        <h3>{item.quantity}</h3>
        <button onClick={editItemHandler}>Edit</button>
        <button onClick={deleteItemHandler}>Delete</button>
      </div>
    </div>
  );
};

export default Item;
