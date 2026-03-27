import { motion } from "motion/react"
import Beams from '../assets/Beams';
import "./missingImage.css"

export default function MissingImage(props){
    return(
        <motion.div
            className="missingImage"
			animate={props.animate}
			transition={props.transition}
			onLoad={props.onLoad}
        >
            <Beams/>
        </motion.div>   
    )
}