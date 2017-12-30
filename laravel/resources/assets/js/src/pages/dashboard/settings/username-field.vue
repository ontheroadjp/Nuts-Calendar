<template>
<form>
    <div class="field has-addons">
        <p class="control">
            <input
                class="input"
                type="text"
                :placeholder="nameHasError ? error.name : ''"
                v-model="input.name"
            >
        </p>
        <p class="control">
            <button
                v-show="! isNameChanged && ! isLoading"
                class="button"
                :class="theme.secondary.class"
                disabled
            >{{ t('userSettingsGeneral.save') }}</button>

            <button
                v-show="isNameChanged && ! isLoading"
                type="submit"
                class="button"
                :class="theme.secondary.class"
                @click.prevent="putSettings"
                >{{ t('userSettingsGeneral.save') }}</button>

            <button
                v-show="isLoading"
                class="button"
                :class="theme.primary.class"
                disabled
            ><i class="fa fa-refresh fa-spin"></i></button>
        </p>
    </div>
</form>
</template>

<script>
    import core from '../../../mixins/core.js';
    import userApi from '../../../services/user.js';
//    import accountResultMessage from '../../../components/message.vue';

    export default {
//        components: {
//            'account-result-message': accountResultMessage
//        },

        mixins: [
            core, userApi
        ],

        data() {
            return {
                isLoading: false,
                accountResult: {
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

            isNameChanged: function() {
                return this.input.name !== this.$store.state.user.name
                    && this.input.name !== '';
            }
        },

        methods: {
            putSettings: function() {
                this.isLoading = true;

                const self = this;
                this.execPutSettings()
                    .then(response => {
                        u.clog('success');
                        self.$store.commit('username', response.data.user.name);
                        this.resultAccountSettings('saved!', 'green');
                    })
                    .catch(error => {
                        u.clog('failed');
                        this.input.name = this.$store.state.user.name;
                        this.resultAccountSettings('error', 'red');
                    });
            },

            resultAccountSettings: function(message, color) {
                this.isLoading = false;
                this.accountResult.message = message;
                this.accountResult.color = color;
                this.accountResult.isShow = true;
                if(! this.accountResult.isImportant) {
                    setTimeout( () => this.accountResult.isShow = false, 1500);
                }
            }
        },

        mounted() {
            const self = this;
            if(! this.$store.state.app.ready ) {
                eventBus.listen('nuts.app.ready', function() {
                    self.input.name = self.$store.state.user.data.name;
                }, 'AccountSettings.vue');
            } else {
                self.input.name = self.$store.state.user.data.name;
            }
        }
    }
</script>
