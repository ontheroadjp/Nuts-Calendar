<template>
<table style="width:100%">
<tr>
    <td @mouseenter="input.isEnter = true"
        @mouseleave="input.isEnter = false">

        <input 
            :id="id"
            class="inline-text-input" 
            :class="inputClass"
            type="text" 
            style="margin-bottom: 0; width: 95%"
            :style="inputStyle"
            :placeholder="placeholder"
            autocomplete="off"
            v-model.trim="input.value"
            @focus="focused(true)"
            @blur="focused(false)"
            @keyup="changeValue()"
        >
    </td>

    <td style="width: 120px; vertical-align: middle"
        @mouseenter="button.isEnter = true"
        @mouseleave="button.isEnter = false">

        <span v-if="notSaved">
            <div class="icon">
                <i class="fa fa-exclamation-circle"></i>
            </div>
            Not saved
        </span>

        <span else>
            <a class="button" 
                v-show="isButtonShow" 
                style="border:none; background:none; height:1rem; margin-top: 5px;"
                @click="clickUndo()"
                :disabled="defaultValue == input.value"
            ><i class="fa fa-undo"></i></a>
        
            <a class="button" 
                v-show="isButtonShow"
                style="border:none; background:none; height:1rem; margin-top: 5px;"
                @click="clickSave()"
                :disabled="defaultValue == input.value"
            ><i class="fa fa-floppy-o"></i></a>
        </span>

    </td>
</tr>
</table>
</template>

<script>
export default {
    props: {
        id:             { type: String,   default: '', required: false },
        inputClass:     { type: String,   default: '', required: false },
        inputColor:     { type: String,   default: '', required: false },
        placeholder:    { type: String,   default: '', required: false },
        defaultValue:   { type: String,   default: '', required: false },
        model:          { type: String,   required: true },
        saveCallback:   { type: Function, required: true }
    },

    data() {
        return {
            input: {
                isEnter: false,
                isFocused: false,
                isEditing: false,
                value: ''
            },
            button: {
                isEnter: false
            }
        }
    },

    computed: {
        inputStyle: function() {
            if(this.inputColor == '') return '';

            return {
                color: this.inputColor
            }
        },

        isButtonShow: function() {
            return ( this.input.isEnter 
                        || ( this.button.isEnter && this.defaultValue != this.input.value )
                        || this.input.isFocused || this.input.isEditing
                    ) && !this.notSaved;
        },

        notSaved: function() {
            return this.defaultValue != this.input.value && !this.input.isFocused && !this.button.isEnter;
        }
    },

    methods: {
        focused: function(val) {
            this.input.isFocused = val;
            if(val) {
                this.input.isEditing = true;
            } else {
                if(this.defaultValue == this.input.value) {
                    this.input.isEditing = false;
                }

                if(this.input.value == '') {
                    this.input.value = this.defaultValue;
                }
            }
        },

        syncProps() {
            this.$emit('update:model', this.input.value)
        },

        changeValue: function() {
            this.syncProps();
        },

        clickSave: function() {
            this.saveCallback();
            this.input.isEditing = false;
        },

        clickUndo: function() {
            this.input.value = this.defaultValue;
            this.syncProps();
            this.input.isEditing = false;
        }

    },

    mounted() {
        this.input.value = this.defaultValue;
    }
}
</script>

<style lang="scss" scoped>
.inline-text-input {
    background: none;
    border: none;
    box-shadow: none;
    outline: none;
}
</style>
