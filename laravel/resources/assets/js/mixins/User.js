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
            return this.errors.passwordConfirmation && ! this.input.passwordConfirmation 
                ? true : false;
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

            const reg = /^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/;
            if( ! this.input.email.match(reg) ) {
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
                const m = 'The password confirmation field is required.';
                this.errors.passwordConfirmation = m;
                return true;
            }
            if( this.input.passwordConfirmation !== this.input.password ) {
                const m = 'This field must be the same as the password field.';
                this.errors.passwordConfirmation = m;
                this.input.passwordConfirmation = '';
                return true;
            }
            return false;
        },

        // --------------------------------------------------------------

        login: function() {
            u.clog('login()');
            this.errors.authentication = '';
            this.errors.email = '';
            this.errors.password = '';

            const inputEmailInvalid = this.isEmailInvalid();
            const inputPasswordInvalid = this.isPasswordInvalid();
            if( inputEmailInvalid || inputPasswordInvalid) return;

            const self = this;

            const url = '/api/v1/login';
            const params = {
                'email': this.input.email,
                'password': this.input.password,
            };

            http.post( url, params, 
                this.successLogin(this),
                this.failedLogin(this)
            );
        },

        successLogin: self => {
            return response => {
                self.$route.router.go('/dashboard');
                const token = response.data.token;
                const username = response.data.user.name;
                self.$store.commit('login', response.data);
    
                if( self.input.rememberMe  ) {
                    localStorage.setItem('rememberMe', token);
                } else {
                    localStorage.clear();
                }
    
                //self.$route.router.go('/dashboard');
                self.$route.router.redirect('/dashboard');
            }
        },

        failedLogin: self => {
            return error => { 
                if( error.response.status === 401 || error.response.status === 500) {
                    const m = 'Email address or Password is incorrect.';
                    this.errors.authentication = m;
                }
    
                if( error.response.status === 429) {
                    const m = 'Too many login attempts. Try it again after ';
                    const min = error.response.data.retryAfter.minuts;
                    this.errors.authentication = m + min + ' minuts.';
                }
    
                if( error.response.data.email ) {
                    this.errors.email = error.response.data.email[0];
                    this.input.email = '';
                }
    
                if( error.response.data.password ) {
                    this.errors.password = error.response.data.password[0];
                    this.input.password = '';
                }
            }
        },

        // --------------------------------------------------------------

        register: function() {
            u.clog('register()');
            this.errors.name = '';
            this.errors.email = '';
            this.errors.password = '';
            this.errors.passwordConfirmation = '';

            const inputNameInvalid = this.isNameInvalid();
            const inputEmailInvalid = this.isEmailInvalid();
            const inputPasswordInvalid = this.isPasswordInvalid();
            const inputPasswordConfirmationInvalid = this.isPasswordConfirmationInvalid();
            if( inputNameInvalid 
                    || inputPasswordInvalid 
                    || inputPasswordInvalid 
                    || inputPasswordConfirmationInvalid
            ) return;

            const self = this;
            const url = '/api/v1/register';
            const params = {
                'name': this.input.name,
                'email': this.input.email,
                'password': this.input.password,
                'password_confirmation': this.input.passwordConfirmation,
            };

            http.post(url, params, 
                this.successLogin(this), 
                this.failedLogin(this)
            );
        },

        // -----------------------------------------------------

        logout: function() {
            u.clog('logout()');
            sessionStorage.clear();
            localStorage.clear();

            this.$store.commit('logout');
            this.$route.router.go('/');
        },

        // -----------------------------------------------------

        sendPasswordMail: function() {
            u.clog('sendPasswordMail()');
            this.errors.email = '';

            const inputEmailInvalid = this.isEmailInvalid();
            if(inputEmailInvalid) return;

            const self = this;
            const url = '/api/v1/password/email';
            const params = {
                'email': this.input.email
            };

            http.post( url, params, 
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
            this.errors.email = '';
            this.errors.password = '';
            this.errors.passwordConfirmation = '';

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

            const self = this;
            const url = '/api/v1/password/reset';
            const params = {
                'email': this.input.email,
                'password': this.input.password,
                'password_confirmation': this.input.passwordConfirmation,
                'token': token,
            };

            http.post( url, params, 
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

        putSettings: function() {
            this.errors.name = '';
            u.clog('putSettings()');

            const inputNameInvalid = this.isNameInvalid();
            if( inputNameInvalid ) return;

            const self = this;
            const url = '/api/v1/me/settings';
            const params = {
                'name': this.input.name,
                '_method': 'PUT',
            };
            
            http.post( url, params,
                this.successPutSettings(this),
                this.failedPutSettings(this)
            );
        },

        successPutSettings: self => {
            return response => {
                u.clog('success: putSettings()');
            }
        },

        failedPutSettings: self => {
            return error => {
                u.clog('error: putSettings()');
            }
        },

    }
}

