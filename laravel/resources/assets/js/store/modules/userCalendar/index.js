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
        setName( state, { id, name }) {
            state.data.userCalendars[id].name = name;
        },

        setDescription( state, { id, description }) {
            state.data.userCalendars[id].description = description;
        }
    },

    modules: {
        insert: insert,
        update: update,
        remove: remove
    }
}
export default userCalendar;

