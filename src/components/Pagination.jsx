export const Pagination = ({ offset, setOffset, positions }) => {
  function firstPage() {
    setOffset(0);
  }

  function lastPage() {
    const page = positions.length - 50;

    setOffset(page);
  }
  function next() {
    if (Math.floor(offset / 50) <= Math.floor(positions.length / 50))
      setOffset(offset + 50);
  }
  function prev() {
    if (offset !== 0) {
      setOffset(offset - 50);
    }
  }

  return (
    <div>
      <button onClick={firstPage}>{1}</button>
      <button onClick={prev}>Prev</button>
      {Math.floor(offset / 50) + 1}
      <button onClick={next}>Next</button>
      <button onClick={lastPage}>{Math.floor(positions.length / 50)}</button>
    </div>
  );
};
