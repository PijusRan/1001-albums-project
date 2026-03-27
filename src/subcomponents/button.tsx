import { motion } from "motion/react"
import "./button.css"

export default function Button(props : any){
    return(
        <motion.button 
            onClick={props.onClick}
            whileHover={{backgroundColor:"#2F2F32"}}
            whileTap={{backgroundColor:"#000000"}}
            layout
            transition={{
                type: "spring",
                stiffness: 300,   
                damping: 40,      
                mass: 1,          
                restDelta: 0.001
            }}
        >
            {props.text}
        </motion.button>
    )
    
}