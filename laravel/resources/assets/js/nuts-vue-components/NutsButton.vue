<template>
    <a class="button is-info is-outlined" @click="fire">
         <slot></slot>
    </a>
</template>

<script>
    export default {
        props: {
            emit: {
                type: String,
                default: 'nuts-button'
            },
        },
        methods: {
            fire() {
                nutsHub.fire(this.emit);
            }
        }
    } 
</script>

<style>
    
</style>
