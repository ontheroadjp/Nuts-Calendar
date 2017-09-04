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
        setName( state, { id, value }) {
            state.data.userCalendars[id].name = value;
        },

        setDescription( state, { id, value }) {
            state.data.userCalendars[id].description = value;
        }
    },

    modules: {
        insert: insert,
        update: update,
        remove: remove
    }
}
export default userCalendar;

