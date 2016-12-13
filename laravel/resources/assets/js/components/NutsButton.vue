<template>
    <div class="form-group">
        <button class="btn btn-primary" @click="fire">
             <slot></slot>
        </button>
    </div>
</template>

<script>
    export default {
        props: {
            emit: {
                type: String,
                default: 'nuts-button'
            }
        },
        methods: {
            fire() {
                console.log(this.emit);
                this.$root.$emit(this.emit);
            }
        }
    } 
</script>

<style>
    
</style>
