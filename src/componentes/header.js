import { useState } from 'react';
import { motion } from 'framer-motion';

const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  }

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div class="grid grid-flow-col text-black-500 text-4xl">
            <motion.div class='text-left' whileHover={{scale: 1.1}}>
                Header-Left
            </motion.div>
            <motion.div class='text-center' whileHover={{scale: 2, }}>
                Me pica el pitongo
            </motion.div>
            <motion.div class='text-right' whileHover={{scale: 1.1}}>
                Header-Right
            </motion.div>
        </motion.div>        
    );
}

export default Header;