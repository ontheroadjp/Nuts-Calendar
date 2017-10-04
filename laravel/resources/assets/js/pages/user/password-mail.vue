<template>
<div class="wrapper">
<<<<<<< Updated upstream:laravel/resources/assets/js/pages/user/password-mail.vue
<div class="container" style="width: 100%; height: 100vh">
<div class="columns">
<div class="column is-offset-3 is-6">
 
=======
<div id="password-mail" class="container" style="width: 100%; height: 100vh">

>>>>>>> Stashed changes:laravel/resources/assets/js/src/pages/user/password-mail.vue
    <result-view
        v-if="passwordMailResult !== ''"
        :status="passwordMailResult"
    ></result-view>

<<<<<<< Updated upstream:laravel/resources/assets/js/pages/user/password-mail.vue
    <div v-else class="box" style="padding: 60px; width: 100%; margin-top: 120px;">
    <form>

        <div class="control is-horizontal">
=======
    <div v-else class="columns">
    <div class="column is-offset-3 is-6">
    <div class="box" style="padding: 60px; width: 100%; margin-top: 120px;">
        <form>
>>>>>>> Stashed changes:laravel/resources/assets/js/src/pages/user/password-mail.vue
            <p class="control has-icon">
                <input 
                    class="nuts-input-textbox" 
                    type="email" 
                    :placeholder="emailHasError ? errors.email : t('passwordMail.email')"
                    style="margin-bottom: 25px;"
                    v-model="input.email"
                    v-focus
                >
                <span class="icon is-small" :style="[emailHasError ? style.error : '']">
                    <i class="fa fa-envelope"></i>
                </span>
            </p>
        </div>

        <div class="is-clearfix" style="margin-bottom: 25px"></div>

        <p class="control is-horizontal is-pulled-right">
            <a class="btn btn-link">
                <router-link to="/login">{{ t('passwordMail.loginForm') }}</router-link>
            </a>
        </p>

        <div class="is-clearfix" style="margin-bottom: 25px"></div>

        <p style="text-align: center;">
            <button 
                type="submit"
                :class="['button', theme.secondary.class]"
                style="width: 100%; color: #fff"
                @click.prevent="sendPasswordMail()"
            >
                <span class="icon is-small">
                    <i class="fa fa-btn fa-envelope"></i>
                </span><span>{{ t('passwordMail.sendPasswordResetLink') }}</span>
            </button>
<<<<<<< Updated upstream:laravel/resources/assets/js/pages/user/password-mail.vue
        </p>

    </form>
    </div><!-- // .box -->
=======
        </form>
    </div><!-- // .box -->
    </div><!-- // .column is-x -->
    </div><!-- v-else // .columns -->
>>>>>>> Stashed changes:laravel/resources/assets/js/src/pages/user/password-mail.vue

</div><!-- // .container -->
</div><!-- // .wrapper -->
</template>

<script>
import core from '../../mixins/core.js';
import resultView from './password-mail-result.vue';
import userApi from '../../services/user.js';

export default {
    components: {
        resultView: resultView
    },

    mixins: [
        core, userApi
    ],

//    computed : {
//        theme : function() {
//            return this.$store.state.app.theme;
//        }
//    }
}
</script>
