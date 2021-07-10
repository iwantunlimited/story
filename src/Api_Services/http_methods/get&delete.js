import axios from 'axios';
import Setting from "../setting";
import {urls} from "../urls";


let setting =  new Setting();



let methodType = (method) =>{
    //console.log(method)
    switch(method){
        case 'GET':
            return axios.get;
        case 'DELETE':
            return axios.delete;
        default:
            return null
    }
}

let httpRequest = (url , actionCode , payload , method , noToken) =>{
    let promise =  new Promise((resolve, reject) =>{
        let tid = Date.now() + 30000;
        let sid = setting.setSecurity( urls.headers['itpl-client-id'] , Date.now() + 30000);

        let query = `?tid=${tid}&sid=${sid}&actionCode=${actionCode}`;
        url = url + query;
        //console.log(`Invoking => HTTP/${method}, ${actionCode}: url :${url}`)
        let modifiedHeader = {}
        if(noToken){
            modifiedHeader ={
                ...urls.headers ,
            }
        }else{
            modifiedHeader = {
                ...urls.headers ,
                'Authorization':'Bearer ' + localStorage.getItem('token')
            }
        }
        methodType(method)(url , {headers: modifiedHeader}).then(response =>{
            //console.log(`Success => HTTP/${method}, ${actionCode}: url :${url}`)
            resolve(response);
        }).catch(err =>{
            console.error(`Failed => HTTP/${method}, ${actionCode}: url :${url}, error: ${err}`);
            reject(err);
        })
    })
    return promise;
}

let executeGet = (url,actionCode,payload , method , noToken) =>{
    let promise = new Promise((resolve,reject)=>{
        httpRequest(url,actionCode,payload,method , noToken).then(response=>{

            let {statusCode,data} =  response.data;
            //console.log(`${actionCode} : Status Code : ${statusCode}, response:${JSON.stringify(data)}`);
            if(statusCode === 0){
                resolve(data);
            }else{
                reject(response.data);
            }

        })
            .catch(err=>{
                //console.log("ERROR",err)
                reject(err);
            });

    });

    return promise;
};

export default httpRequest;
export {executeGet}