const Header = (props) => {
  return (
    <header
      style={{
        fontSize: "20px",
        fontWeight: "bold",
      }}
    >
      {props.headerTitle}
    </header>
  );
};

export default Header;
