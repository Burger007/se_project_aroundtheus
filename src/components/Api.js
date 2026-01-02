class Api {
    constructor(options){
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    }

    getInitialCards(){
    return fetch(`${this._baseUrl}/Card`, {
        headers: this._headers
    })
    .then(res => {
        if(res.ok){
           
           console.log(res);
        }
        return Promise.reject(`Error: ${res.status}`);
        });
}

}


export default Api;