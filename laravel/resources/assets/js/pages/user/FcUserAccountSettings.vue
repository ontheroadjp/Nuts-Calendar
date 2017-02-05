<template>
<div class="container" style="width: 100%; height: 100vh">
<div class="row">
<div class="col-md-8 col-md-offset-2">

    <div class="panel" style="margin-top: 120px;">
        <p class="panel-heading">General</p>
        <!-- <div class="panel-block"> -->
        <div style="
            padding: 60px;
            width: 100%;
        ">

            <div class="control is-horizontal">
                <p class="control has-icon">
                    <input 
                        class="nuts-input-textbox is-medium" 
                        type="text" 
                        placeholder="{{ nameHasError ? errors.name : 'Name' }}"
                        style="margin-bottom: 25px;"
                        v-model="input.name"
                        v-focus
                    >
                    <span class="icon" :style="[namelHasError ? style.error : '']">
                        <i class="fa fa-user"></i>
                    </span>
                </p>
            </div>

            <p style="text-align: center;">
                <button 
                    v-show="isNameChanged"
                    class="button is-nuts-primary is-large" 
                    style="width: 25%" 
                    @click="putSettings"
                >Save</button>
                <button 
                    v-show="! isNameChanged" 
                    class="button is-nuts-primary is-large" 
                    style="width: 25%" 
                    disabled
                >Save</button>
            </p>

        </div>

    </div><!-- // .panel -->

</div><!-- // .col-x -->
</div><!-- // .row -->



<div class="row">
<div class="col-md-8 col-md-offset-2">

    <div class="panel">
        <p class="panel-heading">Change Password</p>
        <div style="
            padding: 60px;
            width: 100%;
        ">
            <div class="control is-horizontal">
                <p class="control has-icon">
                    <input 
                        class="nuts-input-textbox is-medium" 
                        type="password" 
                        placeholder="{{ oldPasswordHasError ? errors.oldPassword : 'Old Password' }}"
                        style="margin-bottom: 20px;"
                        v-model="oldPassword"
                    >
                    <span class="icon" :style="[oldPasswordHasError ? style.error : '']">
                        <i class="fa fa-lock"></i>
                    </span>
                </p>
            </div>

            <div class="control is-horizontal">
                <p class="control has-icon">
                    <input 
                        class="nuts-input-textbox is-medium" 
                        type="password" 
                        placeholder="{{ newPasswordHasError ? errors.newPassword : 'New Password' }}"
                        style="margin-bottom: 20px;"
                        v-model="newPassword"
                    >
                    <span class="icon" :style="[newPasswordHasError ? style.error : '']">
                        <i class="fa fa-lock"></i>
                    </span>
                </p>
            </div>

            <div class="control is-horizontal">
                <p class="control has-icon">
                    <input 
                        class="nuts-input-textbox is-medium" 
                        type="password" 
                        placeholder="{{ newPasswordConfirmeHasError ? errors.newPasswordConfirme : 'New Password ( Confirme )' }}"
                        style="margin-bottom: 20px;"
                        v-model="newPasswordConfirm"
                    >
                    <span class="icon" :style="[newPasswordConfirmeHasError ? style.error : '']">
                        <i class="fa fa-lock"></i>
                    </span>
                </p>
            </div>

            <p style="text-align: center;">
                <button 
                    v-show="isChangePasswordReady"
                    class="button is-nuts-primary is-large" 
                    style="width: 50%" 
                    @click=""
                >Change Password</button>
                <button 
                    v-show="! isChangePasswordReady"
                    class="button is-nuts-primary is-large" 
                    style="width: 50%" 
                    disabled
                >Change Password</button>
            </p>

        </div>
    </div><!-- // .panel -->

</div><!-- // .col-x -->
</div><!-- // .row -->
</div><!-- // .container -->
</template>

<script>
    import userMixin from '../../mixins/User.js';
    import focus from '../../directives/NutsFocus.js';
    export default {

        mixins: [
            userMixin,
        ],
    
        directives: {
            focus
        },

        data() {
            return {
//                name: '',
                oldPassword: '',
                newPassword: '',
                newPasswordConfirm: ''
            }
        },

        computed: {
            isNameChanged: function() {
                if(this.input.name !== this.$store.state.user.name && this.input.name !== '') {
                    return true;
                } else {
                    return false;
                }
            },

            isChangePasswordReady: function() {
                if( this.oldPassword && this.newPassword && this.newPasswordConfirm ) {
                    return true;
                } else {
                    return false;
                }
            }

        },

        ready() {
            this.input.name = this.$store.state.user.name;
        }

    }
</script>

<style>
    
</style>
