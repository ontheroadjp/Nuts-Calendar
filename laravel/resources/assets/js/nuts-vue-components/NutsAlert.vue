<template>
    <div v-show="isActive" transition="fade" class="notification {{ level }}">
        <button v-show="isImportant" class="delete" @click="close"></button>
        {{ message }}
    </div> 
</template>

<script>
    export default {
        data() {
            return {
                message: 'This is a Nuts Alert Box !!',
                level: '',
                isImportant: false,
                isActive: false
            }
        },

        methods: {
            close() {
                this.isActive = false;
                this.message = '';
                this.level = '';
            },
        },

        created() {
            const self = this;
            this.$root.$on('nuts-alert', function(message, level = '', isImportant = false) {
                self.message = message;
                self.level = level;
                self.isImportant = isImportant;
                self.isActive = true;
                if(!isImportant) {
                    setTimeout(
                        function() { 
                            self.close();
                        }, 3000
                    );
                }
            });
        }
    }
</script>

<style>
    .fade-transition {
        transition: all .4s ease;
        position: fixed;
        top: 10%;
        left: 20%;
        right: 20%;
        z-index: 99999;
    }
    .fade-enter {
        opacity: 0;
    }
    .fade-leave {
        opacity: 0;
    }
</style>
