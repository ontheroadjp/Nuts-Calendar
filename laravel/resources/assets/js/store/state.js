// -----------------------------------------------------------------------
// state

const now = new Date();

export default {

    lang: 'en',

    userCalendar: [],
    currentCalendarId: '',
    
    calendar: [],
    currentYear: now.getFullYear(),
    currentMonth: ("0" + (now.getMonth() + 1)).slice(-2),

    members: [],
//    events: [],
    membersModal: {
        isActive: false,
        selectedTab: 0,
    },

    user: {
        name: null,
        token: null,
    },

    ajax: {
        loadingCalendarId: '',
    },

}

