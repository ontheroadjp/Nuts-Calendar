export const jwtToken = {
    getLocalToken: function () {
        let token = this.rememberMe();
        if(! token) {
            token = sessionStorage.getItem('token');
        }
        return token;
    },

    setLocalToken: function(token) {
        if(! token) return;

        sessionStorage.setItem('token', token);
        if(this.rememberMe()) localStorage.setItem('rememberMe', token);
    },

    rememberMe: function() {
        return localStorage.getItem('rememberMe');
    },
}
