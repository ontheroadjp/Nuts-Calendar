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

            setLang() {
                const lang = localStorage.getItem('lang');
                if(lang) {
                    this.$store.commit('setLang', lang);
                } else {
                    this.$store.commit('setLang', 'en');
                }
            },

            setTheme() {
                const theme = localStorage.getItem('theme');
                if(theme) {
                    this.$store.commit('setTheme', theme);
                } else {
                    this.$store.commit('setTheme', 'koiai');
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
//                this.$store.commit('initUserCalendar', response.data.usercalendar );
//                this.$store.commit('initDashboardUserCalendarMembers', response.data.usercalendar_members );
//                this.$store.commit('initMembersForUserCalendar', response.data.members );
//                this.$store.commit('initMembers', response.data.members );

                this.$store.commit('login', response.data.currentuser.name);
                this.$store.commit('userCalendar/init', response.data.usercalendar );
                this.$store.commit('userCalendarMember/init', response.data.usercalendar_members );
                this.$store.commit('member/init', response.data.members );
                this.$store.commit('ready', true);
                eventBus.fire('nuts.app.ready', null, 'App.vue');
            },

            failedInit(error) {
                u.clog('failed' + error)
                this.$store.commit('logout');
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

<style>
a {
    color: rgb(25, 96, 183);
}

.thin { font-weight: 100; }
.thin-200 { font-weight: 200; }
.thin-300 { font-weight: 300; }
.thin-400 { font-weight: 400; }
.thin-500 { font-weight: 500; }
.thin-600 { font-weight: 600; }
</style>
