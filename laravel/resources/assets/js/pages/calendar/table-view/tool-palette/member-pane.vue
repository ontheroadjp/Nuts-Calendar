<template>
<span>
    <span v-for="(member, memberId) in members" :key="member.id">
        <button  :class="['button', { off: !member.isShow}]" 
                  @click="clickColumnButton(memberId, !member.isShow)"
                  :disabled="disabled">
            <i v-if="member.isShow" class="fa fa-user"></i>
            <i v-else class="fa fa-user-times"></i>
            ({{ memberId }})
        </button>
    </span>
</span>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    props: {
        disabled: { type: Boolean, default: false }
    },

    computed: {
        ...mapState({
            members: state => state.member.data.members,
        }),

        showColumns: function() {
            return this.$store.getters.getShowMembers;
        }
    },

    methods: {
        ...mapActions('calendar/tableView/toolPalette', {
            toggleShowHideColumn: 'toggleShowHideColumn',
        }),

        clickColumnButton(id, value) {
            if(this.showColumns.length === 1 && value === false) return; 
            this.toggleShowHideColumn({ id, value });
        },

    }
} 
</script>

<style lang="scss" scoped>
.button.off {
    background-color: #f0f0f0;
}
</style>
