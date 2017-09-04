import insert from './insert.js';
import update from './update.js';
import remove from './remove.js';

const member = {
    namespaced: true,
    state: {
        data: {
            members: []
        }
    },

    getters: {
        isModalActive: (state) => {
            return state.update.isActive && state.remove.isActive
        }
    },

    mutations: {
        setName( state, { id, name } ) {
            state.data.members[id].name = name;
        }
    },

    modules: {
        insert: insert,
        update: update,
        remove: remove
    }
}
export default member;
