import { opaqueType } from "@babel/types";
import { motion } from "framer-motion";
import { useState } from "react";

const circle = {
    initialToShrink: {
      height: "300vh", 
      width: "300vh"
    },
    initialToExpand: {
      height: "0vh", 
      width: "0vh"
    },
    animationExpand: {
      height: "300vh",
      width: "300vh",
      transition: {
        duration: 1.5,
        ease: [0.87, 0, 0.13, 1],
      },
    },
    animationShrink: {
      height: "10vh",
      width: "10vh",
      transition: {
        duration: 1.5,
        ease: [0.87, 0, 0.13, 1],
      },
    }
};

function Transition(props) {
  const [Visible, setVisible] = useState(true);

    return (
      Visible ? 
      <motion.div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className={`relative z-50 w-full ${props.color} rounded-full`}
            initial={props.shouldExpand ? circle.initialToExpand : circle.initialToShrink }
            animate={props.shouldExpand ? circle.animationExpand : circle.animationShrink }
            variants={circle}
            onAnimationComplete={() => {setVisible(false)}}
          />      
      </motion.div> : null
    );
};

export default Transition;