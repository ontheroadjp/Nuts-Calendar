import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import alertMixin from '../mixins/Alert.js';
import mutations from './mutations.js';

//Vue.use(Vuex);

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
// state

const now = new Date();

const state = {
    lang: 'en',
    mainIndex: 0,
    currentYear: now.getFullYear(),
    currentMonth: ("0" + now.getMonth() + 1).slice(-2),
    calendar: [],
    members: [],
    events: [],
    membersModal: {
        isActive: false,
        selectedTab: 0,
    }
}

// -----------------------------------------------------------------------
// actions

const actions = {

    // -----------------------------------------------------------------------
    // AJAX: member
    insertMember: function (context, payload) {
        
        const url = '/v1/member';
        setCsrfToken();
        
        axios.post(url, {
            'user_calendar_id': 1,
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
    fetchData(context) {
        const url = '/v1/calendar/1/' + context.state.currentYear + '/' + context.state.currentMonth;
        axios.get(url)
            .then(function (response) {
                nutsHub.fire(
                    'api-fetch-data', 
                    {'response': response}, 
                    'EventApi.vue'
                )
            })
            .catch(function (error) {
                console.log(error);
            });
    },

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
            payload.memberColumn.push(response.data);
            alertMixin.methods.alertSuccess('Success: inserted!', false, 'EventApi.js');
        })
        .catch(function (error) {
            alertMixin.methods.alertDanger('Failed: updated!', false, 'EventApi.js');
        });
    },

    editUpdateEvent(context, payload) {
        if(payload.event.content == payload.event.oldValue) return;

        payload.event.editing = false;
        payload.event.oldValue = '';

        const url = '/v1/event/' + payload.event.id;
        setCsrfToken();

        axios.patch(url, {
            'member_id': payload.event.member_id,
            'content': payload.event.content,
            'date': payload.event.date
        }).then(function (response) {
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
            payload.members.splice(payload.index, 1);
            alertMixin.methods.alertSuccess('Success: deleted!', false, 'EventApi.js');
        })
        .catch(function (error) {
            alertMixin.methods.alertDanger('Failed: deleted!', false, 'EventApi.js');
        });
    },
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
