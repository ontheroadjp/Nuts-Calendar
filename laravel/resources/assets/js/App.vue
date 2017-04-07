<template>
    <div>
        <fc-navbar></fc-navbar>
        <router-view></router-view>
    </div>
</template>

<script>
    import store from './store/index.js'
    import fcNavbar from './components/FcNavbar.vue'

    export default {
    
        store,
        
        components: {
            'fc-navbar': fcNavbar,
        },
    
        ready() {
            u.clog('ready@app.vue');
            http.init();

            this.beforRouting();
            //this.afterRouting();
        },

        methods: {
            beforRouting() {
                const self = this;
                this.$route.router.beforeEach(function (transition) {
                    u.clog( '------- ' + transition.to.path + ' -------' );
                    const token = jwtToken.getLocalToken();
                    if(! token) {
                        self.handleNoLogedIn(transition);
                        return;
                    }
                    self.handleAlreadyLogedIn(transition, token);
                });
            },

            afterRouting() {
                //const self = this;
                //this.$route.router.afterEach(function (transition) {
                //    u.clog('afterEach @' + transition.to.path)
                //});
            },

            handleNoLogedIn(transition) {
                u.clog('handleNoLogedIn@app.vue');
                if(transition.to.auth) {
                    transition.redirect('/login');
                }
                transition.next();
            },

            handleAlreadyLogedIn(transition, token) {
                u.clog('handleAlreadyLogedIn@app.vue');
//                this.$store.commit('login', {'token': token, 'user': user});
                if(localStorage.getItem('rememberMe')) {
                    u.clog('REMEMBER ME - true!!!');
                    localStorage.setItem('rememberMe', token);
//                    localStorage.setItem('username', user.name);
                }
                u.clog('transition.next()');
                transition.next();

            },
        }
    }
</script>

<style>
</style>
