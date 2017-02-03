import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import alertMixin from '../mixins/Alert.js';
import mutations from './mutations.js';

//Vue.config.debug = false;
//Vue.config.silent = true;

// -----------------------------------------------------------------------
// CSRF Token

function setCsrfToken() {
    const token = $('meta[name="csrf-token"]').attr('content');

    // for vue-resource
    //Vue.http.headers.common['X-CSRF-TOKEN'] = token;

    // for axios
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
}

// -----------------------------------------------------------------------
// Item

function addItem(members, item) {
    members.push(item);
}

function removeItem(memberEvents, itemIndex) {
    memberEvents.splice(itemIndex, 1);
}

// -----------------------------------------------------------------------
// state

const now = new Date();

const state = {
    lang: 'en',
    mainIndex: 0,
    userCalendar: [],
    currentCalendarId: '',
    currentYear: now.getFullYear(),
    currentMonth: ("0" + now.getMonth() + 1).slice(-2),
    calendar: [],
    members: [],
    //events: [],
    membersModal: {
        isActive: false,
        selectedTab: 0,
    }
}

// -----------------------------------------------------------------------
// actions

const actions = {

    // -----------------------------------------------------------------------
    // AJAX: init data
    fetchUserCalendar(context) {
        const url = '/v1/usercalendar';
        axios.get(url)
            .then(function (response) {
                context.commit('initUserCalendar', response.data );
                context.commit('setCurrentCalendarId', response.data[0].id);
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    fetchCalendar(context) {
        const url = '/v1/calendar/' + context.state.currentCalendarId + '/' + context.state.currentYear + '/' + context.state.currentMonth;
        axios.get(url)
            .then(function (response) {
                context.commit('initCalendar', response.data.days );
                context.commit('initMembers', response.data.members );
            })
            .catch(function (error) {
                console.log(error);
            });
    },

    // -----------------------------------------------------------------------
    // AJAX: member
    insertMember: function (context, payload) {
        
        const url = '/v1/member';
        setCsrfToken();
        
        axios.post(url, {
            'user_calendar_id': context.state.currentCalendarId,
            'name': payload.name,
            'color': payload.color
        })
        .then(function (response) {
            const key = context.getters.newColumnKey;
            context.commit('addMember', {'key': key, 'data': response.data});
            context.commit('setMembersModalSelectedTab', key);
            alertMixin.methods.alertSuccess( 'Success: add new member!', false, 'FcMemberTabs.vue' );
        })
        .catch(function (error) {
            alertMixin.methods.alertDanger( 'Failed: add new member!', false, 'FcMemberTabs.vue' );
        });
    },

    editUpdateMember: function(context, payload) {
        const selectedTab = context.state.membersModal.selectedTab;
        const url = '/v1/member/' + selectedTab;
        setCsrfToken();

        axios.patch(url, {
            'name': payload.name,
            'color': payload.color
        })
        .then(function (response) {
            context.commit('updateMember', {
                'id': response.data.id,
                'name': response.data.name,
                'color': response.data.color
            });
            alertMixin.methods.alertSuccess( 'Success: member updated!', false, 'FcMemberTabs.vue' );
        })
        .catch(function (error) {
            alertMixin.methods.alertDanger( 'Failed: member updated!', false, 'FcMemberTabs.vue' );
        });
    },

    deleteMember: function(context, payload) {
        const selectedTab = context.state.membersModal.selectedTab;
        const url = '/v1/member/' + selectedTab;
        setCsrfToken();

        axios.delete(url)
        .then( function (response) {
            context.commit('deleteMember', selectedTab);
            //context.commit('deleteEventFromColumn', selectedTab);
            alertMixin.methods.alertSuccess( 'Success: member deleted!', false, 'FcMemberTabs.vue' );
        })
        .catch( function (error) {
            alertMixin.methods.alertDanger( 'Failed: member deleted!', false, 'FcMemberTabs.vue' );
        });
    },

    // -----------------------------------------------------------------------
    // AJAX: event
    insertEvent(context, payload) {
        const date = context.state.currentYear + '-' 
                    + context.state.currentMonth + '-'
                    + ("0" + payload.day).slice(-2);

        const url = '/v1/event';
        setCsrfToken();

        axios.post(url, {
            'date': date,
            'member_id': payload.member_id,
            'content': payload.content
        })
        .then(function (response) {
            addItem(payload.memberColumn, response.data);
            alertMixin.methods.alertSuccess('Success: inserted!', false, 'EventApi.js');
        })
        .catch(function (error) {
            alertMixin.methods.alertDanger('Failed: updated!', false, 'EventApi.js');
        });
    },

    editUpdateEvent(context, payload) {

        payload.event.editing = false;
        if(payload.event.content == payload.event.oldValue) {
            payload.event.oldValue = '';
            return;
        }
        payload.event.oldValue = '';

        const url = '/v1/event/' + payload.event.id;
        setCsrfToken();

        axios.patch(url, {
            'member_id': payload.event.member_id,
            'content': payload.event.content,
            'date': payload.event.date
        })
        .then(function (response) {
            alertMixin.methods.alertSuccess('Success: updated!', false, 'EventApi.js');
        })
        .catch(function (error) {
            alertMixin.methods.alertDanger('Failed: updated!', false, 'EventApi.js');
        });
    },

    deleteEvent(context, payload) {

        const url = '/v1/event/' + payload.event.id;
        setCsrfToken();

        axios.delete(url)
        .then(function (response) {
            removeItem(payload.members, payload.index);
            alertMixin.methods.alertSuccess('Success: deleted!', false, 'EventApi.js');
        })
        .catch(function (error) {
            alertMixin.methods.alertDanger('Failed: deleted!', false, 'EventApi.js');
        });
    },

    // -----------------------------------------------------------------------
    // DnD: event
    moveItem(context, payload) {
        addItem(payload.memberEvents, payload.event);
        removeItem(payload.draggingItemFrom, payload.itemIndex);

        const y = context.state.currentYear;
        const m = context.state.currentMonth;
        const d = payload.day;

        payload.event.date = y + '-' + m + '-' + d;
        payload.event.member_id = payload.memberId;

        context.dispatch('editUpdateEvent', {'event': payload.event});
        //context.dispatch('insertEvent', payload);
        //context.dispatch('deleteEvent', payload);
    }
}

// -----------------------------------------------------------------------
// getters

const getters = {
    newColumnKey: (state, getters) => {

        let keys = Object.keys(state.members);

        keys.map(function(key) {
            return parseInt(key);
        });

        return Math.max.apply(null, keys) + 1;
    },
}

// -----------------------------------------------------------------------
// main

export default new Vuex.Store({
    //strict: true,
    state,
    actions,
    mutations,
    getters
})
