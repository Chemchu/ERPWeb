import LoginBox from './loginBox.js';
import { motion } from 'framer-motion';
function LoginPage() {
    return(
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <motion.div className="container">
                <LoginBox/>
            </motion.div>
        </nav>        
    );
}

export default LoginPage;