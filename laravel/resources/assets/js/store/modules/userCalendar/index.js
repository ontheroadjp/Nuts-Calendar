import Vue from 'vue';
import insert from './insert.js';
import update from './update.js';
import remove from './remove.js';

const userCalendar = {
    namespaced: true,
    state: {
        data: {
            userCalendars: [],
//            userCalendarMembers: []
        }
    },

    mutations: {
        init( state, userCalendars ) {
            state.data.userCalendars = userCalendars;
        },

        setValue( state, { id, key, value } ) {
            const t = state.data.userCalendars[id];
            t[key] = value
        }

//        setName( state, { id, name }) {
//            state.data.userCalendars[id].name = name;
//        },
//
//        setDescription( state, { id, description }) {
//            state.data.userCalendars[id].description = description;
//        }
    },

    modules: {
        insert: insert,
        update: update,
        remove: remove
    }
}
export default userCalendar;

