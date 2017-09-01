import Vue from 'vue';

export default {
    namespaced: true,

    state: {
//        isActive: false,
        isLoading: false,
//        calendars: '',
//        members: '',
//        deletingMemberId: ''
    },

    actions: {
//        prepare( { commit, rootState }, { deletingMember }  ) {
//            const calendars = rootState.calendar.data.calendars;
//            const members = rootState.calendar.data.members;
//            commit('prepare', { calendars, members, deletingMember } );
//        },

//        prepare( { commit, rootState }, { deletingMemberId }  ) {
//            commit('prepare', { deletingMemberId } );
//        },

        remove( { commit, state, rootState }, { index } ) {
            u.clog('remove()');
            commit('start');

//            const calendars = rootState.calendar.data.calendars;
            const members = rootState.member.data.members;

            const url = '/api/v1/member/' + members[index].id;
            http.fetchDelete(url)
                .then(response => {
                    u.clog('success');

                    commit('remove', { members, index });

                    commit('notifySuccess', {
                        content: 'success remove member',
                        isImportant: false
                    }, { root: true } );

                    commit('reset');
                })

                .catch(error => {
                    u.clog('failed');

                    commit('notifyDanger', {
                        content: 'failed remove member',
                        isImportant: false
                    }, { root: true });

                    commit('reset');
                });
        },

        reset( { commit } ) {
            commit('reset');
        }
    },

    mutations: {
//        prepare( state, { calendars, members, deletingMember } ) {
//            state.calendars = calendars,
//            state.members = members,
//            state.deletingMember = deletingMember
//            state.isActive = true;
//        },

//        prepare( state, { deletingMemberId } ) {
//            state.deletingMemberId = deletingMemberId
//            state.isActive = true;
//        },

        start( state ) {
            state.isLoading = true;
        },

        remove( state, { members, index } ) {
            Vue.delete(members, index);
//            state.calendars.forEach( function(val, index) {
//                Vue.delete( val.items, state.deletingMemberId);
//            });
        },

        reset( state ) {
//            state.isActive = false;
            state.isLoading = false;
//            state.calendars = '';
//            state.members = '';
//            state.deletingMemberId = '';
        }
    }
}
