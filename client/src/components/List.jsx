import Item from "./Item";

export default function List({ items, favoriteIds }) {
  return (
    <div className="flex flex-col gap-5">
      {items.map((item, index) => (
        <Item
          key={index}
          artwork={item}
          isFavorite={favoriteIds.includes(item._id)}
        />
      ))}
    </div>
  );
}
