import insert from './insert.js';
import update from './update.js';
import remove from './remove.js';

const userCalendar = {
    namespaced: true,
    state: {
        data: {
            userCalendars: []
        }
    },

    mutations: {
        init( state, userCalendars ) {
            state.data.userCalendars = userCalendars;
        },

        add( state, { id, userCalendar } ) {
            Vue.set(state.data.userCalendars, id, userCalendar);
        },

        remove( state, { id } ) {
            Vue.delete(state.data.userCalendars, id);
        },

        setValue( state, { id, key, value } ) {
            const t = state.data.userCalendars[id];
            t[key] = value;
        }
    },

    modules: {
        insert: insert,
        update: update,
        remove: remove
    }
};
export default userCalendar;
