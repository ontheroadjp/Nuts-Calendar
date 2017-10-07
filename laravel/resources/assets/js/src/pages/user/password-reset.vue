<template>
<div id="password-reset" class="container" style="width: 100%; height: 100vh">
<div class="wrapper">

    <result-view
        v-if="passwordResetResult !== ''"
        :status="passwordResetResult"
    ></result-view>

    <div v-else class="columns">
    <div class="column is-offset-3 is-6">
    <div class="box" style="padding: 60px; width: 100%; margin-top: 120px;">
        <form>
            <div class="control is-horizontal">
                <p class="control has-icon">
                    <input
                        id="input-email"
                        class="nuts-input-textbox is-medium"
                        type="email"
                        :placeholder="emailHasError ? errors.email : 'E-Mail Address'"
                        style="margin-bottom: 25px;"
                        v-model="input.email"
                        v-focus
                    >
                    <span class="icon" :style="[emailHasError ? style.error : '']">
                        <i class="fa fa-envelope"></i>
                    </span>
                </p>
            </div>

            <div class="control is-horizontal">
                <p class="control has-icon">
                    <input
                        id="input-password"
                        class="nuts-input-textbox is-medium"
                        type="password"
                        :placeholder="passwordHasError ? errors.password : 'New Password'"
                        style="margin-bottom: 20px;"
                        v-model="input.password"
                    >
                    <span class="icon" :style="[passwordHasError ? style.error : '']">
                        <i class="fa fa-lock"></i>
                    </span>
                </p>
            </div>

            <div class="control is-horizontal">
                <p class="control has-icon">
                    <input
                        id="input-password-confirmation"
                        class="nuts-input-textbox is-medium"
                        type="password"
                        :placeholder="passwordConfirmationHasError ? errors.passwordConfirmation : 'New Password ( Confirm )'"
                        style="margin-bottom: 20px;"
                        v-model="input.passwordConfirmation"
                    >
                    <span class="icon" :style="[passwordConfirmationHasError ? style.error : '']">
                        <i class="fa fa-lock"></i>
                    </span>
                </p>
            </div>

            <p style="text-align: center;">
                <button
                    type="submit"
                    :class="['button', 'thin', theme.secondary.class]"
                    style="width: 100%; color: #fff"
                    @click.prevent="passwordReset()"
                >
                    <span class="icon is-small">
                        <i class="fa fa-btn fa-refresh"></i>
                    </span>
                    <span>Reset Password</span>
                </button>
            </p>
        </form>
    </div><!-- // .box -->
    </div><!-- // .column is-x -->
    </div><!-- v-else // .columns -->

</div><!-- // .wrapper -->
</div><!-- // .container -->
</template>

<script>
import { mapState } from 'vuex';
import resultView from './password-reset-result.vue';
import userApi from '../../services/user.js';

export default {
    components: { resultView },

    mixins: [ userApi ],

    data() {
        return {
            passwordResetResult: ''
        }
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme
        })
    }
}
</script>
