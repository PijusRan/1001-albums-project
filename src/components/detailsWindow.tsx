import "./detailsWindow.css"

export default function DetailsWindow(props){
    return(
        <section className='detailsSection'>
            <figure className="header">
                <h2>Details</h2>
                <button onClick={props.closeDetails}>Close</button>
            </figure>
        </section>
    )
}