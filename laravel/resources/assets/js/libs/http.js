/**
 * A fork of https://github.com/phanan/koel.
 * Trigger a function if the user clicks out of the bound element.
 * @type {Object}
 */

import axios from 'axios'

/**
 * Responsible for all HTTP requests.
 */
export const http = {
    request (method, url, data, successCb = null, errorCb = null) {
        u.clog('http.request');

        axios.request({
            url,
            data,
            method: method.toLowerCase()
        }).then(successCb).catch(errorCb)
    },

    get (url, successCb = null, errorCb = null) {
        return this.request('GET', url, {}, successCb, errorCb)
    },

    post (url, data, successCb = null, errorCb = null) {
        return this.request('POST', url, data, successCb, errorCb)
    },

    put (url, data, successCb = null, errorCb = null) {
        data._method = "PUT";
        return this.request('POST', url, data, successCb, errorCb)
    },

    delete (url, data = {}, successCb = null, errorCb = null) {
        data._method = "DELETE";
        return this.request('POST', url, data, successCb, errorCb)
    },

    fetchRequest(method, uri, data) {
        return new Promise( (resolve,reject) => {
            http.request( method, uri, data, 
                response => {
                    u.clog('http.fetchRequest(' + uri + ').then() status: ' + response.status);
                    switch(response.status) {
                        case 200:
                            resolve(response);
                            break;

                        case 202:
                            u.clog('token has been refreshed and try to fetch the data again');
                            http.fetchRequest(method, uri, data)
                                .then( r => resolve(r) )
                                .catch( e => reject(e) );
                            break;

                        default:
                            u.clog('ERROR fetchRequest(): ' + response.status);
                            throw Error(response)
                    }
                },
                error => {
                    u.clog('http.fetchRequest(' + uri + ').catch()');
                    reject(error);
                }
            );
        });
    },

    fetchGet(uri) {
        return this.fetchRequest('get', uri, {});
    },

    fetchPost(uri, data) {
        return this.fetchRequest('POST', uri, data);
    },

    fetchPut(uri, data) {
        data._method = 'PUT';
        return this.fetchRequest('POST', uri, data)
    },

    fetchDelete (uri, data = {}) {
        data._method = 'DELETE';
        return this.fetchRequest('POST', uri, data)
    },

    /**
     * Init the service.
     */
    init () {
        u.clog('http initialized');
        axios.defaults.timeout = 2500;
        //axios.defaults.baseURL = '/api/v1'

        axios.interceptors.request.use( config => {
            u.clog('axios.before - request');
            const token = jwtToken.getLocalToken();
            if(token) {
                config.headers.Authorization = 'Bearer ' + token;
            }
            return config
        })

        axios.interceptors.response.use( 
            response => {
                u.clog('axios.before - response');

                const jwtToken = response.headers['authorization'] || response.data['token']
                if (jwtToken) {
                    sessionStorage.setItem('token', jwtToken);
                }

                const csrfToken = response.headers['csrf-token'];
                if(csrfToken) {
                    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
                }

                return Promise.resolve(response)
            }, error => {
                if (error.response) {
                    // The request was made, but the server responded with a status code
                    // that falls out of the range of 2xx
//                    u.clog(error.response.data);
//                    u.clog(error.response.status);
//                    u.clog(error.response.headers);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    u.clog('Error' + error.message);
                }

                return Promise.reject(error)
            }
        );
    },
}
