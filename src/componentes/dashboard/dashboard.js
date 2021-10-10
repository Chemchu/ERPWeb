import {motion} from 'framer-motion';
import SideBar from './sidebar/sidebar';
import Header from './header/dashboardHeader';
import Calendar from './calendar';
import Mensajes from './mensajes';
import { Task, TasksList } from './Taks';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNameNames(...classNames) {
  return classNames.filter(Boolean).join(' ')
}

const animVariants= {
  initial: {
      opacity: 0       
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
    exit: {
      y: '-100vh',
      opacity: 0,
      transition:{ 
          ease: [0.87, 0, 0.13, 1], 
          duration: 1
      }
  },
}

export default function Dashboard() {
  return (
    <motion.main className="bg-gray-100 dark:bg-gray-800 rounded-2xl h-screen overflow-hidden relative" variants={animVariants} initial= "initial" animate = "animate">
        <div className="flex items-start justify-between">
            <div className="h-screen hidden lg:block my-4 ml-4 shadow-lg relative w-80">
                <div className="bg-white h-full rounded-2xl dark:bg-gray-700">
                    <div className="flex items-center justify-center pt-6">
                        <svg width="35" height="30" viewBox="0 0 256 366" version="1.1" preserveAspectRatio="xMidYMid">
                            <defs>
                                <linearGradient x1="12.5189534%" y1="85.2128611%" x2="88.2282959%" y2="10.0225497%" id="linearGradient-1">
                                    <stop stop-color="#FF0057" stop-opacity="0.16" offset="0%">
                                    </stop>
                                    <stop stop-color="#FF0057" offset="86.1354%">
                                    </stop>
                                </linearGradient>
                            </defs>
                            <g>
                                <path d="M0,60.8538006 C0,27.245261 27.245304,0 60.8542121,0 L117.027019,0 L255.996549,0 L255.996549,86.5999776 C255.996549,103.404155 242.374096,117.027222 225.569919,117.027222 L145.80812,117.027222 C130.003299,117.277829 117.242615,130.060011 117.027019,145.872817 L117.027019,335.28252 C117.027019,352.087312 103.404567,365.709764 86.5997749,365.709764 L0,365.709764 L0,117.027222 L0,60.8538006 Z" fill="#001B38">
                                </path>
                                <circle fill="url(#linearGradient-1)" transform="translate(147.013244, 147.014675) rotate(90.000000) translate(-147.013244, -147.014675) " cx="147.013244" cy="147.014675" r="78.9933938">
                                </circle>
                                <circle fill="url(#linearGradient-1)" opacity="0.5" transform="translate(147.013244, 147.014675) rotate(90.000000) translate(-147.013244, -147.014675) " cx="147.013244" cy="147.014675" r="78.9933938">
                                </circle>
                            </g>
                        </svg>
                    </div>
                    <nav className="mt-6">
                        <SideBar/>
                    </nav>
                </div>
            </div>
            <div className="flex flex-col w-full pl-0 md:p-4 md:space-y-4">
                <Header/>
                <div className="overflow-auto h-screen pb-24 pt-2 pr-2 pl-2 md:pt-0 md:pr-0 md:pl-0">
                    <div className="flex flex-col flex-wrap sm:flex-row ">

                        <div className="w-full sm:w-1/2 xl:w-1/3">
                            <Task/>
                        </div>

                        <div className="w-full sm:w-1/2 xl:w-1/3">
                            <TasksList/>
                        </div>

                        <div className="w-full sm:w-1/2 xl:w-1/3">
                            <Calendar/>
                            <Mensajes/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </motion.main>
  )
}
