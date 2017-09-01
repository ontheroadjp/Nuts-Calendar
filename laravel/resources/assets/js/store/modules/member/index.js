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

    modules: {
        insert: insert,
        update: update,
        remove: remove
    }
}
export default member;
