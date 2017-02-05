<template>
    <div>
        <fc-navbar></fc-navbar>
        <router-view></router-view>
    </div>
</template>

<script>
    import axios from 'axios';
    import store from './store/index.js'
    import fcNavbar from './components/FcNavbar.vue'
    
    export default {
    
        store,
    
        components: {
            'fc-navbar': fcNavbar,
        },
    
        ready() {
            console.log('ready@app.vue');
            this.beforRouting();
            //this.afterRouting();
        },

        methods: {
            beforRouting() {
                const self = this;
                this.$route.router.beforeEach(function (transition) {
                    console.log( '-------- ' + transition.to.path + ' --------' );
                    const token = self.getLocalToken();
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
                //    console.log('afterEach @' + transition.to.path)
                //});
            },

            getLocalToken() {
                let token = localStorage.getItem('rememberMe');
                if(! token) {
                    token = sessionStorage.getItem('token');
                }
                return token;
            },

            handleNoLogedIn(transition) {
                console.log('handleNoLogedIn@app.vue');
                if(transition.to.auth) {
                    transition.redirect('/login');
                }
                transition.next();
            },

            handleAlreadyLogedIn(transition, token) {
                const self = this;
                console.log('handleAlreadyLogedIn@app.vue');
                this.checkToken(token)
                    .then(this.validToken)
                    .then(function() {
                        if(transition.to.path == '/login') {
                            transition.redirect('/dashboard');
                        }
                        console.log('transition.next()');
                        transition.next();
                    })
                    .catch(this.invalidToken);
            },

            validToken(response) {
                console.log('validToken@app.vue: ' + response.status);

                const token = response.data.token;
                const user = response.data.user;
                this.$store.commit('login', {'token': token, 'user': user});

                if(localStorage.getItem('rememberMe')) {
                    console.log('REMEMBER ME - true!!!');
                    localStorage.setItem('rememberMe', token);
                    localStorage.setItem('username', user.name);
                }

                return Promise.resolve(response);
            },

            invalidToken(error) {
                console.log('invalidToken@app.vue: ' + error.message);
                localStorage.clear();
                this.$store.commit('logout');
                if(! this.$route.path == '/login') {
                    this.$route.router.go('/login');
                }
                location.reload();
            },

            checkToken(token) {
                console.log('checkToken@app.vue');
                return new Promise( function(resolve,reject) {

                    const self = this;
                    const url = '/api/v1/me';
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

                    axios.get(url)
                        .then(function (response) {
//                            if( response.status == '200' ) {
                            if( response.data.code == '200' ) {
                                resolve(response);
                            }
                            reject(error);
                        })
                        .catch(function (error) {
                            reject(error);
                        });
                });
            },

        }
    }
</script>

<style>
</style>
