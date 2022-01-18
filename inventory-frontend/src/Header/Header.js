import "./Header.css";

const Header = (props) => {
  return (
    <div className="navbar">
      <div className="container">
        <ul>
          <li onClick={props.viewItems}>VIEW Inventory</li>
          <li onClick={props.createItems}>CREATE Item</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
