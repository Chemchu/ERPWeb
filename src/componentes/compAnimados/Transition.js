import { motion } from "framer-motion";
import { useState } from "react";

const circle = {
  initialToShrink: {
    height: "100vh", 
    width: "100vw",
  },
  animationShrink: {
    height: "100vh", 
    width: "100vh",
    scale: [1,1,0.8,0],
    borderRadius: ["0%", "100%", "100%", "100%"],
    transition: {
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  }
};

const exitVariants = {
  initial: {
    height: "0vh", 
    width: "0vh",
  },
  animate: {
    height: "100vh",
    width: "100vh",
    scale: [1,2,2.5,2.5],
    borderRadius: ["100%", "100%", "100%", "100%"],
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
            className={`relative z-50 ${props.color}`}
            variants={ circle }
            initial={ circle.initialToShrink }
            animate={ circle.animationShrink }
            onAnimationComplete={() => {setVisible(false)}}
          />      
      </motion.div> : null
    );
};

export function TransitionExit(props) {

  return (
    <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className={`relative z-50 ${props.color}`}
          variants={exitVariants}
          initial={ exitVariants.initial }
          exit={ exitVariants.animate }
        />      
    </motion.div>
  );
};

export default Transition;