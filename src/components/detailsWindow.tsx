import "./detailsWindow.css"
import { Rating } from '@mui/material'
import { motion } from "motion/react"
import type Album from "../subcomponents/albumInterface";

import Button from "../subcomponents/button";
import Window from "../subcomponents/window"

export default function DetailsWindow(props : any){
    function clearHistory(){
        localStorage.setItem("entries", "[]");
        window.location.reload();
    }

    return(
        <Window className='detailsSection'>
            <figure className="detailsHeader">
                <h1>Details</h1>
                <Button 
                    onClick={props.closeDetails}
                    text="X"
                />
            </figure>

            <figure className="detailsFigure">
                {props.entryHistory && props.entryHistory.map((entry : Album, index : number) => {
                    return(
                        <motion.div key={index} className="detailsEntry"
                            transition={{duration: 0.5}}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            exit={{opacity: 0}}>
                            <img src={entry.coverURL}/>
                            <div>
                                <h2>{entry.full}</h2>
                                <h3>{entry.genre}</h3>
                                <Rating value={entry.rating} readOnly/>
                                
                                <h3>Listened: {entry.dateRated}</h3>
                            </div>
                        </motion.div>
                    )
                })}  
            </figure>

            <figure className="controlsFigure">
                <Button
					onClick={clearHistory}
                    text="Clear history"
				/>
            </figure>
        </Window>
    )
}