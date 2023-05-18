function Card({info}){
    return (
        <div className="item">
            <img src={info.image_url} alt={info.name}/>
            <h3>{info.name}</h3>
            <h4>{info.first_brewed}</h4>
            <p>{info.description}</p>
        </div>
    );
};

function Catalog({beersData}){
    return (
        <div className="container">
            {beersData.map((beer) => {
                return (
                    <Card key={beer.id} info={beer}/>
                );
            })}
        </div>
    );
}

export default Catalog;