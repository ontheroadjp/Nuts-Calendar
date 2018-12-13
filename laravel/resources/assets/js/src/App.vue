<template>
    <div>
        <navbar></navbar>
        <notification></notification>
        <router-view></router-view>
        <page-footer v-if="$route.meta.footer"></page-footer>
    </div>
</template>

<script>
    import core from './mixins/core.js';
    import navbar from './pages/partials/navbar/index.vue';
    import notification from './components/notification.vue';
    import pageFooter from './pages/partials/footer/index.vue';
    import store from './store/index.js';


    export default {

        store,

        components: {
            'navbar': navbar,
            'notification': notification,
            'page-footer': pageFooter
        },

        mixins: [ core ],

        created() {
            u.clog('start@app.vue');
            eventBus.listen('nuts.login.success', this.handleLogin, 'app.vue');
            this.initApp();
        },

        methods: {
            initApp () {
                this.startApp();
            },

            startApp() {
                this.setTheme();
                this.setLang();
                this.initToken();
            },

            setTheme() {
                const theme = localStorage.getItem('theme');
                if(theme) {
                    this.$store.commit('SET_THEME', theme);
                } else {
                    this.$store.commit('SET_THEME', 'ruri');
                }
            },

            setLang() {
                const lang = localStorage.getItem('lang');
                if(lang) {
                    this.$store.commit('SET_LANG', lang);
                } else {
                    this.$store.commit('SET_LANG', 'en');
                }
            },

            initToken() {
                const token = jwtToken.getLocalToken();
                if(token) {
                    http.fetchGet('/api/v1/data')
                        .then(response => this.successInit(response))
                        .catch(error => this.failedInit(error));
                } else {
                    u.clog('finish')
                }
            },

            successInit(response) {
                u.clog('success')
                this.$store.commit('user/init', {
                    user: response.data.user,
                    userPlan: response.data.userplan
                });
//                this.$store.commit('userplan/INIT', response.data.userplan);
                this.$store.commit('userCalendar/INIT', response.data.usercalendar );
                this.$store.commit('userCalendarMember/INIT', response.data.usercalendar_members );
                this.$store.commit('member/INIT', response.data.members );
                this.$store.commit('READY', true);
                eventBus.fire('nuts.app.ready', null, 'App.vue');
            },

            failedInit(error) {
                u.clog('failed' + error)
                this.$store.commit('LOGOUT');
                this.$router.push('/login');
            },

            handleLogin(p) {
                const token = p.response.data.token;

                // temp
                //if( p.rememberMe ) {
                if(false) {
                    localStorage.setItem('rememberMe', token);
                } else {
                    localStorage.removeItem('rememberMe');
                }

                this.initApp();

                this.$router.push('/dashboard');
            }
        }
    }
</script>

<style lang="scss">
a {
    color: rgb(25, 96, 183);
}

.thin { font-weight: 100; }
.thin-200 { font-weight: 200; }
.thin-300 { font-weight: 300; }
.thin-400 { font-weight: 400; }
.thin-500 { font-weight: 500; }
.thin-600 { font-weight: 600; }

.strip {
    border: none;
    border-radius: 0;
    box-shadow: none;
    background: none;
    outline: none;
}

.hover-border {
    &:hover {
        border: 1px solid #e6e6e6 !important;
    }
}

.hover-underline {
    &:hover {
        text-decoration: underline !important;
    }
}
</style>
