<template>
<div class="container" style="width: 100%; height: 100vh">
<div class="row">
<div class="col-md-8 col-md-offset-2">
 
    <result-view
        v-if="passwordMailResult !== ''"
        :status="passwordMailResult"
    ></result-view>

    <div class="panel" style="margin-top: 120px;" v-else>
        <!-- <p class="panel-heading">Login</p> -->
        <!-- <div class="panel-block"> -->
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
                        placeholder="{{ emailHasError ? errors.email : 'E-Mail Address' }}"
                        style="margin-bottom: 25px;"
                        v-model="input.email"
                        v-focus
                    >
                    <span class="icon" :style="[emailHasError ? style.error : '']">
                        <i class="fa fa-envelope"></i>
                    </span>
                </p>
            </div>

            <div class="is-clearfix" style="margin-bottom: 25px"></div>

            <p class="control is-horizontal is-pulled-right">
                <a 
                    class="btn btn-link" 
                    v-link="{path: '/login'}"
                >Login Form</a>
            </p>

            <div class="is-clearfix" style="margin-bottom: 25px"></div>

            <p style="text-align: center;">
                <button 
                    type="submit"
                    class="button is-nuts-primary is-large" 
                    style="width: 50%" 
                    @click.prevent="sendPasswordMail()"
                ><i class="fa fa-btn fa-envelope"></i> Send Password Reset Link</button>
            </p>

            </form>

        </div>
    </div><!-- // .panel -->

</div><!-- // .col-x -->
</div><!-- // .row -->
</div><!-- // .container -->
</template>

<script>
    import resultView from './FcPasswordMailResult.vue';
    import userMixin from '../../mixins/User.js';
    export default {
        components: {
            resultView: resultView,
        },

        mixins: [
            userMixin
        ],
    }
</script>

<style>
</style>
