export const utils = {

    debug: true,

    clog: function(message) {
        if(this.debug) console.log('%s', message);
    },

    setDebugMode: function(mode) {
        this.debug = mode; // true or false
    }
}
