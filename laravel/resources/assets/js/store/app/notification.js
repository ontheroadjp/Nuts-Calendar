export default {
    namespaced: true,

    state: {
        isActive: false,
        isImportant: false,
        type: 'is-info',
        content: ''
    },

    actions: {
        notifyPrimary( { commit }, { content, isImportant } ) {
            commit('notifyPrimary', { content, isImportant } );
        },
    
        notifySuccess( { commit }, { content, isImportant } ) {
            commit('notifySuccess', { content, isImportant } );
        },
    
        notifyInfo( { commit }, { content, isImportant } ) {
            commit('notifyInfo', { content, isImportant } );
        },
    
        notifyWarning( { commit }, { content, isImportant } ) {
            commit('notifyWarning', { content, isImportant } );
        },
    
        notifyDanger( { commit }, { content, isImportant } ) {
            commit('notifyDanger', { content, isImportant } );
        },
    
        resetNotification( { commit } ) {
            commit('resetNotification');
        }
    },

    mutations: {
        notifyPrimary( state, { content, isImportant } ) {
            if(!content || typeof(isImportant) !== 'boolean' ) return;
            state.content = content;
            state.type = 'is-primary';
            state.isImportant = isImportant;
            state.isActive = true;
        },
    
        notifySuccess( state, { content, isImportant } ) {
            if(!content || typeof(isImportant) !== 'boolean' ) return;
            state.content = content;
            state.type = 'is-success';
            state.isImportant = isImportant;
            state.isActive = true;
        },
    
        notifyInfo( state, { content, isImportant } ) {
            if(!content || typeof(isImportant) !== 'boolean' ) return;
            state.content = content;
            state.type = 'is-info';
            state.isImportant = isImportant;
            state.isActive = true;
        },
    
        notifyWarning( state, { content, isImportant } ) {
            if(!content || typeof(isImportant) !== 'boolean' ) return;
            state.content = content;
            state.type = 'is-warning';
            state.isImportant = isImportant;
            state.isActive = true;
        },
    
        notifyDanger( state, { content, isImportant } ) {
            if(!content || typeof(isImportant) !== 'boolean' ) return;
            state.content = content;
            state.type = 'is-danger';
            state.isImportant = isImportant;
            state.isActive = true;
        },
    
        resetNotification( state ) {
            state.content = '';
            state.type = '';
            state.isImportant = false;
            state.isActive = false;
        }
    }
}
