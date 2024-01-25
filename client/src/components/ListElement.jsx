export default function ListElement(props) {
  return (
    <div>
      <span>{props.field}</span>
      <div
        style={{
          color: "#9F5AED",
          minWidth: "90%",
          maxWidth: "95%",
        }}
      >
        {props.value}
      </div>
    </div>
  );
}
