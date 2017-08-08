<template>
    <span v-if="!isEditing" @click="clickField">
        <span v-if="value" class="field">{{ value }}</span>
        <span v-else class="field">not set</span>
    </span>
    <span v-else>
        <div class="select">
            <select v-model="input.hour">
                <option v-for="h in hours">{{ h }}</option>
            </select>
        </div>

        <span style="font-size: 1.4rem; margin: 0 10px;">:</span>

        <div class="select">
            <select v-model="input.minut">
                <option v-for="m in minuts">{{ m }}</option>
            </select>
        </div>

        <button
            v-show="!isLoading"
            class="button"
            @click="clickCancel"
            :disabled="isLoading"
            ><i class="fa fa-close"></i>
        </button> 

        <button
            class="button"
            @click="clickSave"
            :disabled="isLoading || input.value === value"
            >
                <i v-if="!isLoading" class="fa fa-floppy-o"></i>
                <i v-else class="fa fa-refresh fa-spin"></i>
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

            hours: [
                '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
                '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'
            ],

            minuts: [
                '00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'
            ],

            input: {
                hour: "",
                minut: "",
                value: {
                    hour: 0,
                    minut: 0
                }
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
            this.input.hour = this.input.value.hour;
            this.input.minut = this.input.value.minut;
            this.isEditing = !this.isEditing;
        }
    },

    mounted: function() {
        if( this.value ) {
            this.input.hour = this.value.split(':')[0];
            this.input.minut = this.value.split(':')[1];
            this.input.value.hour = this.value.split(':')[0];
            this.input.value.minut = this.value.split(':')[1];
        }
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
