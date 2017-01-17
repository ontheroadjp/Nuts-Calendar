import VueResource from 'vue-resource';
import alertMixin from '../mixins/Alert.js';

export default {

    mixins: [
        alertMixin
    ],

    methods: {

        // -----------------------------------------------------------------------
        // Insert: Update
        insertMember: function () {

            var new_member = {
                name: this.fields.name,
                color: this.fields.color,
            };

            var url = '/api/member';
            Vue.http.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');

            this.$http({
                url: url,
                method: 'POST',
                body: new_member
            }).then(
                function(response) {
                    const key = this.newColumnKey;
                    this.$store.commit('addMember', {'key': key, 'data': response.data});
                    this.$store.commit('setMembersModalSelectedTab', key);
                    this.$store.commit('fillEventToCalendar', key);

                    this.alertSuccess( 'Success: add new member!', false, 'FcMemberTabs.vue' );

                }, function(response) {
                    this.alertDanger( 'Failed: add new member!', false, 'FcMemberTabs.vue' );

                }
            )
        },

        // -----------------------------------------------------------------------
        // Edit: update
        editUpdateMember: function() {

            var updated_member = {
                name: this.fields.name,
                color: this.fields.color
            };

            var url = '/api/member/' + this.selectedTab;
            Vue.http.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');

            this.$http({
                url: url,
                method: 'PATCH',
                body: updated_member

            }).then(
                function(response) {
                    let id = response.body.id;
                    let color = response.body.color;
                    let name = response.body.name;

                    this.$store.state.members[id].color = color;
                    this.$store.state.members[id].name = name;

                    this.alertSuccess( 'Success: member updated!', false, 'FcMemberTabs.vue' );

                }, function(response) {
                    nutsHub.fire('memberUpdateFailed', { 'response': response }, 'MemberApi.js');
                    this.alertDanger( 'Failed: member updated!', false, 'FcMemberTabs.vue' );

                }
            )
        },

        // -----------------------------------------------------------------------
        // Delete
        deleteMember: function() {
            var url = '/api/member/' + this.selectedTab;
            Vue.http.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content')

            this.$http({
                url: url,
                method: 'DELETE',
            }).then(
                function(response) {
                    this.$store.commit('deleteMember', this.selectedTab);
                    this.$store.commit('deleteEventFromColumn', this.selectedTab);
                    this.alertSuccess( 'Success: member deleted!', false, 'FcMemberTabs.vue' );

                }, function(response) {
                    this.alertDanger( 'Failed: member deleted!', false, 'FcMemberTabs.vue' );

                }
            )
        },

    }
}

