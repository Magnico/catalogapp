import { useEffect, useState } from "react";
import { sortingOptions } from "../utils/BeerInformation.js";

function ParamBar({ per_page, order, page }) {
  const [number, setNumber] = useState(10);
  const [sort, setSort] = useState("name");

  useEffect(() => {
    setNumber(per_page);
    setSort(order);
  }, [per_page, order]);
  console.log(("name", "Name - ASC"));
  
  return (
    <div className="paramBar">
      <form>
        <label>Sort By: </label>
        <select
          name="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          {sortingOptions.map((option) => {
            return (
              <option key={option[0]} value={option[0]}>
                {option[1]}
              </option>
            );
          })}
        </select>
        <label>Items per Page: </label>
        <input
          type="number"
          name="per_page"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <input type="hidden" name="page" value={page} />
        <button type="submit">Apply</button>
      </form>
    </div>
  );
}

export default ParamBar;
