import {services} from "./environment";
let token =  'Basic aXRwbDppd2FudHVubGltaXRlZA=='

export const urls = {
    method:{
      PUT:"PUT",
      POST:'POST',
      DELETE:'DELETE',
      GET:'GET'
    },
    headers : {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token') :token ,
        "itpl-app-name": "Merchant-Registration-App",
        "itpl-app-version": "1.0-101",
        "itpl-app-type": "web",
        'itpl-client-id':"SS7052021-001",
        'itpl-app-os': 'web',
    },
    LOGIN: services.AUTH,
    CDN:{
        FIND_FOLDER  : services.CDN_SERVICE + "resources/find",
        FOLDER_CREATE: services.CDN_SERVICE + "resources/directory",
        UPLOAD_IMAGE : services.CDN_SERVICE + "resources/bulk",
        FOLDER_DELETE: services.CDN_SERVICE + "resources/",
        ANALYTICS:services.CDN_SERVICE + "resources/analytics/",
        DELETE:services.CDN_SERVICE +"resources/"
    },
}