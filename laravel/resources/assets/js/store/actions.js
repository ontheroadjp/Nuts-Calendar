export default {
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
}
