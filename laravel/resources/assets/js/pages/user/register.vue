<template>
<div class="wrapper">
<div class="container" style="width: 100%; height: 100vh">
<div class="columns">
<div class="column is-offset-3 is-6">

    <div class="box" style="padding:60px; width:100%; margin-top:120px;">
    <form>

        <div class="control is-horizontal">
            <p class="control has-icon">
                <input 
                    class="nuts-input-textbox" 
                    type="text" 
                    :placeholder="nameHasError ? errors.name : 'Name'"
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
                    class="nuts-input-textbox" 
                    type="email" 
                    :placeholder="emailHasError ? errors.email : 'E-Mail Address'"
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
                    class="nuts-input-textbox" 
                    type="password" 
                    :placeholder="passwordHasError ? errors.password : 'Password'"
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
                    class="nuts-input-textbox" 
                    type="password" 
                    :placeholder="passwordConfirmationHasError ? errors.passwordConfirmation : 'Password ( Confirm )'"
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
                <router-link to="/login">Login Form</router-link>
            </a>
        </p>

        <div class="is-clearfix" style="margin-bottom: 25px"></div>

        <p style="text-align: center;">
            <button 
                type="submit"
                :class="['button', theme.secondary.class]"
                style="width: 100%; color: #fff" 
                @click.prevent="register()"
            >Register</button>
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
            userApi
        ],

        computed : {
            theme : function() {
                return this.$store.state.app.theme;
            }
        },
    }
</script>

<style>
</style>
