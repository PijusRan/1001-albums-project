import { forwardRef } from "react";
import { Rating } from '@mui/material'
import "./histWindow.css"


interface EntryType {
    albumImage: string;
    albumString: string;
    rating: number;
}

const HistWindow = forwardRef<HTMLDivElement, any>((props, ref) =>{
    return(
        <section ref={ref} className='histSection'>
            <h2>Listening History</h2>
            <figure className='histFigure'>
                {(props.entryHistory) ? (props.entryHistory.slice().reverse()).map((entry : EntryType, id : number) => {return(
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
});

export default HistWindow;