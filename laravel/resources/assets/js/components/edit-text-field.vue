<template>
    <span v-if="!isEditing" @click="clickField">
        <p class="field" style="font-size: 1.2rem">
            <span class="icon" style="margin-right: 10px">
                <i class="fa fa-tasks"></i>
            </span>{{ value }}
        </p>
    </span>
    <span v-else>
        <input class="field input" :name="name" type="text" v-model="input.value" v-focus> 
        <button
            class="button"
            @click="clickSave"
            :disabled="isLoading || input.value === value"
            >
                <i v-if="!isLoading" class="fa fa-floppy-o"></i>
                <i v-else class="fa fa-refresh fa-spin"></i>
        </button> 
        <button
            v-show="!isLoading"
            class="button"
            @click="clickCancel"
            :disabled="isLoading"
            ><i class="fa fa-close"></i>
        </button> 
    </span>
</template>

<script>
import { focus } from '../directives/focus.js';
export default {
    directives: {
        focus
    },

    data() {
        return {
            isEditing: false,
            input: {
                value: ""
            }
        }
    },

    props: [
        'name', 'value', 'action', 'isLoading'
    ],

    computed: {
    },

    methods: {
        clickField() {
            this.isEditing = !this.isEditing;
        },

        clickSave() {
            this.action({ value: this.input.value });
        },

        clickCancel() {
            this.input.value = this.value;
            this.isEditing = !this.isEditing;
        }
    },

    mounted: function() {
        this.input.value = this.value;
    }
}
</script>

<style lang="scss" scoped>
.field {
    margin-bottom: 20px;
    height: 2.25rem;
    line-height: 2.25rem;
}
.input {
    width: 80%;
    padding: 0;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid blue;
    box-shadow: none;
}
</style>
