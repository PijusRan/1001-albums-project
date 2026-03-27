import { Rating } from '@mui/material'
import { motion } from "motion/react"
import "./histWindow.css"

import type Album from "../subcomponents/albumInterface"
import Window from "../subcomponents/window"

export default function HistWindow(props){
    return(
        <Window 
            className='histSection' 
            animate={{height: props.sectionH, opacity: 1 }}
            transition={{ height: { duration: 2, ease: "easeOut" }, opacity: { duration: 1 } }}
            inherit={true}
        >
            <div className='header'>
                <h2>Listening History</h2>
                <motion.button 
					onClick={props.openDetails} className='saveButton'
					whileHover={{backgroundColor:"#1F1F22"}}
					whileTap={{backgroundColor:"#000000"}}
				>Details</motion.button>
            </div>
            

            <figure className='histFigure'>
                {(props.entryHistory) ? (props.entryHistory.slice().reverse()).map((album : Album, id : number) => {return(
                    <motion.figcaption className="entryItem" key={id}
                     transition={{duration: 0.5}}
                     initial={{ opacity: 0 }}
                     whileInView={{ opacity: 1 }}
                     exit={{opacity: 0}}
                     layout
                    >

                        <img src={album.coverURL}/>
                        <p>
                            {album.full}
                            <br/>
                            <Rating value={album.rating} readOnly/>
                        </p>
                    </motion.figcaption>
                )}) : <></>}
            </figure>
		</Window>
    )
}