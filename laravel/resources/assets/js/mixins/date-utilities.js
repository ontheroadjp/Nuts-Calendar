import moment from 'moment';
require('moment/locale/ja');

export default {
    computed: {
        lang: function() {
            return this.$store.state.app.lang;
        }
    },

    methods: {
        isToday(dateText) {
            return moment(dateText).isSame( moment(new Date()) );
//            const now = new Date();
//
//            if( parseInt(dateText.substr(0,4)) != now.getFullYear() ) return false;
//            if( parseInt(dateText.substr(5,2)) != now.getMonth() + 1) return false;
//            if( parseInt(dateText.substr(-2)) != now.getDate() ) return false;
//
//            return true;
        },

//        getDateObject(d) {
//            const year = moment(d).year();
//            const month = moment(d).month();
//            const date = moment(d).date();
//            return new Date(year + '/' + month + '/' + date);
//        },

        getDateString(dateObj) {
            if( dateObj instanceof Date ) {
                const y = dateObj.getFullYear();
                const m = dateObj.getMonth() + 1;
                const d = dateObj.getDate();
                return y + '-' + m + '-' + d;
            }

            return false;
        },

        now() {
            return this.getDateString(new Date());
        },

        getDayIndex(d) {
            return moment(d).day();
        },

        isSunday(d) {
            return moment(d).day() === 0;
        },

        isSaturday(d) {
            return moment(d).day() === 6;
        },

        getYearAndMonth(d) {
            moment.locale(this.lang);
            const year = moment(d).year();
            const month = moment(d).format('MMM');
            if(moment.locale() === 'ja') return year + '年 ' + month;

            return moment.months(moment(d).format('M') -1) + ' ' + year;
        },

        getDateAndDay(d) {
            moment.locale(this.lang);
            const date = moment(d).format('ddd');
            const day = moment(d).format('Do');

            if(moment.locale() === 'ja') return day + '(' + date + ')';
            return date + ' ' + day;
        },

        getYear(d) {
            moment.locale(this.lang);
            return moment(d).year();
        },

        getMonth(d) {
            moment.locale(this.lang);
            return moment(d).format('MMM');
        },

        getDay(d) {
            moment.locale(this.lang);
            return moment(d).format('D');
        },
        getDate(d) {
            moment.locale(this.lang);
            return moment(d).format('dddd');
        }
    },

    mounted() {
        const locale = ['en', 'ja'];
        locale.forEach( (val, index) => {
//            const l = moment.locale(val);
//            const p = 'moment().startOf(\'week\')';

//            u.clog('['+val+'] ----------------------------------');
//
//            u.clog('moment(): ' + moment() );
//            u.clog('moment.months(): ' + moment.months());
//            u.clog('moment.months(3): ' + moment.months(3) );
//            u.clog(p+'.format(\'YYYY-MM-DD\'): ' + moment().startOf('week').format('YYYY-MM-DD') );
//            u.clog(p+'.isToday: '  + moment().startOf('week').isSame(moment(new Date())) );
//
//            u.clog('moment().format(\'LT\')'   + moment().format('LT') );
//            u.clog('moment().format(\'LTS\')'  + moment().format('LTS') );
//            u.clog('moment().format(\'L\')'    + moment().format('L') );
//            u.clog('moment().format(\'l\')'    + moment().format('l') );
//            u.clog('moment().format(\'LL\')'   + moment().format('LL') );
//            u.clog('moment().format(\'ll\')'   + moment().format('ll') );
//            u.clog('moment().format(\'LLL\')'  + moment().format('LLL') );
//            u.clog('moment().format(\'lll\')'  + moment().format('lll') );
//            u.clog('moment().format(\'LLLL\')' + moment().format('LLLL') );
//            u.clog('moment().format(\'llll\')' + moment().format('llll') );
//
//            u.clog(p+'.year(): '   + moment().startOf('week').year() );
//            u.clog(p+'.month(): '  + moment().startOf('week').month() );
//            u.clog(p+'.date(): '   + moment().startOf('week').date() );
//            u.clog(p+'.day(): '    + moment().startOf('week').day() );
//
//            u.clog(p+'.format(\'Y\'): '     + moment().startOf('week').format('Y') );
//            u.clog(p+'.format(\'YY\'): '     + moment().startOf('week').format('YY') );
//
//            u.clog(p+'.format(\'M\'): '     + moment().startOf('week').format('M') );
//            u.clog(p+'.format(\'MM\'): '     + moment().startOf('week').format('MM') );
//            u.clog(p+'.format(\'MMM\'): '     + moment().startOf('week').format('MMM') );
//
//            u.clog(p+'.format(\'D\'): '     + moment().startOf('week').format('D') );
//            u.clog(p+'.format(\'DD\'): '     + moment().startOf('week').format('DD') );
//            u.clog(p+'.format(\'Do\'): '    + moment().startOf('week').format('Do') );
//
//            u.clog(p+'.format(\'d\'): '     + moment().startOf('week').format('d') );
//            u.clog(p+'.format(\'dd\'): '    + moment().startOf('week').format('dd') );
//            u.clog(p+'.format(\'ddd\'): '   + moment().startOf('week').format('ddd') );
//            u.clog(p+'.format(\'dddd\'): '  + moment().startOf('week').format('dddd') );
        });
        moment.locale(this.lang);
    }
}
