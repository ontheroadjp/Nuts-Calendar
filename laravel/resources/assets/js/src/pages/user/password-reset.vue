<template>
<div id="password-reset" class="container" style="width: 100%; height: 100vh">
<div class="row">
<div class="col-md-8 col-md-offset-2">
    <result-view
        v-if="passwordResetResult !== ''"
        :status="passwordResetResult"
    ></result-view>

    <div class="panel" style="margin-top: 120px;" v-else>
        <div style="
            padding: 60px;
            width: 100%;
        ">

            <form>

            <div class="control is-horizontal">
                <p class="control has-icon">
                    <input
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
                    class="button is-nuts-primary is-large"
                    style="width: 50%"
                    @click.prevent="passwordReset()"
                ><i class="fa fa-btn fa-refresh"></i> Reset Password</button>
            </p>

            </form>

        </div>
    </div><!-- // .panel -->
</div><!-- // .col-x -->
</div><!-- // .row -->
</div><!-- // .container -->
</template>

<script>
import resultView from './password-reset-result.vue';
import userApi from '../../services/user.js';

export default {
    components: {
        resultView: resultView
    },

    mixins: [
        userApi
    ]
}
</script>
