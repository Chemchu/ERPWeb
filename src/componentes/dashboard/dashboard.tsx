import {AnimatePresence, motion} from 'framer-motion';
import SideBar from './sidebar/sidebar';
import { ReactElement, useState } from 'react';
import { DashBoardRoutes } from './dashboardRoutes';
import { Route, Switch, Router, Link, useHistory } from "react-router-dom";
import LoginPage from "../login/loginPage";
import { POS } from "../pointOfSale/pos";
import { ProductCard } from "../pointOfSale/productCard";
import { DashboardHome } from "./dashBoardHome";

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

const routes = [
  {
    path: "/dashboard",
    exact: true,
    main: () => <POS></POS>
  },
  {
    path: "/dashboard/pos",
    exact: true,
    main: () => <h2>Bubblegum</h2>
  },
  {
    path: "/test",
    main: () => <h2>Shoelaces</h2>
  }
];

const animations= {
  open: { opacity:1, scale: 1 },
  close: {opacity:0, scale: 0 },
  opening:{
    scale: 1,
    transition: {
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
  closing: { 
    transition: {
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
 },
  exit: {
    opacity: 0,
    transition:{ 
        ease: [0.87, 0, 0.13, 1], 
        duration: 1
    }
  },
}

export default function Dashboard() {
  const history = useHistory();

    return (
        <motion.main className="bg-gray-100 dark:bg-gray-800 h-screen w-screen overflow-hidden relative" variants={animVariants} initial= "initial" animate = "animate">
            <div className="flex items-start justify-start gap-4">
              <motion.div className="border-2 rounded-xl">
                <SideBar />
              </motion.div>
              
              <div className="w-screen h-screen">
                {/* <Switch>
                  <Route path="/" children={DashboardHome}/>
                  <Route path="/dashboard/pos" children={POS}/>
                </Switch> */}
                  <Switch>
                    {routes.map((route, index) => (
                      <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        children={<route.main />}
                      />
                    ))}
                  </Switch>
              </div>
            </div>
        </motion.main>
  )
}
