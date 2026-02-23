import "./detailsWindow.css"

export default function DetailsWindow(props){
    return(
        <section className='detailsSection'>
            <figure className="detailsHeader">
                <h1>Details</h1>
                <button onClick={props.closeDetails}>X</button>
            </figure>
            <figure className="detailsFigure">
                {props.entryHistory.map((entry, index) => {
                    return(
                        <div key={index} className="detailsEntry">
                            <img src={entry.albumImage}/>
                            <div>
                                <h2>{entry.albumString}</h2>
                            </div>
                        </div>
                    )
                })}  
            </figure>
        </section>
    )
}