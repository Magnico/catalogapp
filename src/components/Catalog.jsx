import nophoto from "/no-photo.png"

function Card({info}){
    return (
        <div className="item">
            <img src={info.image_url || nophoto} alt={info.name}/>
            <h3>{info.name}</h3>
            <h4>{info.first_brewed}</h4>
            <p>{info.description}</p>
        </div>
    );
};

function Catalog({beersData}){
    return (
        <div className="container">
            {beersData.length === 0 && <p>There are no entries for this page</p>}
            {beersData.map((beer) => {
                return (
                    <Card key={beer.id} info={beer}/>
                );
            })}
        </div>
    );
}

export default Catalog;