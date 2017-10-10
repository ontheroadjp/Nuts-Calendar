export default {
    filters: {
        timeFormatter: function(value) {
            if( 
                (typeof value !== 'string') ||
                (value == '')
            ) return value;
            const time = value.split(':');
            return time[0] + ':' + time[1];
        }
    }
}
