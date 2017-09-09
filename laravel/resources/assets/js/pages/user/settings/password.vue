<template>
<div class="columns" style="padding: 0 30px">
<div class="column is-offset-2 is-8">
<!--
    <p class="panel-heading">Change Password 
        <password-change-result-message 
            v-show="passwordChangeResult.isShow"
            transition="result-fade"
            :message="passwordChangeResult.message"
            :color="passwordChangeResult.color"
            :is-important="passwordChangeResult.isImportant"
            :is-show.sync="passwordChangeResult.isShow"
            class="is-pulled-right"
        ></password-change-result-message>
    </p>
-->

    <form>
    <div class="box" style="padding: 60px; width: 100%;">
        <div class="field">
            <label class="label">{{ t('userSettingsPasswordChange.currentPassword') }}</label>
            <p class="control has-icon" style="margin-bottom: 60px">
                <input 
                    class="nuts-input-textbox" 
                    type="password" 
                    :placeholder="oldPasswordHasError ? error.oldPassword : t('userSettingsPasswordChange.currentPassword')"
                    style="margin-bottom: 20px;"
                    v-model="input.oldPassword"
                    v-focus
                >
                <span class="icon" :style="[oldPasswordHasError ? style.error : '']">
                    <i class="fa fa-lock"></i>
                </span>
            </p>
        </div>

        <div class="field">
            <label class="label">{{ t('userSettingsPasswordChange.newPassword') }}</label>
            <p class="control has-icon" style="margin-bottom: 60px">
                <input 
                    class="nuts-input-textbox" 
                    type="password" 
                    :placeholder="newPasswordHasError ? error.newPassword : t('userSettingsPasswordChange.newPassword')"
                    style="margin-bottom: 20px;"
                    v-model="input.newPassword"
                >
                <span class="icon" :style="[newPasswordHasError ? style.error : '']">
                    <i class="fa fa-lock"></i>
                </span>
            </p>
        </div>

        <div class="field">
            <label class="label">{{ t('userSettingsPasswordChange.newPasswordConfirmation') }}</label>
            <p class="control has-icon" style="margin-bottom: 60px">
                <input 
                    class="nuts-input-textbox" 
                    type="password" 
                    :placeholder="newPasswordConfirmationHasError ? error.newPasswordConfirme : t('userSettingsPasswordChange.newPasswordConfirmation')"
                    style="margin-bottom: 20px;"
                    v-model="input.newPasswordConfirmation"
                >
                <span class="icon" :style="[newPasswordConfirmationHasError ? style.error : '']">
                    <i class="fa fa-lock"></i>
                </span>
            </p>
        </div>

        <p style="text-align: center;">
            <button 
                v-show="! isChangePasswordReady && ! isLoading"
                class="button" 
                :class="theme.secondary.class" 
                style="width: 50%" 
                disabled
                >{{ t('userSettingsPasswordChange.changePassword') }}</button>
            <button 
                v-show="isChangePasswordReady && ! isLoading"
                type="submit"
                class="button" 
                :class="theme.secondary.class" 
                style="width: 50%" 
                @click.prevent="putChangePassword()"
            >{{ t('userSettingsPasswordChange.changePassword') }}</button>
            <button 
                v-show="isLoading" 
                class="button" 
                :class="theme.secondary.class" 
                style="width: 25%" 
                disabled
            ><i class="fa fa-refresh fa-spin"></i></button>
        </p>

    </div><!-- // .box -->
    </form>
    
</div><!-- // .column is-x -->
</div><!-- // .columns -->
</template>

<script>
    import core from '../../../mixins/core.js';
    import userApi from '../../../services/user.js';
    import passwordChangeResultMessage from '../../../components/message.vue';

    export default {
        components: {
            'password-change-result-message': passwordChangeResultMessage
        },

        mixins: [
            core, userApi
        ],
    
        data() {
            return {
                isLoading: false,
//                doing: {
//                    passwordChange: false
//                },
                passwordChangeResult: {
                    message: '',
                    color: '',
                    isImportant: false,
                    isShow: false
                }
            }
        },

        computed: {
            theme: function() {
                return this.$store.state.app.theme;
            },

            isChangePasswordReady: function() {
                return this.input.oldPassword 
                    && this.input.newPassword 
                    && this.input.newPasswordConfirmation
                    && this.input.newPassword === this.input.newPasswordConfirmation;
            }
        },

        methods: {
            putChangePassword: function() {
                this.isLoading = true;

                this.execPutPasswordChange()
                    .then(response => {
                        u.clog('success')
                        this.resultPasswordChange('saved!', 'green');
                    })
                    .catch(error => {
                        u.clog('error');
                        this.resultPasswordChange('error', 'red');
                    });
            },

            resultPasswordChange: function (message, color) {
                this.isLoading = false;
                this.clearPasswordFields();
                this.passwordChangeResult.message = message;
                this.passwordChangeResult.color = color;
                this.passwordChangeResult.isShow = true;
                if(! this.passwordChangeResult.isImportant) {
                    setTimeout( () => this.passwordChangeResult.isShow = false, 1500);
                }
            }
        }
    }
</script>
