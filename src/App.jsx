import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

import { Position } from "./components/Positions";
import { getPositions } from "./components/functions/fetchAll";
import { Pagination } from "./components/Pagination";

import { Filters } from "./components/Filters";

function App() {
  const [positions, setPositions] = useState(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    getPositions(setPositions);
  }, []);
  return (
    <>
      <Filters setPositions={setPositions} />
      <div className="App">
        {positions &&
          positions.slice(offset, offset + 50).map((item, j) => {
            return <Position key={j} data={item} />;
          })}
      </div>
      {positions && (
        <Pagination
          offset={offset}
          setOffset={setOffset}
          positions={positions}
        />
      )}
    </>
  );
}

export default App;
