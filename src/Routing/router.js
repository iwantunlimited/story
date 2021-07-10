import Login from "../Components/Session/Login";
import Dashboard from "../Components/Home/Dashboard";

export const routes =[
    {
        path: '',
        component: Dashboard,
    },
    {
        path: '/folder/:id',
        component: Dashboard,
    },
    {
        path: 'login',
        component: Login,
    }
]