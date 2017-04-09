export const utils = {

    debug: true,

    clog: function(message) {
        if(this.debug) console.log(message);
    },

//    success: function(message) {
//        this.clog('success' + this.extra(message));
//    },
//
//    failed: function(message) {
//        this.clog('failed' + this.extra(message));
//    },
//
//    extra: function(message) {
//        let extra;
//        message ? extra = ': ' + message : '';
//        return extra;
//    }
}
