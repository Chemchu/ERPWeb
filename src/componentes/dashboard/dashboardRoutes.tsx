import { Route, Switch } from "react-router";
import LoginPage from "../login/loginPage";
import { POS } from "../pointOfSale/pos";
import { ProductCard } from "../pointOfSale/productCard";
import { DashboardHome } from "./dashBoardHome";

export const DashBoardRoutes = () => {
    return (
        <div>
            <Switch>
                <Route path="/" children={DashboardHome}/>
                <Route path="/postestaaa" children={POS}/>
                <Route path="/pos/" children={ProductCard}/>
            </Switch>
        </div>
    );
}