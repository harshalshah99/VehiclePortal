

//test URL :
//export const BASE_API_URL='http://54.245.75.115/services/';
export const BASE_API_URL='http://54.187.115.66/services/';

//live URL
//export const BASE_API_URL='http://mdsvc.gearhostpreview.com/api/';

export const MSG_SUCCESS='Operation completed successfully.';
export const MSG_FAIL='Something went wrong.';
export const IN='emt123';
export const isUserLogin=false;

export function GETMSG_SAVE_SUCCESS(msg: string) {
    return msg + " saved successfully";
} 

export function GETMSG_DELETE_SUCCESS(msg: string) {
    return msg + " deleted successfully";
} 

export function extractData(res: Response) {
    let body = res.json();
    return body;
} 


