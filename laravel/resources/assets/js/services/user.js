import focus from '../directives/form-focus.js';

export default {
    directives: {
        focus
    },

    data() {
        return {
            input: {
                name: '',
                email: '',
                password: '',
                passwordConfirmation: '',
                oldPassword: '',
                newPassword: '',
                newPasswordConfirmation: '',
//                rememberMe: false,
            },

            error: {
                authentication: '',
                name: '',
                email: '',
                password: '',
                passwordConfirmation: '',
                oldPassword: '',
                newPassword: '',
                newPasswordConfirmation: '',
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
            return this.error.name && ! this.input.name ? true : false;
        },

        emailHasError: function() {
            return this.error.email && ! this.input.email ? true : false;
        },

        passwordHasError: function() {
            return this.error.password && ! this.input.password ? true : false;
        },

        passwordConfirmationHasError: function() {
            return this.error.passwordConfirmation && ! this.input.passwordConfirmation 
                ? true : false;
        },
    },

    methods: {
        isNameInvalid: function() {
            if( this.input.name === '' ) {
                this.error.name = 'The name field is required.';
                return true;
            }
            return false;
        },

        isEmailInvalid: function() {
            if( this.input.email === '' ) {
                this.error.email = 'The email field is required.';
                return true;
            }

            const reg = /^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/;
            if( ! this.input.email.match(reg) ) {
                this.error.email = 'The email format is invalid.';
                this.input.email = '';
                return true;
            };

            return false;
        },

        isPasswordInvalid: function() {
            if( this.input.password === '' ) {
                this.error.password = 'The password field is required.';
                return true;
            }
            return false;
        },

        isPasswordConfirmationInvalid: function() {
            if( this.input.passwordConfirmation === '' ) {
                const m = 'The password confirmation field is required.';
                this.error.passwordConfirmation = m;
                return true;
            }
            if( this.input.passwordConfirmation !== this.input.password ) {
                const m = 'This field must be the same as the password field.';
                this.error.passwordConfirmation = m;
                this.input.passwordConfirmation = '';
                return true;
            }
            return false;
        },

        // --------------------------------------------------------------

        login: function() {
            u.clog('login()');
            this.error.authentication = '';
            this.error.email = '';
            this.error.password = '';

            const inputEmailInvalid = this.isEmailInvalid();
            const inputPasswordInvalid = this.isPasswordInvalid();
            if( inputEmailInvalid || inputPasswordInvalid) return;

            http.post( '/api/v1/login', {
                'email': this.input.email,
                'password': this.input.password,
            }, 
                this.successLogin(this),
                this.failedLogin(this)
            );
        },

        successLogin: self => {
            return response => {
                eventBus.fire('nuts.login.success', { 
                    response: response, 
                    rememberMe: jwtToken.rememberMe
                }, 'user.vue');
            }
        },

        failedLogin: self => {
            return error => { 
                if (error.response) {
                    if( error.response.status === 422 || error.response.status === 500) {
                        const m = 'We couldn\'t verify your credentials.';
                        self.error.authentication = m;
                    }
        
                    if( error.response.status === 429) {
                        const m = 'Too many login attempts. Try it again after ';
                        const min = error.response.data.retryAfter.minuts;
                        self.error.authentication = m + min + ' minuts.';
                    }
        
                    if( error.response.data.email ) {
                        self.error.email = error.response.data.email[0];
                        self.input.email = '';
                    }
        
                    if( error.response.data.password ) {
                        self.error.password = error.response.data.password[0];
                        self.input.password = '';
                    }
                } else {
                    // Something happened in setting up the request that triggered an Error
                    u.clog('Error: ' + error.message + '@user.vue - login()');
                }
            }
        },

        // --------------------------------------------------------------

        register: function() {
            u.clog('register()');
            this.error.name = '';
            this.error.email = '';
            this.error.password = '';
            this.error.passwordConfirmation = '';

            const inputNameInvalid = this.isNameInvalid();
            const inputEmailInvalid = this.isEmailInvalid();
            const inputPasswordInvalid = this.isPasswordInvalid();
            const inputPasswordConfirmationInvalid = this.isPasswordConfirmationInvalid();
            if( inputNameInvalid 
                    || inputPasswordInvalid 
                    || inputPasswordInvalid 
                    || inputPasswordConfirmationInvalid
            ) return;

            http.post( '/api/v1/register', {
                'name': this.input.name,
                'email': this.input.email,
                'password': this.input.password,
                'password_confirmation': this.input.passwordConfirmation,
            }, 
                this.successLogin(this), 
                this.failedLogin(this)
            );
        },

        // -----------------------------------------------------

        logout: function() {
            u.clog('logout()');
            sessionStorage.removeItem('token');
            localStorage.removeItem('token');

            this.$store.commit('logout');
            this.$route.router.go('/');
        },

        // -----------------------------------------------------

        sendPasswordMail: function() {
            u.clog('sendPasswordMail()');
            this.error.email = '';

            const inputEmailInvalid = this.isEmailInvalid();
            if(inputEmailInvalid) return;

            http.post('/api/v1/password/email', {
                'email': this.input.email
            }, 
                this.successSendPasswordMail(this), 
                this.failedSendPasswordMail(this)
            );
        },

        successSendPasswordMail: self => {
            return response => {
                u.clog('success sent reset password mail');
                self.passwordMailResult = 'success';
            }
        },

        failedSendPasswordMail: self => {
            return error => {
                u.clog('error sent reset password mail');
                self.passwordMailResult = 'failed';
            }
        },

        // -----------------------------------------------------

        passwordReset: function() {
            u.clog('passwordReset()');
            this.error.email = '';
            this.error.password = '';
            this.error.passwordConfirmation = '';

            const inputEmailInvalid = this.isEmailInvalid();
            const inputPasswordInvalid = this.isPasswordInvalid();
            const inputPasswordConfirmationInvalid = this.isPasswordConfirmationInvalid();
            if( inputEmailInvalid 
                    || inputPasswordInvalid 
                    || inputPasswordConfirmationInvalid
            ) return;

            const tmp = this.$route.path.replace('/password/reset/', '').split('?');
            const token = tmp[0];
            u.clog('token: ' + token);

            http.post( '/api/v1/password/reset', {
                'email': this.input.email,
                'password': this.input.password,
                'password_confirmation': this.input.passwordConfirmation,
                'token': token,
            }, 
                this.successPasswordReset(this), 
                this.failedPasswordReset(this)
            );
        },

        successPasswordReset: self => {
            return response => {
                u.clog('success reset password');
                self.passwordResetResult = 'success';
            }
        },

        failedPasswordReset: self => {
            return error => {
                u.clog('error reset password');
                self.passwordResetResult = 'failed';
            }
        },

        // -----------------------------------------------------

        execPutSettings: function() {
            this.error.name = '';
            u.clog('execPutSettings()');

            const inputNameInvalid = this.isNameInvalid();
            if( inputNameInvalid ) return;

            const uri = '/api/v1/me/settings';

            return new Promise( (resolve,reject) => {
                http.post( uri, {
                    'name': this.input.name,
                    '_method': 'PUT',
                    }, response => {
                        u.clog('execPutSettings().then() status: ' + response.status);
                        switch(response.status) {
                            case 200:
                                resolve(response);
                                break;

                            case 202:
                                u.clog('token refreshed and try to access again');
                                this.execPutSettings().then( r => resolve(r) ).catch( e => reject(e) );
                                break;

                            default:
                                u.clog('ERROR execPutSettings(): ' + response.status);
                                throw Error(response)
                        }
                    }, error => {
                        u.clog('execPutSettings().catch()');
                        reject(error);
                    }
                );
            });
        },

        // -----------------------------------------------------

        execPutPasswordChange: function() {
            this.error.oldPassword = '',
            this.error.newPassword = '',
            this.error.newPasswordConfirmation = '',
            u.clog('execPutPassword()');

            // temp
//            const inputNameInvalid = this.isNameInvalid();
//            if( inputNameInvalid ) return;

            const uri = '/api/v1/me/password';

            return new Promise( (resolve,reject) => {
                http.post( uri, {
                    'old_password': this.input.oldPassword,
                    'new_password': this.input.newPassword,
                    'new_password_confirmation': this.input.newPasswordConfirmation,
                    '_method': 'PUT',
                    }, response => {
                        u.clog('execPutPassword().then() status: ' + response.status);
                        switch(response.status) {
                            case 200:
                                resolve(response);
                                break;

                            case 202:
                                u.clog('token refreshed and try to access again');
                                this.execPutPasswordChange().then( r => resolve(r) ).catch( e => reject(e) );
                                break;

                            default:
                                u.clog('ERROR execPutPassword(): ' + response.status);
                                throw Error(response)
                        }
                    }, error => {
                        u.clog('execPutPassword().catch()');
                        reject(error);
                    }
                );
            });
        },

        // --------------------------------------------------------------

        clearPasswordFields: function() {
            this.input.oldPassword = '';
            this.input.newPassword = '';
            this.input.newPasswordConfirmation = '';
        },
    }
}
