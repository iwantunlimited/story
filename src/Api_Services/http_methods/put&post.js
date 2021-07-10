import axios from 'axios';
import Setting from "../setting";
import {urls} from "../urls";


let setting = new Setting();

let body = {
    actionCode : "",
    tid: "",
    sid:"",
    payload:{}
}

let http = (method) =>{
    //console.log(method)
    switch(method){
        case 'POST':
            return axios.post;
        case 'PUT':
            return axios.put;
        default:
            return null
    }
}

let postApiCall =  (url,actionCode,payload,method , noToken) =>{
    // console.log("payload",payload)
    let promise = new Promise((resolve,reject)=>{
        // console.log('payload',payload)
        if(payload instanceof FormData){
            body = payload
            body.append('tid', Date.now() + 30000)
            body.append('sid',setting.setSecurity(urls.headers['itpl-client-id'] ,Date.now() + 30000) )
        }else{
            body={
                tid : Date.now() + 30000,
                sid : setting.setSecurity(urls.headers['itpl-client-id'] ,Date.now() + 30000),
                actionCode: actionCode,
                payload: payload,
            }
        }
        //console.log(`Api Call for ${actionCode}: url :${url}`)
        let modifiedHeader = {}
        if(noToken){
            modifiedHeader ={
                ...urls.headers ,
                'Authorization':'Basic aXRwbDppd2FudHVubGltaXRlZA=='
            }
        }else{
            modifiedHeader = {
                ...urls.headers ,
                'Authorization':'Bearer ' + localStorage.getItem('token')
            }
        }
        http(method)(url,body, {headers: modifiedHeader})
            .then(response=>{
                resolve(response);
            })
            .catch(err=>{
                console.error(`[${actionCode}]Api Call Failed : ${err}`);
                reject(err);
            });
    });
    return promise;

}
let executePost = (url,actionCode,payload , method , noToken) =>{

    let promise = new Promise((resolve,reject)=>{
        postApiCall(url,actionCode,payload , method , noToken)
            .then(response=>{

                //----------------------- this thing is for login oauth url------------------------------------
                let urlArray = url.split('/')
                if(
                    urlArray[urlArray.length -1 ] === 'token' &&
                    urlArray[urlArray.length -2 ] === 'oauth'
                ){
                    let {status, data} = response
                    if(status === 200){
                        resolve(data);
                    }else{
                        reject(data);
                    }
                }else{
                    //-------------------------------------- this is for normal api call -------------------------
                    let {statusCode,data} =  response.data;
                    //console.log(`${actionCode} : Status Code : ${statusCode}`);
                    // console.log(response , response.data)
                    if(statusCode === 0){
                        resolve(data);
                    }else{
                        reject(response.data);
                    }

                }


            })
            .catch(err=>{
                //console.log("ERROR",err)
                reject(err);
            });

    });

    return promise;
};


export default postApiCall;
export {executePost};