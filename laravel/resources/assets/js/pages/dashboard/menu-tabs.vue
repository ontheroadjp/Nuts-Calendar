<template>
<div>
    <div class="tabs thin">
        <ul style="border-bottom: none">
            <template v-for="(tab, uri) in tabs">
                <li :style="$route.path === uri ? isActive : ''">
                    <router-link :to="uri" 
                        :style="$route.path === uri ? isActive : ''">

                        <span class="icon is-small">
                            <i :class="['fa', tab.icon]"></i>
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
        tabs: { type: Object, required: true },
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

        isActive: function() {
            return {
                'color': this.theme.primary.code,
                'border-bottom': '1px solid ' + this.theme.primary.code,
                'cursor': 'default'
            }
        }
    },
}
</script>

<style lang="scss" scoped>
    /* empty */
</style>
