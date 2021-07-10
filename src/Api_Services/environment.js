//const host = "https://gateway.smedigitalstore.com";
const host = "http://136.232.113.214:9180";
//  const host = "http://192.168.1.90:9180";


export const services = {
    HOST: host,
    AUTH : host + '/services/system-service/oauth/token',
    CDN_SERVICE: host + "/services/media-service/api/",
}