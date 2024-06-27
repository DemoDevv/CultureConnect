import Item from "./Item";
import { TypographyH3 } from "./ui/typography3";

export default function List({ items, favoriteIds }) {
  return (
    <>
      {items.length > 0 ? <TypographyH3>Oeuvres d'art</TypographyH3> : null}
      <div className="flex flex-col gap-5">
        {items.map((item, index) => (
          <Item
            key={index}
            artwork={item}
            isFavorite={favoriteIds.includes(item._id)}
          />
        ))}
      </div>
    </>
  );
}
