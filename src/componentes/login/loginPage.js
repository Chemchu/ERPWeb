import LoginBox from './loginBox';
import { useState } from 'react';
import { motion } from 'framer-motion';

function LoginPage() {
    return(
        <motion.div>
            <LoginBox/>
        </motion.div>
    );
}

export default LoginPage;