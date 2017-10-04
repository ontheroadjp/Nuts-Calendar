export const eventBus = {

    listeners: {},

    /**
     * eventName String: event name
     * handler function 
     * listener String: component name listend on
     */
    listen: function(eventName, handler, listener) {
        if( eventName == null || handler == null || listener == null ) {
            u.clog('ERROR! - could not regist listener(' + listener + ') for ' + eventName);
            return;
        }

        u.clog('regist listener(' + listener + ') for ' + eventName);

        if( this.listeners[eventName] == null ) {
            this.listeners[eventName] = {}
        }

        this.listeners[eventName][listener] = handler;
    },

    /**
     * eventName String: event name
     * args Object: arguments for event call back
     * from String: component name from
     */
    fire: function(eventName, args, from) {
        u.clog( '>> fire(' + eventName + ') from ' + from);

        if( this.listeners[eventName] == null ) return;

        Object.keys(this.listeners[eventName]).forEach(function(listener) {
            u.clog( '@ listne on ' + listener + ' with ' + args);
            this[listener](args);
        }, this.listeners[eventName]);

    }
};
