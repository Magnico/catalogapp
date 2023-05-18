import { useEffect, useState } from "react";
function ParamBar({ per_page, order, page }) {
  const [number, setNumber] = useState(10);
  const [sort, setSort] = useState("name");
  
  useEffect(() => {
    setNumber(per_page);
    setSort(order);
  }, [per_page, order]);

  return (
      <div className="paramBar">
        <form>
          <label>Sort By: </label>
          <select name="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="name">Name - ASC</option>
            <option value="-name">Name - DESC</option>
            <option value="date">Brew Date - ASC</option>
            <option value="-date">Brew Date - DESC</option>
          </select>
          <label>Items per Page: </label>
          <input
            type="number"
            name="per_page"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <input type="hidden" name="page" value={page} />
          <button type="submit">Reload</button>
        </form>
      </div>
  );
}

export default ParamBar;
