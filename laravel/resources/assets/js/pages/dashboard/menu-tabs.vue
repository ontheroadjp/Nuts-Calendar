<template>
<div>
    <div class="tabs">
        <ul class="flat-tabs" style="border-bottom: none">
            <template v-for="(tab, index) in tabs">
                <li v-if="currentId === index" :style="[ isActive ]" >
                    <a @click="clickTab(index)" style="color: white;">
                        <span class="icon is-small">
                            <i class="fa" :class="tab.icon"></i>
                        </span>
                        <span>{{ tab.label }}</span>
                    </a>
                </li>
        
                <li v-else>
                    <a @click="clickTab(index)">
                        <span class="icon is-small">
                            <i class="fa" :class="tab.icon"></i>
                        </span>
                        <span>{{ tab.label }}</span>
                    </a>
                </li>
            </template>
        </ul>
    </div>
    <slot></slot>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {
        tabs: { type: Array, required: true }
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

        ...mapState('dashboard', {
            currentId: state => state.currentId
        }),

        isActive: function() {
            return {
                'border-radius': '20px',
                'background-color': this.theme.primary.code,
            }
        }
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

/*
    & li.is-active a {
        border-radius: 20px;
        background-color: #fff;
        color: #000;
    }
*/
}
</style>
