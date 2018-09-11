<template>
<div>
    <img src="images/nuts-logo-big.png" />
    <div class="box" style="padding: 80px 80px 50px 80px">
        <!--
        <div class="box" style="padding: 60px; width: 100%; margin-top: 120px;">
        -->
        <form>

            <div class="control is-horizontal">
                <p class="control has-icon">
                    <input
                        class="nuts-input-textbox-with-icon"
                        type="email"
                        :placeholder="emailHasError ? error.email : t('login.email')"
                        style="margin-bottom: 2rem;"
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
                        class="nuts-input-textbox-with-icon"
                        type="password"
                        :placeholder="passwordHasError ? error.password : t('login.password')"
                        style="margin-bottom: 3rem;"
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

            <div class="is-clearfix" style="margin-bottom: 5rem"></div>

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
</div>
</template>

<script>
import core from '../../../mixins/core.js';
import userApi from '../../../services/user.js';
export default {
    mixins: [ core, userApi ],

    methods: {
        login: function() {
            u.clog('login()');
            this.error.authentication = '';
            this.error.email = '';
            this.error.password = '';

            const inputEmailInvalid = this.isEmailInvalid();
            const inputPasswordInvalid = this.isPasswordInvalid();
            if( inputEmailInvalid || inputPasswordInvalid) return;

            const url = 'http://localhost:8080/api/v1/login';
            const data = {
                'email': this.input.email,
                'password': this.input.password
            }

            http.fetchPost(url, data)
                .then(response => {
                    this.$emit('update:success', response);
                }).catch(error => {
                    this.$emit('update:failed', error);
                });
        }
    }
};
</script>
