<template>
    <div 
        class="modal is-active" 
        v-show="isActive" 
        transition="nuts-modal-fade"
    >
        <div class="modal-background"></div>
            
                <slot></slot>
                
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
            isCloseButton: {
                type: Boolean,
                default: true
            },
            closeButtonLabel: {
                type: String,
                default: 'Close'
            },
        },

        computed: {
            defaultOpenEventName: function() {
                return 'open-' + this.name
            },
            defaultCloseEventName: function() {
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

            this.$root.$on(this.defaultOpenEventName, function() {
                console.log('$on@NutsModal: ' + self.defaultOpenEventName);
                self.isActive = true;
            });

            this.$root.$on(this.defaultCloseEventName, function() {
                console.log('$on@NutsModal: ' + self.defaultCloseEventName);
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
