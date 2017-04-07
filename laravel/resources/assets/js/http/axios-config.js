//export function configAxios(axios) {
//
//    axios.defaults.timeout = 2500;
//
//    axios.interceptors.request.use(config => {
//        const token = jwtToken.getLocalToken();
//        //config.headers.Authorization = `Bearer ${ls.get('jwt-token')}`
//        config.headers.Authorization = `Bearer ${token}`
//        return config
//    });
//
//    axios.interceptors.response.use(function (response) {
//        u.clog(window.jwtToken.getLocalToken());
//        u.clog(' --- axios:after: success ---');
//        return response;
//
//    }, function (error) {
//        // Do something with response error
//        u.clog(' --- axios:after: error ---');
//        return Promise.reject(error);
//
//    });
//}
//
