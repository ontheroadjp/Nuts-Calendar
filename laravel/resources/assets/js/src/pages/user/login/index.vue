<template>
<div class="wrapper">
    <div id="sign-in" class="container" style="width: 100%; height: 100vh">
    <div class="columns">
    <div class="column is-offset-3 is-6">

<!--
        <div class="panel" v-show="hasError" style="
            position: absolute;
            top: 70px;
            width: 50%;
            text-align: center;
            color: red;
        ">
            <p style="margin-bottom: 20px;">{{ errorMessage }}</p>
        </div>
-->

        <login-panel
            @update:success="loginSuccess"
            @update:failed="loginFailed"
        ></login-panel>

    </div><!-- // .column is-x -->
    </div><!-- // .columns -->
    </div><!-- // .container -->
</div><!-- // .wrapper -->
</template>

<script>
import { NOTIFY_DANGER } from '../../../store/mutation-types.js';
import loginPanel from './login-panel.vue';

export default {
    components: { loginPanel },

//    data() {
//        return {
//            hasError: false,
//            errorMessage: ''
//        }
//    },

    methods: {
        loginSuccess: function(response) {
            eventBus.fire('nuts.login.success', {
                response: response,
                rememberMe: jwtToken.rememberMe
            }, 'login/index.vue');
        },

        loginFailed: function(error) {
            if( error.response.data.code === 422 || error.response.data.code === 500) {
                this.$store.commit(NOTIFY_DANGER, {
                    content: 'We couldn\'t verify your credentials.',
                    isImportant: true
                });
            }

            else if( error.response.data.code === 429) {
                this.$store.commit(NOTIFY_DANGER, {
                    content: 'Too many login attempts. Try it again later.',
                    isImportant: true
                });
                //const m = 'Too many login attempts. Try it again after ';
                //const min = error.response.data.retryAfter.minuts;
                //self.error.authentication = m + min + ' minuts.';
            }

//            this.hasError = true;
//            this.errorMessage = error.response.data.message;
            u.clog('Error: ' + error.response.data.message + ' @user.vue - login()');
        }
    }
};
</script>
