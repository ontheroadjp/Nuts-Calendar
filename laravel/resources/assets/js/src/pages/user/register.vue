<template>
<div class="wrapper">
<div id="user-registration" class="container" style="width: 100%; height: 100vh">
<div class="columns">
<div class="column is-offset-3 is-6">

    <div class="box" style="padding:60px; width:100%; margin-top:120px;">
    <form>

        <div class="control is-horizontal">
            <p class="control has-icon">
                <input
                    class="nuts-input-textbox-with-icon"
                    type="text"
                    :placeholder="nameHasError ? errors.name : t('register.name')"
                    style="margin-bottom: 25px;"
                    v-model="input.name"
                    v-focus
                >
                <span class="icon is-small" :style="[nameHasError ? style.error : '']">
                    <i class="fa fa-user"></i>
                </span>
            </p>
        </div>

        <div class="control is-horizontal">
            <p class="control has-icon">
                <input
                    class="nuts-input-textbox-with-icon"
                    type="email"
                    :placeholder="emailHasError ? errors.email : t('register.email')"
                    style="margin-bottom: 25px;"
                    v-model="input.email"
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
                    :placeholder="passwordHasError ? errors.password : t('register.password')"
                    style="margin-bottom: 20px;"
                    v-model="input.password"
                >
                <span class="icon is-small" :style="[passwordHasError ? style.error : '']">
                    <i class="fa fa-lock"></i>
                </span>
            </p>
        </div>

        <div class="control is-horizontal">
            <p class="control has-icon">
                <input
                    class="nuts-input-textbox-with-icon"
                    type="password"
                    :placeholder="passwordConfirmationHasError ? errors.passwordConfirmation : t('register.passwordConfirmation')"
                    style="margin-bottom: 20px;"
                    v-model="input.passwordConfirmation"
                >
                <span class="icon is-small" :style="[passwordConfirmationHasError ? style.error : '']">
                    <i class="fa fa-lock"></i>
                </span>
            </p>
        </div>

        <p class="control is-horizontal is-pulled-right">
            <a class="btn btn-link">
                <router-link to="/login">{{ t('register.loginForm') }}</router-link>
            </a>
        </p>

        <div class="is-clearfix" style="margin-bottom: 25px"></div>

        <p style="text-align: center;">
            <button
                type="submit"
                :class="['button', theme.secondary.class]"
                style="width: 100%; color: #fff"
                @click.prevent="register()"
            >{{ t('register.register') }}</button>
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

    methods: {
        register: function() {
            u.clog('register()');
            this.error.name = '';
            this.error.email = '';
            this.error.password = '';
            this.error.passwordConfirmation = '';

            const inputNameInvalid = this.isNameInvalid();
            //const inputEmailInvalid = this.isEmailInvalid();
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
                'password_confirmation': this.input.passwordConfirmation
            },
                this.successLogin(),
                this.failedLogin()
            );
        },

        successLogin: () => {
            console.log('success!!!!!!!!!!!!!');
            return response => {
                eventBus.fire('nuts.login.success', {
                    response: response,
                    rememberMe: jwtToken.rememberMe
                }, 'user.js');
            };
        },


    }
}
</script>
