//import Vue from 'vue';

export default {
    namespaced: true,

    state: {
        isLoading: false,
    },

    actions: {
//        remove( { commit, state, rootState }, { index } ) {
        remove( { commit, state }, { index } ) {
            u.clog('remove()');
            commit('start');

//            const members = rootState.member.data.members;
//            const url = '/api/v1/member/' + members[index].id;

            const url = '/api/v1/member/' + index;

            http.fetchDelete(url)
                .then(response => {
                    u.clog('success');

                    commit('member/remove', { id: index }, { root: true });

                    commit('notifySuccess', {
                        content: 'success remove member',
                        isImportant: false
                    }, { root: true } );

                    commit('stop');
                })

                .catch(error => {
                    u.clog('failed');

                    commit('notifyDanger', {
                        content: 'failed remove member',
                        isImportant: false
                    }, { root: true });

                    commit('stop');
                });
        },

//        stop( { commit } ) {
//            commit('stop');
//        }
    },

    mutations: {
        start( state ) {
            state.isLoading = true;
        },

//        remove( state, { members, index } ) {
//            Vue.delete(members, index);
//        },

        stop( state ) {
            state.isLoading = false;
        }
    }
}
