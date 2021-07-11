import * as React from 'react';
import Login from "../Session/Login";
import Context from "../../Api_Services/Context";
import DashboardContent from './DashboardContent';
export default function Dashboard() {
    const context = React.useContext(Context)
    const [state , setState] = React.useState(context.contentApiPojo)

    const handleContext = (nextState) =>{
        setState((prevState)=>({
            ...prevState,
            ...nextState
        }))
    }

    return(
        <React.Fragment>
            <Context.Provider value={{
                setContentApiPojo: handleContext,
                contentApiPojo: state
            }}>
                {
                    localStorage.getItem('token')?
                        <DashboardContent />
                        :
                        <Login/>

                }
            </Context.Provider>

        </React.Fragment>
    )
}