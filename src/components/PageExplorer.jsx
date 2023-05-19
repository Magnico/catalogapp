function PageExplorer({pageNumber,handlePrev,handleNext}){
    
    return(
        <div className="page-explorer">
            <button onClick={handlePrev}>Previous</button>
            <p>{pageNumber}</p>
            <button onClick={handleNext}>Next</button>
        </div>
    );
}

export default PageExplorer;