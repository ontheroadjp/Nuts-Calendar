<template>
<div>
    <hero title="Account settings" subtitle="Primary subtitle"></hero>
    <div style="width: 100%; height: 100vh; background: #fff;">
    
        <div class="tabs is-boxed">
            <ul>
                <li :class="{'is-active': selected == 'general'}">
                    <router-link to="/me/settings/general">General infomation</router-link>
                </li>
    
                <li :class="{'is-active': selected == 'theme'}">
                    <router-link to="/me/settings/theme">Theme settings</router-link>
                </li>
    
                <li :class="{'is-active': selected == 'password'}">
                    <router-link to="/me/settings/password">Password change</router-link>
                </li>
            </ul>
        </div>
        
        <div class="pain" v-if="selected == 'general'">
            <general-pane></general-pane>
        </div>
    
        <div class="pain" v-else-if="selected == 'theme'">
            <theme-pane></theme-pane>
        </div>
    
        <div class="pain" v-else-if="selected == 'password'">
            <password-pane></password-pane>
        </div>
    
    </div><!-- // .container -->
</div>
</template>

<script>
import hero from '../../partials/hero.vue';
import generalPane from './general.vue';
import themePane from './theme.vue';
import passwordPane from './password.vue';

export default {
    components: {
        'hero': hero,
        'general-pane': generalPane,
        'theme-pane': themePane,
        'password-pane': passwordPane,
    },

    data() {
        return {
            selected: 'general',
        }
    },

    watch: {
        '$route' (to, from) {
            this.selected = this.$route.params.type;
        }
    },

    mounted() {
        this.selected = this.$route.params.type;
    },

    computed: {
        theme: function() {
            return this.$store.state.app.theme;
        },
    },
}
</script>

<style lang='scss'>
.result-fade-enter-active .result-fade-leave-active {
    transition: all .4s ease;
    z-index: 99999;
}
.result-fade-enter .result-fade-leave-to {
    opacity: 0;
}
</style>
