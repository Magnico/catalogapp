async function getBeers(page, per_page, params) {
        const urlParams = new URLSearchParams({
            ...params,
            page: page,
            per_page: per_page
        });
        try {
            const response = await fetch(`https://api.punkapi.com/v2/beers?${urlParams}`);
            if (!response.ok) {
                throw new Error(response.statusText);
            }else{
                const beers = await response.json();
                return beers;
            }
        } catch (error) {
            console.log("Error fetching beers: ", error);
        }
    }


export default getBeers;