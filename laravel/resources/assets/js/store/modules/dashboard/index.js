import Vue from 'vue';

export default {
    namespaced: true,
    state: {
        currentId: 0,
        data: {
//            userCalendars: [],
            userCalendarMembers: [],
        }
    },

    mutations: {
        setCurrentId(state, { id }) {
            state.currentId = id
        },

        addUserCalendarMember(state, { obj }) {
            const t = state.data.userCalendarMembers;
            Vue.set(t, t.length, obj); 
        },

        removeUserCalendarMember(state, { obj }) {
            const t = state.data.userCalendarMembers;
            t.forEach( function(val, index) {
                if((val.user_calendar_id === obj.user_calendar_id) 
                    && (val.member_id === obj.member_id)) {
                    Vue.delete(t, index);
                }
            });
        }
    }
}
