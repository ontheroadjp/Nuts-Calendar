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
            nutsHub.fire(event, 'NutsModal.vue');
        },

        afterLeave: function (el) {
            event = this.name + '-closed';
            nutsHub.fire(event, 'NutsModal.vue');
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

            nutsHub.listen(this.defaultOpenEventName, function() {
                self.isActive = true;
            }, 'NutsModal.vue');

            nutsHub.listen(this.defaultCloseEventName, function() {
                self.isActive = false;
            }, 'NutsModal.vue');
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
