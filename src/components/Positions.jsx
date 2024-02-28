export const Position = ({ data }) => {
  return (
    <div className="position">
      <h2>{data.product}</h2>
      <p>Бренд: {data.brand}</p>
      <p>Цена: {data.price}</p>
      <p>{data.id}</p>
    </div>
  );
};
