<template>
<div class="tabs is-toggle">
    <ul class="flat-tabs">
        <li v-for="(tab, index) in tabs" 
            :class="currentId === index ? 'is-active' : ''"
        >
            <a @click="clickTab(index)">
                <span class="icon is-small"><i class="fa" :class="tab.icon"></i></span>
                <span>{{ tab.label }}</span>
            </a>
        </li>
    </ul>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: [
        'tabs'
    ],

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
.flat-tabs {
    & li a {
        border: none;
        &:hover {
            border-radius: 20px;
        }
    }

    & li.is-active a {
        border-radius: 20px;
        background-color: blue;
    }
}
</style>
