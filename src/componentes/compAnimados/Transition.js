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
    height: "260vh",
    width: "260vh",
    transition: {
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
  animationShrink: {
    height: "0vh",
    width: "0vh",
    transition: {
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  }
};

const exitVariants = {
  initial: {
    height: "0", 
    width: "0",
  },
  animate: {
    height: "250vh",
    width: "250vh",
    transition: {
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  }
}


function Transition(props) {
  const [Visible, setVisible] = useState(true);
    return (
      Visible ? 
      <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            className={`relative z-50 w-full ${props.color} rounded-full`}
            variants={circle}
            initial={props.shouldExpand ? circle.initialToExpand : circle.initialToShrink }
            animate={props.shouldExpand ? circle.animationExpand : circle.animationShrink }
            onAnimationComplete={() => {setVisible(false)}}
          />      
      </motion.div> : null
    );
};

export function TransitionExit(props) {

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className={`relative z-50 w-full ${props.color} rounded-full`}
          variants={exitVariants}
          initial={ exitVariants.initial }
          exit={ exitVariants.animate }
        />      
    </motion.div>
  );
};

export default Transition;