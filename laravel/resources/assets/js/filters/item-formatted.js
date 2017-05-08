export default {
    filters: {
        itemFormatted: function(value) {
            const strArr = value.split(' ');
            if(strArr[0] === 'null') {
                return strArr[2];
            }
            
            const time = strArr[0].split(':');
            return '<strong>' + time[0] + ':' + time[1] + '</strong> - ' + strArr[2];
        }
    }
}
