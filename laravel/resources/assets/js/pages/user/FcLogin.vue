<template>
<div class="container" style="width: 100%; height: 100vh">
<div class="row">
<div class="col-md-8 col-md-offset-2">

    <div class="panel" v-show="errors.authentication" style="
        position: absolute;
        top: 70px;
        width: 100%;
        text-align: center;
        color: red;
    ">
        <p style="margin-bottom: 20px;">{{ errors.authentication }}</p>
        <!--
        <p v-show="errors.email">{{ errors.email }}</p>
        <p v-show="errors.password">{{ errors.password }}</p>
        -->
    </div>

    <div class="panel" style="margin-top: 120px">
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

            <div class="control is-horizontal">
                <p class="control has-icon">
                    <input 
                        class="nuts-input-textbox is-medium" 
                        type="password" 
                        placeholder="{{ passwordHasError ? errors.password : 'Password' }}"
                        style="margin-bottom: 20px;"
                        v-model="input.password"
                    >
                    <span class="icon" :style="[passwordHasError ? style.error : '']">
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
                <label for="remember_me">Remember me</label>
            </p>

            <p class="control is-horizontal is-pulled-right">
                <a 
                    class="btn btn-link" 
                    v-link="{path: '/password/email'}"
                >Forgot Your Password?</a>
            </p>

            <div class="is-clearfix" style="margin-bottom: 25px"></div>

            <p style="text-align: center;">
                <button 
                    type="submit"
                    class="button is-nuts-primary is-large" 
                    style="width: 25%" 
                    @click.prevent="login()"
                >Login</button>
            </p>

            </form>

        </div>
    </div><!-- // .panel -->

</div><!-- // .col-x -->
</div><!-- // .row -->
</div><!-- // .container -->
</template>

<script>
    import userMixin from '../../mixins/User.js';
    export default {
        mixins: [
            userMixin,
        ],

        data() {
            return {
                'hasError': false,
            }
        }
    }
</script>

<style>
</style>
