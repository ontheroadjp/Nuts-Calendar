export default {
    methods: {
        isToday(dateText) {
            const now = new Date();

            if( parseInt(dateText.substr(0,4)) != now.getFullYear() ) return false;
            if( parseInt(dateText.substr(5,2)) != now.getMonth() + 1) return false;
            if( parseInt(dateText.substr(-2)) != now.getDate() ) return false;

            return true;
        },

        getDateObject(dateText) {
            const year = parseInt(dateText.substr(0,4));
            const month = parseInt(dateText.substr(5,2));
            const date = parseInt(dateText.substr(-2));
            return new Date(year + '/' + month + '/' + date);
        },

        getDayIndex(dateText) {
//            const year = parseInt(dateText.substr(0,4));
//            const month = parseInt(dateText.substr(5,2));
//            const date = parseInt(dateText.substr(-2));
//            return new Date(year + '/' + month + '/' + date).getDay();
            return this.getDateObject(dateText).getDay();
        },

        getDayString(dateText) {
            const dayList = [
                'Sun','Mon','Tue','Wed','Thu','Fri','Sat'
            ];
            return dayList[this.getDayIndex(dateText)];
        },
    }
}
