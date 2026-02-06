import { Rating } from '@mui/material'
import "./histWindow.css"

interface EntryType {
    albumImage: string;
    albumString: string;
    rating: number;
}

export default function histWindow(props : any){
    return(
        <section className='histSection'>
            <h2>Listening History</h2>
            <figure className='histFigure'>
                {(props.entryHistory) ? (props.entryHistory).map((entry : EntryType, id : number) => {return(
                    <figcaption className="entryItem" key={id}>
                        <img src={entry.albumImage}/>
                        <p>
                            {entry.albumString}
                            <br/>
                            <Rating defaultValue={entry.rating} readOnly/>
                        </p>
                    </figcaption>
                )}) : <></>}
            </figure>
		</section>
    )
}