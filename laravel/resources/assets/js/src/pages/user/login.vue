<template>
<div class="wrapper">
    <div id="sign-in" class="container" style="width: 100%; height: 100vh">
    <div class="columns">
    <div class="column is-offset-3 is-6">

        <div class="panel" v-show="error.authentication" style="
            position: absolute;
            top: 70px;
            width: 100%;
            text-align: center;
            color: red;
        ">
            <p style="margin-bottom: 20px;">{{ error.authentication }}</p>
        </div>

        <div class="box" style="padding: 60px; width: 100%; margin-top: 120px;">
        <form>

            <div class="control is-horizontal">
                <p class="control has-icon">
                    <input
                        class="nuts-input-textbox"
                        type="email"
                        :placeholder="emailHasError ? error.email : t('login.email')"
                        style="margin-bottom: 25px;"
                        v-model="input.email"
                        v-focus
                    >
                    <span class="icon is-small" :style="[emailHasError ? style.error : '']">
                        <i class="fa fa-envelope"></i>
                    </span>
                </p>
            </div>

            <div class="control is-horizontal">
                <p class="control has-icon">
                    <input
                        class="nuts-input-textbox"
                        type="password"
                        :placeholder="passwordHasError ? error.password : t('login.password')"
                        style="margin-bottom: 20px;"
                        v-model="input.password"
                    >
                    <span class="icon is-small" :style="[passwordHasError ? style.error : '']">
                        <i class="fa fa-lock"></i>
                    </span>
                </p>
            </div>

            <p class="control is-horizontal is-pulled-left">
                <input
                    id="remember_me"
                    class="nuts-input-checkbox"
                    type="checkbox"
                    v-model="input.rememberMe"
                >
                <label id="remember-me" for="remember_me">{{ t('login.rememberMe') }}</label>
            </p>

            <p class="control is-horizontal is-pulled-right">
                <a id="forgot-your-password-link" class="btn btn-link">
                    <router-link to="/password/email">
                        {{ t('login.forgotYourPassword') }}
                    </router-link>
                </a>
            </p>

            <div class="is-clearfix" style="margin-bottom: 25px"></div>

            <p style="text-align: center;">
                <button
                    id="sign-in-button"
                    type="submit"
                    :class="['button', theme.secondary.class]"
                    style="width: 100%; color: #fff"
                    @click.prevent="login()"
                >{{ t('login.login') }}</button>
            </p>

        </form>
        </div><!-- // .box -->

    </div><!-- // .column is-x -->
    </div><!-- // .columns -->
    </div><!-- // .container -->
</div><!-- // .wrapper -->
</template>

<script>
import core from '../../mixins/core.js';
import userApi from '../../services/user.js';

export default {
    mixins: [
        core, userApi
    ],

    data() {
        return {
            hasError: false,
            isRunning: false
        }
    },

    methods: {
        login: function() {
            u.clog('login()');
            this.error.authentication = '';
            this.error.email = '';
            this.error.password = '';

            const inputEmailInvalid = this.isEmailInvalid();
            const inputPasswordInvalid = this.isPasswordInvalid();
            if( inputEmailInvalid || inputPasswordInvalid) return;

            http.post( 'http://localhost:8080/api/v1/login', {
                'email': this.input.email,
                'password': this.input.password
            },
                this.successLogin(this),
                this.failedLogin(this)
            );
        },

        successLogin: self => {
            console.log('success!!!!!!!!!!!!!');
            return;
            return response => {
                eventBus.fire('nuts.login.success', {
                    response: response,
                    rememberMe: jwtToken.rememberMe
                }, 'user.js');
            };
        },

        failedLogin: self => {
            console.log('failed!!!!!!!!!!!!!');
            return error => {
                if (error.response) {
                    if( error.response.status === 422 || error.response.status === 500) {
                        self.$store.commit('notifyDanger', {
                            content: 'We couldn\'t verify your credentials.',
                            isImportant: false
                        });
//                        const m = 'We couldn\'t verify your credentials.';
//                        self.error.authentication = m;
                    }

                    if( error.response.status === 429) {
                        self.$store.commit('notifyDanger', {
                            content: 'Too many login attempts. Try it again after ',
                            isImportant: true
                        });
//                        const m = 'Too many login attempts. Try it again after ';
//                        const min = error.response.data.retryAfter.minuts;
//                        self.error.authentication = m + min + ' minuts.';
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
            };
        },

    }
}
</script>
