export default {

    // -----------------------------------------------------------------------
    // member

    insertMember: function (context, payload) {
        
        const url = '/api/v1/member';
        const params = {
            'user_calendar_id': context.state.calendar.currentId,
            'name': payload.name,
            'color': payload.color
        };
        
        http.post(url, params,
            response => {
                u.clog('success');
                const key = context.getters.newColumnKey;
                context.commit('addMember', {'key': key, 'data': response.data});
                context.commit('setMembersModalSelectedTab', key);
            },
            error => {
                u.clog('failed');
            } 
        );
    },

    deleteMember: function(context, payload) {
        const selectedTab = context.state.membersModal.selectedTab;
        const url = '/api/v1/member/' + selectedTab;

        http.delete(url,
            response => {
                u.clog('success');
                context.commit('deleteMember', selectedTab);
                //context.commit('deleteEventFromColumn', selectedTab);
            },
            error => {
                u.clog('failed');
            }
        );
    },

    // -----------------------------------------------------------------------
    // item

}
