// -----------------------------------------------------------------------
// actions

//import axios from 'axios';
import alertMixin from '../mixins/Alert.js';

// -----------------------------------------------------------------------
// CSRF Token

function setCsrfToken() {
    const token = $('meta[name="csrf-token"]').attr('content');

    // for vue-resource
    //Vue.http.headers.common['X-CSRF-TOKEN'] = token;

    // for axios
    //axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
}

// -----------------------------------------------------------------------
// Item

function addItem(members, item) {
    members.push(item);
}

function removeItem(memberEvents, itemIndex) {
    memberEvents.splice(itemIndex, 1);
}

export default {

    // -----------------------------------------------------------------------
    // Ajax: init data
    fetchUserCalendar: (context) => {
        const url = '/api/v1/usercalendar';
        //const token = context.state.user.token;
        const token = sessionStorage.getItem('token');

        if( ! token ) {
            u.clog('no token in sessionStorage@fetchUserCalendar');
            return;
        }

//        axios.get(url)
//            .then(function (response) {
//                context.commit('initUserCalendar', response.data );
//            })
//            .catch(function (error) {
//                u.clog('error@fetchUserCalendar: ' + error.response.data.error);
//            });

        http.get( url, 
            response => {
                u.clog('success@fetchUserCalendar');
                context.commit('initUserCalendar', response.data );
            },
            error => {
                u.clog('error@fetchUserCalendar: ' + error.response.data.error);
            }
        );
    },

    fetchCalendar(context, payload) {

        context.commit('startFetchCalendar', context);

        const id = payload.route.params.userCalendarId;
        const y = context.state.currentYear;
        const m = context.state.currentMonth;

        u.clog(id);

        const url = '/api/v1/calendar/' + id + '/' + y + '/' + m;
//        axios.get(url)
//            .then(function (response) {
//                context.commit('initCalendar', response.data.days );
//                context.commit('initMembers', response.data.members );
//                context.commit('stopFetchCalendar', context);
//                context.commit('setCurrentCalendarId', id);
//            })
//            .catch(function (error) {
//                context.commit('stopFetchCalendar', context);
//                u.clog(error);
//            });
        http.get(url,
            response => {
                context.commit('initCalendar', response.data.days );
                context.commit('initMembers', response.data.members );
                context.commit('stopFetchCalendar', context);
                context.commit('setCurrentCalendarId', id);
            },
            error => {
                u.clog(error);
                context.commit('stopFetchCalendar', context);
            }
        );
    },

    // -----------------------------------------------------------------------
    // Ajax: member
    insertMember: function (context, payload) {
        
        const url = '/api/v1/member';
        setCsrfToken();
        const params = {
            'user_calendar_id': context.state.currentCalendarId,
            'name': payload.name,
            'color': payload.color
        };
        
        http.post(url, params,
            response => {
                const key = context.getters.newColumnKey;
                context.commit('addMember', {'key': key, 'data': response.data});
                context.commit('setMembersModalSelectedTab', key);
                alertMixin.methods.alertSuccess( 'Success: add new member!', false, 'FcMemberTabs.vue' );
            },
            error => {
                alertMixin.methods.alertDanger( 'Failed: add new member!', false, 'FcMemberTabs.vue' );
            } 
        );
//        .then(function (response) {
//            const key = context.getters.newColumnKey;
//            context.commit('addMember', {'key': key, 'data': response.data});
//            context.commit('setMembersModalSelectedTab', key);
//            alertMixin.methods.alertSuccess( 'Success: add new member!', false, 'FcMemberTabs.vue' );
//        })
//        .catch(function (error) {
//            alertMixin.methods.alertDanger( 'Failed: add new member!', false, 'FcMemberTabs.vue' );
//        });
    },

    editUpdateMember: function(context, payload) {
        const selectedTab = context.state.membersModal.selectedTab;
        const url = '/api/v1/member/' + selectedTab;
        setCsrfToken();
        const params = {
            'name': payload.name,
            'color': payload.color
        };

//        axios.patch(url, params)
//        .then(function (response) {
//            context.commit('updateMember', {
//                'id': response.data.id,
//                'name': response.data.name,
//                'color': response.data.color
//            });
//            alertMixin.methods.alertSuccess( 'Success: member updated!', false, 'FcMemberTabs.vue' );
//        })
//        .catch(function (error) {
//            alertMixin.methods.alertDanger( 'Failed: member updated!', false, 'FcMemberTabs.vue' );
//        });

        http.patch(url, params,
            response => {
                context.commit('updateMember', {
                    'id': response.data.id,
                    'name': response.data.name,
                    'color': response.data.color
                });
                alertMixin.methods.alertSuccess( 'Success: member updated!', false, 'FcMemberTabs.vue' );
            },
            error => {
                alertMixin.methods.alertDanger( 'Failed: member updated!', false, 'FcMemberTabs.vue' );
            }
        );
    },

    deleteMember: function(context, payload) {
        const selectedTab = context.state.membersModal.selectedTab;
        const url = '/api/v1/member/' + selectedTab;
        setCsrfToken();

//        axios.delete(url)
//        .then( function (response) {
//            context.commit('deleteMember', selectedTab);
//            //context.commit('deleteEventFromColumn', selectedTab);
//            alertMixin.methods.alertSuccess( 'Success: member deleted!', false, 'FcMemberTabs.vue' );
//        })
//        .catch( function (error) {
//            alertMixin.methods.alertDanger( 'Failed: member deleted!', false, 'FcMemberTabs.vue' );
//        });

        http.delete(url,
            response => {
                context.commit('deleteMember', selectedTab);
                //context.commit('deleteEventFromColumn', selectedTab);
                alertMixin.methods.alertSuccess( 'Success: member deleted!', false, 'FcMemberTabs.vue' );
            },
            error => {
                alertMixin.methods.alertDanger( 'Failed: member deleted!', false, 'FcMemberTabs.vue' );
            }
        );
    },

    // -----------------------------------------------------------------------
    // Ajax: item
    insertItem(context, payload) {
        const date = context.state.currentYear + '-' 
                    + context.state.currentMonth + '-'
                    + ("0" + payload.day).slice(-2);

        const url = '/api/v1/item';
        setCsrfToken();
        const params = {
            'date': date,
            'member_id': payload.memberId,
            'content': payload.content
        };

        http.post(url, params,
            response => {
                const item = response.data;
                addItem(payload.cellItems, item);
                alertMixin.methods.alertSuccess('Success: inserted!', false, 'EventApi.js');
            },
            error => {
                alertMixin.methods.alertDanger('Failed: updated!', false, 'EventApi.js');
            }
        );
    },

    updateItem(context, payload) {

        payload.item.editing = false;
        if(payload.item.content == payload.item.oldValue) {
            payload.item.oldValue = '';
            return;
        }
        payload.item.oldValue = '';

        const url = '/api/v1/item/' + payload.item.id;
        setCsrfToken();
        const params = {
            'member_id': payload.item.memberId,
            'content': payload.item.content,
            'date': payload.item.date
        };

        http.patch(url, params,
            response => {
                alertMixin.methods.alertSuccess('Success: updated!', false, 'EventApi.js');
            },
            error => {
                alertMixin.methods.alertDanger('Failed: updated!', false, 'EventApi.js');
            }
        );
    },

    deleteItem(context, payload) {

        const url = '/api/v1/item/' + payload.item.id;
        setCsrfToken();

        http.delete(url,
            response => {
                removeItem(payload.cellItems, payload.itemIndex);
                alertMixin.methods.alertSuccess('Success: deleted!', false, 'EventApi.js');
            },
            error => {
                alertMixin.methods.alertDanger('Failed: deleted!', false, 'EventApi.js');
            }
        );
    },

    moveItem(context, payload) {
        addItem(payload.memberEvents, payload.item);
        removeItem(payload.draggingItemFrom, payload.itemIndex);

        const y = context.state.currentYear;
        const m = context.state.currentMonth;
        const d = payload.day;

        payload.item.date = y + '-' + m + '-' + d;
        payload.item.memberId = payload.memberId;

        context.dispatch('updateItem', {'item': payload.item});
    }
}
