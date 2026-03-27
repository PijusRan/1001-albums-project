import { Rating } from '@mui/material'
import { motion } from "motion/react"
import "./histWindow.css"

import type Album from "../subcomponents/albumInterface"

import placeholderImg from "../assets/placeholder.gif"

export default function HistWindow(props){
    return(
        <motion.section className='histSection' layout transition={{ duration: 3, ease: "easeOut"}} initial={{height: 0}} animate={{height: props.sectionH}}>
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
		</motion.section>
    )
}