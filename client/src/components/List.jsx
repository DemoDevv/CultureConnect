import Item from "./Item";

export default function List({ items }) {
  return (
    <div className="flex flex-col gap-5">
      {items.map((item, index) => (
        <Item
          key={index}
          id={item._id}
          name={item.name}
          author={item.author}
          size={item.size}
          type={item.type}
        />
      ))}
    </div>
  );
}
