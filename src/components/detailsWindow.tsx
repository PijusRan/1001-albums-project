import "./detailsWindow.css"
import { Rating } from '@mui/material'
import { motion } from "motion/react"
import xSVG from "../assets/x.svg"

export default function DetailsWindow(props){
    function clearHistory(){
        localStorage.setItem("entries", "[]");
        window.location.reload();
    }

    return(
        <section className='detailsSection'>
            <figure className="detailsHeader">
                <h1>Details</h1>
                <button onClick={props.closeDetails}>
                    <img src={xSVG}/>
                </button>
            </figure>

            <figure className="detailsFigure">
                {props.entryHistory && props.entryHistory.map((entry, index) => {
                    return(
                        <motion.div key={index} className="detailsEntry"
                            transition={{duration: 0.5}}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            exit={{opacity: 0}}>
                            <img src={entry.albumImage}/>
                            <div>
                                <h2>{entry.albumString}</h2>
                                <Rating value={entry.rating} readOnly/>
                                <h3>Listened: {entry.date}</h3>
                            </div>
                        </motion.div>
                    )
                })}  
            </figure>

            <figure className="controlsFigure">
                <motion.button 
					onClick={clearHistory} className='saveButton'
					whileHover={{backgroundColor:"#1F1F22"}}
					whileTap={{backgroundColor:"#000000"}}
				>
                    Clear history
                </motion.button>
            </figure>
        </section>
    )
}