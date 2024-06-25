export default function Item({ name, author, size, type }) {
  return (
    <div className="w-[70vw] bg-white rounded-[18px]">
      <h1>{name}</h1>
      <p>{author}</p>
      <p>{size}</p>
      <p>{type}</p>
    </div>
  );
}
