<template>
<div class="columns" style="padding: 0 30px">
<div class="column is-offset-2 is-8">
<!--    
    <p class="panel-heading">General settings
        <account-result-message 
            v-show="accountResult.isShow"
            transition="result-fade"
            :message="accountResult.message"
            :color="accountResult.color"
            :is-important="accountResult.isImportant"
            :is-show.sync="accountResult.isShow"
            class="is-pulled-right"
        ></account-result-message>
    </p>
-->    
    <form>
    <div class="box" style="padding: 60px; width: 100%;">

        <div class="field">
            <label class="label">Name</label>
            <p class="control has-icon" style="margin-bottom: 60px">
                <input 
                    class="nuts-input-textbox" 
                    type="text" 
                    :placeholder="nameHasError ? error.name : 'Name'"
                    style="margin-bottom: 25px;"
                    v-model="input.name"
                    v-focus
                >
                <span class="icon" :style="[nameHasError ? style.error : '']">
                    <i class="fa fa-user"></i>
                </span>
            </p>
        </div>

        <p style="text-align: center;">
            <button 
                v-show="! isNameChanged && ! isLoading" 
                class="button" 
                :class="theme.secondary.class" 
                style="width: 25%" 
                disabled
            >Save</button>
            <button 
                v-show="isNameChanged && ! isLoading"
                type="submit"
                class="button" 
                :class="theme.secondary.class" 
                style="width: 25%" 
                @click.prevent="putSettings"
                >Save</button>
            <button 
                v-show="isLoading" 
                class="button" 
                :class="theme.primary.class" 
                style="width: 25%" 
                disabled
            ><i class="fa fa-refresh fa-spin"></i></button>
        </p>

    </div><!-- // .box -->
    </form>

</div><!-- // .column is-xx -->
</div><!-- // .coluns -->
</template>

<script>
    import userApi from '../../../services/user.js';
    import accountResultMessage from '../../../components/message.vue';

    export default {
        components: {
            'account-result-message': accountResultMessage,
        },

        mixins: [
            userApi,
        ],
    
        data() {
            return {
                isLoading: false,
                accountResult: {
                    message: '',
                    color: '',
                    isImportant: false,
                    isShow: false,
                },
            }
        },

        computed: {
            theme: function() {
                return this.$store.state.app.theme;
            },

            isNameChanged: function() {
                return this.input.name !== this.$store.state.user.name 
                    && this.input.name !== '';
            },
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
            },
        },

        mounted() {
            const self = this;
            if(! this.$store.state.app.ready ) {
                eventBus.listen('nuts.app.ready', function() {
                    self.input.name = self.$store.state.user.name;
                }, 'AccountSettings.vue');
            } else {
                self.input.name = self.$store.state.user.name;
            }
        },

    }
</script>
