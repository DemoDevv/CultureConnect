import Item from "./Item";

export default function List({ items }) {
  return (
    <div>
      {items.map((item, index) => (
        <Item key={index}>{item}</Item>
      ))}
    </div>
  );
}
