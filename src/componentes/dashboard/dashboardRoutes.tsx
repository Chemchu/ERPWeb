import { Route, Switch } from "react-router";
import { POS } from "../pointOfSale/pos";
import { DashboardHome } from "./dashBoardHome";

export const DashBoardRoutes = () => {
    return (
        <div>
            <Switch>
                <Route path="/" component={DashboardHome}/>
                <Route path="/pos" component={POS}/>
            </Switch>
        </div>
    );
}