<template>
    <div 
        class="modal is-active" 
        v-show="isActive" 
        transition="nuts-modal-fade"
    >
        <div class="modal-background"></div>
            <div class="card" style="width: 70%;">
            
                <slot></slot>
                
                <footer class="card-footer">
                    <slot name="footer"></slot>
                    <a 
                        slot="footer" 
                        class="card-footer-item" 
                        @click="isActive = false"
                    >Close</a>
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
            ok_label: {
                type: String,
                default: 'Save changes'
            },
            cancel_label: {
                type: String,
                default: 'Cancel'
            },
            listen: {
                type: String,
                default: name
            }
        },

        data() {
            return {
                isActive: false
            }
        },

        created() {
            const self = this;
            this.$root.$on(this.listen, function() {
                console.log('$on@NutsModal: ' + this.listen);
                self.isActive = true;
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
