import { motion, type HTMLMotionProps } from "motion/react"
import "./button.css"

interface ButtonProps extends HTMLMotionProps<"button"> {
  text?: string | null;
  className?: string;
  children?: React.ReactNode;
}

export default function Button({ children, className, ...props } : ButtonProps){
    return(
        <motion.button 
            onClick={props.onClick}
            whileHover={{backgroundColor:"#2F2F32"}}
            whileTap={{backgroundColor:"#000000"}}
            layout
            className={`${className}`}
            transition={{
                type: "spring",
                stiffness: 300,   
                damping: 40,      
                mass: 1,          
                restDelta: 0.001
            }}
        >
            {props.text}
            {children}
        </motion.button>
    )
    
}