export default {
    methods: {
        isToday(date_text) {
            var now = new Date();

            if( parseInt(date_text.substr(0,4)) != now.getFullYear() ) return false;
            if( parseInt(date_text.substr(5,2)) != now.getMonth() + 1) return false;
            if( parseInt(date_text.substr(-2)) != now.getDate() ) return false;

            return true;
        },

        getDayIndex(date_text) {
            var year = parseInt(date_text.substr(0,4));
            var month = parseInt(date_text.substr(5,2)) + 1;
            var date = parseInt(date_text.substr(-2));
            return new Date(year, month, date).getDay();
        },

        getDayString(date_text) {
            var dayList = [
                'Sun','Mon','Tue','Wed','Thu','Fri','Sat'
            ];
            return dayList[this.getDayIndex(date_text)];
        },
    }
}
