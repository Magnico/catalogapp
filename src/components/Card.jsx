function Card({img, name, description}){
    return (
        <div className="item">
            <img src={img} alt={name}/>
            <h3>{name}</h3>
            <p>{description}</p>
        </div>
    );
};

export default Card;