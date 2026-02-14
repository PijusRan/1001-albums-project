import { Rating } from '@mui/material'
import { motion } from "motion/react"
import "./histWindow.css"

interface EntryType {
    albumImage: string;
    albumString: string;
    rating: number;
}


export default function HistWindow(props){
    

    return(
        <motion.section className='histSection' layout transition={{ duration: 3, ease: "easeOut"}} initial={{height: 0}} animate={{height: props.sectionH}}>
            <div className='header'>
                <h2>Listening History</h2>
                <button onClick={props.openDetails}>Show more</button>
            </div>
            

            <figure className='histFigure'>
                {(props.entryHistory) ? (props.entryHistory.slice().reverse()).map((entry : EntryType, id : number) => {return(
                    <motion.figcaption className="entryItem" key={id}
                     transition={{duration: 0.5}}
                     initial={{ opacity: 0 }}
                     whileInView={{ opacity: 1 }}
                     exit={{opacity: 0}}
                     layout
                    >

                        <img src={entry.albumImage}/>
                        <p>
                            {entry.albumString}
                            <br/>
                            <Rating value={entry.rating} readOnly/>
                        </p>
                    </motion.figcaption>
                )}) : <></>}
            </figure>

            
		</motion.section>
    )
}