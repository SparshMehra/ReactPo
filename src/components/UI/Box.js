function Box({ children, ...props }) {
  const {
    className = "bg-gray-100 p-6 rounded-lg shadow-md",
    style = {},
    id = "",
    onChange = () => {},
  } = props;
  return (
    <div className={className} style={style} id={id} onChange={onChange}>
      {children}
    </div>
  );
}
export default Box;
