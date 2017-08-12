<template>
<span>
    <span v-if="!isEditing" @click="clickField">
        <span v-if="start" class="field" style="font-size: 1.2rem">{{ startTime }}</span>
        <a v-else class="button">SET</a>

        <span style="margin: 0 0.5rem">〜</span>

        <span v-if="end" class="field" style="font-size: 1.2rem">{{ endTime }}</span>
        <a v-else class="button">SET</a>
    </span>
    <span v-else>
        <div class="select">
            <select v-model="input.start.hour">
                <option v-for="h in hours">{{ h }}</option>
            </select>
        </div>

        <span style="font-size: 1.4rem; margin: 0 10px;">:</span>

        <div class="select">
            <select v-model="input.start.minut">
                <option v-for="m in minuts">{{ m }}</option>
            </select>
        </div>

        <span style="margin: 0 0.5rem">〜</span>

        <div class="select">
            <select v-model="input.end.hour">
                <option v-for="h in hours">{{ h }}</option>
            </select>
        </div>

        <span style="font-size: 1.4rem; margin: 0 10px;">:</span>

        <div class="select">
            <select v-model="input.end.minut">
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
            :disabled="isLoading 
                        || start.hour === input.start.hour 
                        && ( start.minut === input.start.minut 
                        && end.hour === input.end.hour 
                        && end.minut === input.end.minut )
                        "
            >
                <i v-if="!isLoading" class="fa fa-floppy-o"></i>
                <i v-else class="fa fa-refresh fa-spin"></i>
        </button> 
    </span>
</span>
</template>

<script>
import { focus } from '../directives/focus.js';
export default {
    directives: {
        focus
    },

    props: [
        'name', 'startTime', 'endTime', 'action', 'isLoading'
    ],

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

            start: {
                hour: "",
                minut: ""
            },

            end: {
                hour: "",
                minut: ""
            },

            input: {
                start: {
                    hour: "",
                    minut: ""
                },

                end: {
                    hour: "",
                    minut: ""
                }
            }
        }
    },

    methods: {
        clickField() {
            this.isEditing = !this.isEditing;
        },

        clickSave() {
//            this.action({ value: this.input.value });
            const sh = this.input.start.hour;
            const sm = this.input.start.minut;
            const eh = this.input.end.hour;
            const em = this.input.end.minut;
            this.action({ start: sh + ":" + sm, end: eh + ":" + em });
        },

        clickCancel() {
            this.input.start.hour = this.start.hour;
            this.input.start.minut = this.start.minut;
            this.input.end.hour = this.end.hour;
            this.input.end.minut = this.end.minut;
            this.isEditing = !this.isEditing;
        }
    },

    mounted: function() {
        if( this.startTime ) {
            this.start.hour = this.startTime.split(':')[0];
            this.start.minut = this.startTime.split(':')[1];
            this.input.start.hour = this.start.hour;
            this.input.start.minut = this.start.minut;
        }

        if( this.endTime ) {
            this.end.hour = this.endTime.split(':')[0];
            this.end.minut = this.endTime.split(':')[1];
            this.input.end.hour = this.end.hour;
            this.input.end.minut = this.end.minut;
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
