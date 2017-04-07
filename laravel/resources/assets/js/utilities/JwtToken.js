export default {

    getLocalToken: function () {
        let token = localStorage.getItem('rememberMe');
        if(! token) {
            token = sessionStorage.getItem('token');
        }
        return token;
    },

}
