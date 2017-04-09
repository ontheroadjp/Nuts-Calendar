<template>
<div class="wrapper">
    <div class="container" style="width: 100%; height: 100vh">
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
                        placeholder="{{ emailHasError ? error.email : 'E-Mail Address' }}"
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
                        placeholder="{{ passwordHasError ? error.password : 'Password' }}"
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
                    class="button" 
                    :class="theme.secondary.class"
                    style="width: 100%" 
                    @click.prevent="login()"
                >Login</button>
            </p>

        </form>
        </div><!-- // .box -->
    
    </div><!-- // .column is-x -->
    </div><!-- // .columns -->
    </div><!-- // .container -->
</div><!-- // .wrapper -->
</template>

<script>
    import userApi from '../../services/user.js';

    export default {
        mixins: [
            userApi,
        ],

        data() {
            return {
                hasError: false,
                isRunning: false,
            }
        },

        computed : {
            theme : function() {
                return this.$store.state.app.theme;
            }
        },

    }
</script>
