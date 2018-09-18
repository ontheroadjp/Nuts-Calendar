import {
    NOTIFY_PRIMARY,
    NOTIFY_SUCCESS,
    NOTIFY_INFO,
    NOTIFY_WARNING,
    NOTIFY_DANGER,
    SET_NOTIFICATION,
    RESET_NOTIFICATION
} from '../../mutation-types.js'

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
            commit(NOTIFY_PRIMARY, { content, isImportant } );
        },

        notifySuccess( { commit }, { content, isImportant } ) {
            commit(NOTIFY_SUCCESS, { content, isImportant } );
        },

        notifyInfo( { commit }, { content, isImportant } ) {
            commit(NOTIFY_INFO, { content, isImportant } );
        },

        notifyWarning( { commit }, { content, isImportant } ) {
            commit(NOTIFY_WARNING, { content, isImportant } );
        },

        notifyDanger( { commit }, { content, isImportant } ) {
            commit(NOTIFY_DANGER, { content, isImportant } );
        },

        setNotification( { commit } ) {
            commit(SET_NOTIFICATION);
        },

        resetNotification( { commit } ) {
            commit(RESET_NOTIFICATION);
        }
    },

    mutations: {
        [NOTIFY_PRIMARY]( state, { content, isImportant } ) {
            if(!content || typeof(isImportant) !== 'boolean' ) return;
            state.content = content;
            state.type = 'is-primary';
            state.isImportant = isImportant;
            state.isActive = true;
        },

        [NOTIFY_SUCCESS]( state, { content, isImportant } ) {
            if(!content || typeof(isImportant) !== 'boolean' ) return;
            state.content = content;
            state.type = 'is-success';
            state.isImportant = isImportant;
            state.isActive = true;
        },

        [NOTIFY_INFO]( state, { content, isImportant } ) {
            if(!content || typeof(isImportant) !== 'boolean' ) return;
            state.content = content;
            state.type = 'is-info';
            state.isImportant = isImportant;
            state.isActive = true;
        },

        [NOTIFY_WARNING]( state, { content, isImportant } ) {
            if(!content || typeof(isImportant) !== 'boolean' ) return;
            state.content = content;
            state.type = 'is-warning';
            state.isImportant = isImportant;
            state.isActive = true;
        },

        [NOTIFY_DANGER]( state, { content, isImportant } ) {
            if(!content || typeof(isImportant) !== 'boolean' ) return;
            state.content = content;
            state.type = 'is-danger';
            state.isImportant = isImportant;
            state.isActive = true;
        },

        [SET_NOTIFICATION]( state, { content, type, isImportant, isActive } ) {
            if(!content || !type || typeof(isImportant) !== 'boolean' || typeof(isActive) !== 'boolean' ) true;
            state.app.message.notification.content = content;
            state.app.message.notification.type = type;
            state.app.message.notification.isImportant = isImportant;
            state.app.message.notification.isActive = isActive;
        },

        [RESET_NOTIFICATION]( state ) {
            state.content = '';
            state.type = '';
            state.isImportant = false;
            state.isActive = false;
        }
    }
};
