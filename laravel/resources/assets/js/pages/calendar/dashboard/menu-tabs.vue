<template>
<div class="tabs is-toggle">
    <ul>
        <li :class="currentId === 1 ? 'is-active' : ''">
            <a @click="clickTab(1)">
                <span class="icon is-small"><i class="fa fa-calendar"></i></span>
                <span>Calendars</span>
            </a>
        </li>
        <li :class="currentId === 2 ? 'is-active' : ''">
            <a @click="clickTab(2)">
                <span class="icon is-small"><i class="fa fa-gear"></i></span>
                <span>Application Settings</span>
            </a>
        </li>
        <li :class="currentId === 3 ? 'is-active' : ''">
            <a @click="clickTab(3)">
                <span class="icon is-small"><i class="fa fa-users"></i></span>
                <span>Account Settings</span>
            </a>
        </li>
    </ul>
</div>
</template>

<script>
import { mapState, mapAction } from 'vuex';

export default {
    computed: {
        ...mapState('dashboard', {
            currentId: state => state.currentId
        })
    },

    methods: {
        clickTab: function(id) {
            this.$store.commit('dashboard/setCurrentId', {id: id});
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
