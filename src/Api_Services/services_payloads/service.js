import {urls} from "../urls";
import {executePost} from "../http_methods/put&post";
import {executeGet} from "../http_methods/get&delete";


export const login = (data) =>{
    let url = urls.LOGIN;
    let method = urls.method.POST;
    let actionCode= '';
    return executePost(url, actionCode, data, method , true)
}

export const analytics = (data) =>{
    let url = urls.CDN.ANALYTICS + data;
    let method = urls.method.GET;
    let actionCode ='ACTION_SUMMARY_RESOURCE';
    return executeGet(url, actionCode, {}, method , false)
}

export const contents =(data) =>{
    let url = urls.CDN.FIND_FOLDER ;
    let method = urls.method.POST;
    let actionCode ='';
    return executePost(url, actionCode, data, method , false)
}