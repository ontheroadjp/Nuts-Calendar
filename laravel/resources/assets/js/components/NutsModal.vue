<template>
    <div 
        class="modal is-active" 
        v-show="isActive" 
        transition="nuts-modal-fade"
    >
        <div class="modal-background"></div>
            <div class="card" style="width: 70%;">
            
                <slot></slot>
                
                <footer v-show="is_close_btn" class="card-footer">
                    <slot name="footer"></slot>
                    <a 
                        slot="footer" 
                        class="card-footer-item" 
                        @click="isActive = false"
                    >{{ close_btn_label }}</a>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
    Vue.transition('nuts-modal-fade', {
        beforeEnter: function (el) {
            event = this.name + '-opened';
            this.$root.$emit(event);
            console.log('$emit@NutsModal - ' + this.name + '-opened()');
        },

        afterLeave: function (el) {
            event = this.name + '-closed';
            this.$root.$emit(event);
            console.log('$emit@NutsModal - ' + this.name + '-closed()');
        },
    })

    export default {

        props: {
            name: {
                type: String,
                default: 'nuts-modal',
                required: true
            },
            is_close_btn: {
                type: Boolean,
                default: true
            },
            close_btn_label: {
                type: String,
                default: 'Close'
            },
        },

        computed: {
            open_event: function() {
                return 'open-' + this.name
            },
            close_event: function() {
                return 'close-' + this.name
            }
        },

        data() {
            return {
                isActive: false
            }
        },

        created() {
            const self = this;

            this.$root.$on(this.open_event, function() {
                console.log('$on@NutsModal: ' + this.open_event);
                self.isActive = true;
            });

            this.$root.$on(this.close_event, function() {
                console.log('$on@NutsModal: ' + this.close_event);
                self.isActive = false;
            });
        }
    }
</script>

<style>
    .nuts-modal-fade-transition {
        transition: all .4s ease;
    }
    .nuts-modal-fade-enter {
        opacity: 0;
    }
    .nuts-modal-fade-leave {
        opacity: 0;
    }
</style>
