<template>
<article class="message is-danger" style="z-index: 99; width: 50%">
    <div class="message-header">
        <p>Confirmation</p>
        <button class="delete" @click="close()"></button>
    </div>
    <div class="message-body">
        <p style="padding: 60px">
        Are you sure to delete column <strong>{{ columnId ? members[columnId].name : ''}}</strong> ?
        </p>
        <div class="has-text-centered">
            <a 
                class="button is-outlined is-danger" 
                style="margin-right: 10px"
                @click="ok()"
            >OK</a>
            <a 
                class="button is-outlined is-danger" 
                style="margin-left: 10px"
                @click="close()"
            >Cancel</a>
        </div>
    </div>
</article>
</template>

<script>
import { mapState } from 'vuex';
import memberService from '../../../../services/member.js'

export default {
//    props: [
//        'isActive', 'columnId'
//    ],

    mixins: [
        memberService
    ],

    computed: {
        ...mapState({
            members: state => state.calendar.data.members,
            columnId: state => state.calendar.behavior.column.deletingColumnId,
        })
//        members: function() {
//            return this.$store.state.calendar.data.members;
//        }
    },

    methods: {
        ok: function() {
            this.execDeleteMember(this.columnId);
            this.close();
        },

        close: function() {
//            this.isActive = false;
            const payload = {
                isDeleting: false,
                deletingColumnId: null
            }
            this.$store.commit('toggleColumnDeleting', payload);
        },
    },
}
</script>
