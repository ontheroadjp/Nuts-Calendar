<template>
    <div>
        <navbar></navbar>
        <notification></notification>
        <router-view></router-view>
        <page-footer v-if="$route.footer"></page-footer>
    </div>
</template>

<script>
    import navbar from './pages/partials/navbar/index.vue'
    import notification from './components/notification.vue'
    import pageFooter from './pages/partials/footer/index.vue'
    import store from './store/index.js'

    export default {
    
        store,
        
        components: {
            'navbar': navbar,
            'notification': notification,
            'page-footer': pageFooter,
        },
    
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
                this.initToken();
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
                this.$store.commit('login', response.data.currentuser.name);
                this.$store.commit('initUserCalendar', response.data.usercalendar );

//                this.$store.commit('initCalendar', response.data.days );
//                Object.keys(response.data.members).forEach(function(key) {
//                    let val = this[key];
//                    val.isShow = true;
//                    u.clog(key + ':' + val.name + '(order: ' + val.order + ')');
//                },response.data.members);
//                this.$store.commit('initMembers', response.data.members );

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
                const username = p.response.data.user.name;
    
                // temp
                //if( p.rememberMe ) {
                if(false) {
                    localStorage.setItem('rememberMe', token);
                } else {
                    localStorage.clear();
                }
    
                this.initApp();

                this.$router.push('/calendar');
            },
        }
    }
</script>
