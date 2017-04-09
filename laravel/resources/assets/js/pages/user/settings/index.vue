<template>
<hero title="Account settings" subtitle="Primary subtitle"></hero>
<div style="width: 100%; height: 100vh; background: #fff;">

    <div class="tabs is-boxed">
        <ul>
            <li :class="{'is-active': selected == 'general'}">
                <a  v-link="{ path: '/me/settings/general' }" 
                    @click="selected = 'general'"
                >General infomation</a>
            </li>

            <li :class="{'is-active': selected == 'theme'}">
                <a  v-link="{ path: '/me/settings/theme' }" 
                    @click="selected = 'theme'"
                >Theme settings</a>
            </li>

            <li :class="{'is-active': selected == 'password'}">
                <a  v-link="{ path: '/me/settings/password' }" 
                    @click="selected = 'password'"
                >Password change</a>
            </li>
        </ul>
    </div>
    
    <div class="pain" v-show="selected == 'general'">
        <general-pane></general-pane>
    </div>

    <div class="pain" v-show="selected == 'theme'">
        <theme-pane></theme-pane>
    </div>

    <div class="pain" v-show="selected == 'password'">
        <password-pane></password-pane>
    </div>

</div><!-- // .container -->
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

    ready() {
        this.selected = this.$route.params.type;
    },

    computed: {
        theme: function() {
            return this.$store.state.app.theme;
        },
    },
}
</script>

<style lang='sass'>
/*
    .result-fade-transition {
        transition: all .4s ease;
        z-index: 99999;
    }
    .result-fade-enter {
        opacity: 0;
    }
    .result-fade-leave {
        opacity: 0;
    }
*/
</style>
