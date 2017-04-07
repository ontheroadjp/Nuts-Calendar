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
        axios.request({
            url,
            data,
            method: method.toLowerCase()
        }).then(successCb).catch(errorCb)
    },

    get (url, successCb = null, errorCb = null) {
        return this.request('get', url, {}, successCb, errorCb)
    },

    post (url, data, successCb = null, errorCb = null) {
        return this.request('post', url, data, successCb, errorCb)
    },

    put (url, data, successCb = null, errorCb = null) {
        return this.request('put', url, data, successCb, errorCb)
    },

    delete (url, data = {}, successCb = null, errorCb = null) {
        return this.request('delete', url, data, successCb, errorCb)
    },

    /**
     * Init the service.
     */
    init () {
        u.clog('http initialized');
        //axios.defaults.baseURL = '/api/v1'

        const self = this;

        axios.interceptors.request.use( config => {
            const token = jwtToken.getLocalToken();
            if(token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config
        })

        axios.interceptors.response.use( 
            response => {
                const token = response.headers['Authorization'] || response.data['token']
                if (token) {
                    sessionStorage.setItem('token', token);
//                    self.$store.commit('login', response.data);
                }
                return response
            }, error => {
                if (error.response.status === 400 || error.response.status === 401) {
                    u.clog(`error: ${error.response.status}`);
                }
                return Promise.reject(error)
            }
        );

    }
}
