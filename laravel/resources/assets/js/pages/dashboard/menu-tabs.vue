<template>
<div>
    <div class="tabs">
        <ul class="flat-tabs" style="border-bottom: none">
            <template v-for="(tab, uri) in tabs">
                <li v-if="$route.path === uri" :style="[ isActive ]" >
                    <a style="color:white">
                        <span class="icon is-small">
                            <i class="fa" :class="tab.icon"></i>
                        </span>
                        <span>{{ tab.label }}</span>
                    </a>
                </li>
        
                <li v-else>
                    <router-link :to="uri">
                        <span class="icon is-small">
                            <i class="fa" :class="tab.icon"></i>
                        </span>
                        <span>{{ tab.label }}</span>
                    </router-link>
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
//        tabs: { type: Array, required: true },
        tabs: { type: Object, required: true },
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
}
</style>
