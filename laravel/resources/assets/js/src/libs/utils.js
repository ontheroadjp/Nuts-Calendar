export const utils = {

    debug: true,

    isDebug: function() {
        return this.debug;
    },

    clog: function(message) {
        if(this.debug) console.log('%s', message);
    },

    setDebugMode: function(mode) {
        this.debug = mode; // true or false
    }
}
