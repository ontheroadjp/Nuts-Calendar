<template>
    <!-- <button class="btn btn-primary" @click="fire">
         <slot></slot>
    </button> -->
    <a class="button is-primary is-outlined" @click="fire">
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
