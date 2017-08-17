<template>
<div class="tabs is-toggle">
    <ul>
        <li v-for="(tab, index) in tabs" :class="currentId === index ? 'is-active' : ''">
            <a @click="clickTab(index)">
                <span class="icon is-small"><i class="fa" :class="tab.icon"></i></span>
                <span>{{ tab.label }}</span>
            </a>
        </li>
    </ul>
</div>
</template>

<script>
import { mapState, mapAction } from 'vuex';

export default {
    data() {
        return {
            tabs: [
                { label: 'Dashboard', icon: 'fa-calendar' },
                { label: 'Calendar Settings', icon: 'fa-gear' },
                { label: 'Application Settings', icon: 'fa-gear' },
                { label: 'Account Settings', icon: 'fa-gear' }
            ]
        }
    },

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
