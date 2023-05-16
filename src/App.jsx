import "./App.css";
import { useState, useEffect } from "react";
import Card from "./components/Card.jsx";
import getBeers from "./BeerInformation.js";

function App() {
  const [beers, setBeers] = useState([]);
  const [moreData,setMoreData] = useState(true);
  useEffect(() => {
    fetchBeers();
  }, []);

  const fetchBeers = async () => {
    try {
      const response = await getBeers(1, 10);
      setMoreData(response.length > 0);
      setBeers(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  let beerList = [];
  return (
    <>
      <h1>Beer List</h1>
      <div className="container">
        {beers.map((beer) => {
          return (
            <Card
              key={beer.id}
              name={beer.name}
              img={beer.image_url}
              description={beer.description}
            />
          );
        })}
      </div>
      <button></button>
    </>
  );
}

export default App;
