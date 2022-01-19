const Item = ({item, onEdit, onDelete}) => {
  return (
    <div>
      <div>
        <h1>{item.name}</h1>
        <h2>{item.brand}</h2>
        <h3>{item.quantity}</h3>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Item;
