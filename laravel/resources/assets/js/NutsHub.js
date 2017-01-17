export default {

    debug: true,
    listeners: {},

    /**
     * eventName String: event name
     * handler function 
     * listener String: component name listend on
     */
    listen: function(eventName, handler, listener) {

        if( this.listeners[eventName] == null ) {
            this.listeners[eventName] = {}
        }

        this.listeners[eventName][listener] = handler;

        if( this.debug ) {
            console.log('regist listener(' + listener + ') for ' + eventName);
        }
    },

    /**
     * eventName String: event name
     * args Object: arguments for event call back
     * from String: component name from
     */
    fire: function(eventName, args, from) {
        let self = this;

        console.log( '>> fire(' + eventName + ') from ' + from);

        if( this.listeners[eventName] == null ) return;

        Object.keys(this.listeners[eventName]).forEach(function(listener) {

            if(self.debug) {
                console.log( '@ listne on ' + listener);
            }

            this[listener](args);

        }, this.listeners[eventName]);

    }
};