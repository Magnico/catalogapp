import { orderResult } from "./Sorter.js";

const sortingOptions = [
    ["name", "Name - ASC"],
    ["-name", "Name - DESC"],
    ["date", "Brew Date - ASC"],
    ["-date", "Brew Date - DESC"]
];

async function getBeers(page, per_page, sort) {
    const url = new URL("https://api.punkapi.com/v2/beers");
    url.searchParams.set("page", page);
    url.searchParams.set("per_page", per_page);
    try {
        const response = await fetch(url);
        if (response.ok) {
            const beers = response.json().then(data => orderResult(data,sort));
            return beers;
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        console.log("Error fetching beers: ", error);
    }
}


export { sortingOptions, getBeers }