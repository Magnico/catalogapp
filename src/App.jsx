import "./App.css";
import { useState, useEffect, useRef, useReducer } from "react";
import ParamBar from "./components/ParamBar.jsx";
import PageExplorer from "./components/PageExplorer.jsx";
import getBeers from "./BeerInformation.js";
import { paramsReducer, INITIAL_STATE } from "./reducers/paramsReducers";
import Catalog from "./components/Card.jsx";

function App() {
  const [beers, setBeers] = useState([]);
  const [params, setParams] = useReducer(paramsReducer, INITIAL_STATE);

  useEffect(() => {
    let urlParams = new URLSearchParams(window.location.search);

    let newParams = {
      page: urlParams.get("page") ? urlParams.get("page") : 1,
      next: urlParams.get("page") ? Number(urlParams.get("page")) + 1 : 2,
      per_page: urlParams.get("per_page") ? urlParams.get("per_page") : 10,
      sort: urlParams.get("sort") ? urlParams.get("sort") : "name",
    };

    setParams({
      type: "SET_PARAMS",
      payload: newParams,
    });

    fetchBeers();
  }, []);

  useEffect(() => {
    fetchBeers();
  }, [params]);

  const fetchBeers = async () => {
    try {
      const response = await getBeers(params.page, params.per_page);
      orderResult(response, params.sort);
    } catch (error) {
      console.log(error);
    }
  };

  const orderResult = (result, order) => {
    if (order.includes("name")) {
      result.sort((a, b) => {
        if (a.name > b.name) return 1;
        else if (a.name < b.name) return -1;
        else return 0;
      });
    } else if (order.includes("date")) {
      result.sort((a, b) => {
        const dateA = new Date(a.first_brewed.split("/").reverse().join("/"));
        const dateB = new Date(b.first_brewed.split("/").reverse().join("/"));
        return dateA - dateB;
      });
    } else {
      console.log("No valid sorting option provided");
      return;
    }
    setBeers(order.includes("-") ? result.reverse() : result);
  };

  return (
    <>
      <h1>Beer List</h1>
      <ParamBar
        per_page={params.per_page}
        page={params.page}
        order={params.sort}
      />
      <PageExplorer
        pageNumber={params.page}
        handlePrev={() => setParams({ type: "PREV_PAGE" })}
        handleNext={() => setParams({ type: "NEXT_PAGE" })}
      />
      <Catalog beersData={beers} />
    </>
  );
}

export default App;
