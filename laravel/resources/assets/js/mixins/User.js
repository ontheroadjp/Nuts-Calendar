import axios from 'axios';
import focus from '../directives/NutsFocus.js';
import authAlertMixin from '../mixins/AuthAlert.js';

export default {
    directives: {
        focus
    },

    mixins: [
        authAlertMixin
    ],

    data() {
        return {
            input: {
                name: '',
                email: '',
                password: '',
                passwordConfirmation: '',
//                oldPassword: '',
//                newPassword: '',
//                newPasswordConfirm: '',
//                rememberMe: false,
            },

            errors: {
                authentication: '',
                name: '',
                email: '',
                password: '',
                passwordConfirmation: '',
//                oldPassword: '',
//                newPassword: '',
//                newPasswordConfirm: '',
//                rememberMe: '',
            },

            passwordMailResult: '',

            passwordResetResult: '',

            style: {
                error: {
                    color: 'red',
                }
            },
        }
    },

    computed: {
        nameHasError: function() {
            return this.errors.name && ! this.input.name ? true : false;
        },

        emailHasError: function() {
            return this.errors.email && ! this.input.email ? true : false;
        },

        passwordHasError: function() {
            return this.errors.password && ! this.input.password ? true : false;
        },

        passwordConfirmationHasError: function() {
            return this.errors.passwordConfirmation && ! this.input.passwordConfirmation ? true : false;
        },
    },

    methods: {
        isNameInvalid: function() {
            if( this.input.name === '' ) {
                this.errors.name = 'The name field is required.';
                return true;
            }
            return false;
        },

        isEmailInvalid: function() {
            if( this.input.email === '' ) {
                this.errors.email = 'The email field is required.';
                return true;
            }

            const emailReg = "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"; 
            if( ! this.input.email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) ) {
                this.errors.email = 'The email format is invalid.';
                this.input.email = '';
                return true;
            };

            return false;
        },

        isPasswordInvalid: function() {
            if( this.input.password === '' ) {
                this.errors.password = 'The password field is required.';
                return true;
            }
            return false;
        },

        isPasswordConfirmationInvalid: function() {
            if( this.input.passwordConfirmation === '' ) {
                this.errors.passwordConfirmation = 'The password confirmation field is required.';
                return true;
            }
            if( this.input.passwordConfirmation !== this.input.password ) {
                this.errors.passwordConfirmation = 'This field must be the same as the password field.';
                this.input.passwordConfirmation = '';
                return true;
            }
            return false;
        },

        login: function() {
            this.errors.authentication = '';
            this.errors.email = '';
            this.errors.password = '';
            console.log('login()');

            const inputEmailInvalid = this.isEmailInvalid();
            const inputPasswordInvalid = this.isPasswordInvalid();
            if( inputEmailInvalid || inputPasswordInvalid) return;

            const self = this;
            const url = '/api/v1/login';

            axios.post(url, {
                'email': this.input.email,
                'password': this.input.password,
            })
            .then(function (response) {
                self.successLogin(response);
            })
            .catch(function (error) {
                if( error.response.status === 401 || error.response.status === 500) {
                    self.errors.authentication = 'Email address or Password is incorrect.';
                }

                if( error.response.status === 429) {
                    const min = error.response.data.retryAfter.minuts;
                    self.errors.authentication = 'Too many login attempts. Try it again after ' + min + ' minuts.';
                }

                if( error.response.data.email ) {
                    self.errors.email = error.response.data.email[0];
                    self.input.email = '';
                }

                if( error.response.data.password ) {
                    self.errors.password = error.response.data.password[0];
                    self.input.password = '';
                }
            });
        },

        successLogin: function(response) {
            const token = response.data.token;
            const username = response.data.user.name;
            this.$store.commit('login', response.data);

            if( this.input.rememberMe  ) {
                localStorage.setItem('rememberMe', token);
            } else {
                localStorage.clear();
            }

            this.$route.router.go('/dashboard');
        },

        register: function() {
            this.errors.name = '';
            this.errors.email = '';
            this.errors.password = '';
            this.errors.passwordConfirmation = '';
            console.log('register()');

            const inputNameInvalid = this.isNameInvalid();
            const inputEmailInvalid = this.isEmailInvalid();
            const inputPasswordInvalid = this.isPasswordInvalid();
            const inputPasswordConfirmationInvalid = this.isPasswordConfirmationInvalid();
            if( 
                inputNameInvalid 
                    || inputPasswordInvalid 
                    || inputPasswordInvalid 
                    || inputPasswordConfirmationInvalid
            ) return;

            const self = this;
            const url = '/api/v1/register';

            axios.post(url, {
                'name': this.input.name,
                'email': this.input.email,
                'password': this.input.password,
                'password_confirmation': this.input.passwordConfirmation,
            })
            .then(function (response) {
                self.successLogin(response);
            })
            .catch(function (error) {
                if( error.response.status === 401 ) {
                    self.errors.authentication = 'Email address or Password is incorrect.';
                }

                if( error.response.data.email ) {
                    self.errors.email = error.response.data.email[0];
                    self.input.email = '';
                }

                if( error.response.data.password ) {
                    self.errors.password = error.response.data.password[0];
                    self.input.password = '';
                }
            });
        },

        logout: function() {
            console.log('logout()');
            sessionStorage.clear();
            localStorage.clear();

            this.$store.commit('logout');
            this.$route.router.go('/');
        },

        sendPasswordMail: function() {
            this.errors.email = '';
            console.log('sendPasswordMail()');

            const inputEmailInvalid = this.isEmailInvalid();
            if(inputEmailInvalid) return;

            const self = this;
            const url = '/api/v1/password/email';

            axios.post(url, {
                'email': this.input.email
            })
            .then(function(response) {
                self.passwordMailResult = 'success';
                console.log('success sent reset password mail');
            })
            .catch(function(error) {
                self.passwordMailResult = 'failed';
                console.log('error sent reset password mail');
            });
        },

        passwordReset: function() {
            this.errors.email = '';
            this.errors.password = '';
            this.errors.passwordConfirmation = '';
            console.log('passwordReset()');

            const inputEmailInvalid = this.isEmailInvalid();
            const inputPasswordInvalid = this.isPasswordInvalid();
            const inputPasswordConfirmationInvalid = this.isPasswordConfirmationInvalid();
            if( inputEmailInvalid 
                    || inputPasswordInvalid 
                    || inputPasswordConfirmationInvalid
            ) return;

            const tmp = this.$route.path.replace('/password/reset/', '').split('?');
            const token = tmp[0];
            console.log('token: ' + token);

            const self = this;
            const url = '/api/v1/password/reset';

            console.log('password: ' + this.input.password);
            console.log('confirmation: ' + this.input.passwordConfirmation);

            axios.post(url, {
                'email': this.input.email,
                'password': this.input.password,
                'password_confirmation': this.input.passwordConfirmation,
                'token': token,
            })
            .then(function(response) {
                self.passwordResetResult = 'success';
                console.log('success reset password');
            })
            .catch(function(error) {
                self.passwordResetResult = 'failed';
                console.log('error reset password');
            });
        },

        putSettings() {
            this.errors.name = '';
            console.log('putSettings()');

            const inputNameInvalid = this.isNameInvalid();
            if( inputNameInvalid ) return;

            const self = this;
            const url = '/api/v1/me/settings';

            axios.post(url, {
                'name': this.input.name,
                '_method': 'PUT',
            })
            .then(function (response) {
                console.log('success: putSettings()');
//                self.successLogin(response);
            })
            .catch(function (error) {
                console.log('error: putSettings()');
//                if( error.response.status === 401 ) {
//                    self.errors.authentication = 'Email address or Password is incorrect.';
//                }
//
//                if( error.response.data.email ) {
//                    self.errors.email = error.response.data.email[0];
//                    self.input.email = '';
//                }
//
//                if( error.response.data.password ) {
//                    self.errors.password = error.response.data.password[0];
//                    self.input.password = '';
//                }
            });
        },

//        logout: function() {
//            console.log('logout()');
//            const self = this;
//            const url = '/api/v1/logout';
//
//            axios.get(url)
//            .then(function (response) {
//                console.log('logout success');
//
////                sessionStorage.clear();
//                localStorage.clear();
//
//                self.$store.commit('logout');
//                self.$route.router.go('/');
//
//            })
//            .catch(function (error) {
//                if (error.response) {
//                    console.log(error.response.data);
//                    console.log(error.response.status);
//                    console.log(error.response.headers);
//                } else {
//                    console.log('Error', error.message);
//                }
//                console.log(error.config);
//            });
//        },

    }
}

