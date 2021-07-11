import React from 'react';
import {requestBodyFilter} from "./services_payloads/payloads";

const Context = React.createContext({
    contentApiPojo : requestBodyFilter,
    setContentApiPojo : () =>{}
});

export default Context;