<template>
<div class="wrapper">
<div id="password-mail" class="container" style="width: 100%; height: 100vh">

    <result-view
        v-if="passwordMailResult !== ''"
        :status="passwordMailResult"
    ></result-view>

    <div v-else class="columns">
    <div class="column is-offset-3 is-6">
    <div class="box" style="padding: 60px; width: 100%; margin-top: 120px;">
        <form>
            <p class="control has-icon">
                <input
                    class="nuts-input-textbox thin"
                    type="email"
                    :placeholder="emailHasError ? errors.email : t('passwordMail.email')"
                    style="margin-bottom: 25px;"
                    v-model="input.email"
                    v-focus
                >
                <span class="icon is-small"
                    :style="[emailHasError ? style.error : '']"
                ><i class="fa fa-envelope"></i>
                </span>
            </p>

            <router-link to="/login"
                class="is-pulled-right thin"
                style="margin-bottom: 25px;"
            >{{ t('passwordMail.loginForm') }}
            </router-link>

            <button
                type="submit"
                :class="['button', 'thin', theme.secondary.class]"
                style="width: 100%; color: #fff"
                @click.prevent="sendPasswordMail()"
            >
                <span class="icon is-small">
                    <i class="fa fa-btn fa-envelope"></i>
                </span>
                <span>
                    {{ t('passwordMail.sendPasswordResetLink') }}
                </span>
            </button>
        </form>
    </div><!-- // .box -->
    </div><!-- // .column is-x -->
    </div><!-- v-else // .columns -->

</div><!-- // .container -->
</div><!-- // .wrapper -->
</template>

<script>
//import http from 'axios';
import axios from 'axios';
import core from '../../mixins/core.js';
import resultView from './password-mail-result.vue';
import userApi from '../../services/user.js';

export default {
    components: { resultView },

    mixins: [ core, userApi ],

    data() {
        return {
            passwordMailResult: '',
        }
    },

    methods: {
        sendPasswordMail: function() {
            this.error.email = '';

//            const inputEmailInvalid = this.isEmailInvalid();
//            if(inputEmailInvalid) return;

            if(this.isEmailInvalid()) return;

            axios.post('/api/v1/password/email/send', {
                email: this.input.email
            })
            .then((response) => {
                this.passwordMailResult = 'success';
            })
            .catch((error) => {
                this.passwordMailResult = 'failed';
            })

//            http.post('/api/v1/password/email/send', {
//                'email': this.input.email
//            },
//                this.successSendPasswordMail(this),
//                this.failedSendPasswordMail(this)
//            );
        },

//        successSendPasswordMail: () => {
//            console.log('-------------- success ---------------');
//            return response => {
//                this.passwordMailResult = 'success';
//            };
//        },
//
//        failedSendPasswordMail: () => {
//            console.log('-------------- catch ---------------');
//            return error => {
//                this.passwordMailResult = 'failed';
//            };
//        }

//        successSendPasswordMail: self => {
//            return response => {
//                self.passwordMailResult = 'success';
//            };
//        },
//
//        failedSendPasswordMail: self => {
//            return error => {
//                self.passwordMailResult = 'failed';
//            };
//        }
    }
}
</script>
