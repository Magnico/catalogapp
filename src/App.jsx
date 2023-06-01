import "./App.css";
import { useState, useEffect, useRef, useReducer } from "react";
import ParamBar from "./components/ParamBar.jsx";
import PageExplorer from "./components/PageExplorer.jsx";
import {getBeers} from "./utils/BeerInformation.js";
import { paramsReducer, INITIAL_STATE } from "./reducers/paramsReducers";
import Catalog from "./components/Catalog.jsx";

function App() {
  const [beers, setBeers] = useState([]);
  const [params, setParams] = useReducer(paramsReducer, INITIAL_STATE);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlSearch = {
      sort: urlParams.get("sort"),
      page: urlParams.get("page"),
      per_page: urlParams.get("per_page"),
    };

    let newParams = {
      page: urlSearch.page ? urlSearch.page : 1,
      next: urlSearch.page ? urlSearch.page + 1 : 2,
      per_page: urlSearch.per_page ? urlSearch.per_page : 10,
      sort: urlSearch.sort ? urlSearch.sort : "name",
    };

    setParams({
      type: "SET_PARAMS",
      payload: newParams,
    });

  }, []);

  useEffect(() => {
    fetchBeers();
  }, [params]);

  const fetchBeers = async () => {
    try {
      const response = await getBeers(params.page, params.per_page, params.sort);
      setBeers(response);
    } catch (error) {
      console.log(error);
    }
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
