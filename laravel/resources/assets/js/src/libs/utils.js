export const utils = {

    debug: true,

    clog: function(message) {
        if(this.debug) console.log('%s', message);
    }
}
