<template>
<div>
    <div class="message-header">
        <p><strong>Danger</strong>!</p>
        <button class="delete" @click="close()"></button>
    </div>
    <div class="message-body">
        <p style="margin-bottom:20px">
            Are you sure to delete column <strong>{{ columnId ? members[columnId].name : ''}}</strong> ?
        </p>
        <div>
            <a class="button is-outlined is-danger" @click="ok()">OK</a>
            <a class="button is-outlined is-danger" @click="close()">Cancel</a>
        </div>
    </div>
</div>
</template>

<script>
import memberService from '../../../../services/member.js'

export default {
    props: [
        'isActive', 'columnId'
    ],

    mixins: [
        memberService
    ],

    computed: {
        members: function() {
            return this.$store.state.calendar.data.members;
        }
    },

    methods: {
        ok: function() {
            this.execDeleteMember(this.columnId);
            this.close();
        },

        close: function() {
            this.isActive = false;
        },
    },
}
</script>
