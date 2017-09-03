<template>
<table style="width:100%">
<tr>
    <td @mouseenter="input.isEnter = true"
        @mouseleave="input.isEnter = false">

        <input 
            :id="inputId"
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
            @change="changeValue()"
        >
    </td>

    <td style="width: 120px; vertical-align: middle"
        @mouseenter="button.isEnter = true"
        @mouseleave="button.isEnter = false">

        <span v-if="notSaved">
            <i class="fa fa-exclamation-circle" 
                style="margin-top:4px"></i>
            Not saved
        </span>

        <a :id="undoButtonId" 
            v-show="isButtonShow && !isLoading" 
            class="button" 
            style="border:none; background:none; height:1rem; margin-top: 5px;"
            :style="iconStyle"
            @click="clickUndo()"
            :disabled="defaultValue == input.value"
        ><i class="fa fa-undo"></i></a>
    
        <a :id="saveButtonId"
            v-show="isButtonShow && !isLoading"
            class="button" 
            style="border:none; background:none; height:1rem; margin-top: 5px;"
            :style="iconStyle"
            @click="clickSave()"
            :disabled="defaultValue == input.value"
        ><i class="fa fa-floppy-o"></i></a>

        <div class="icon is-small">
            <i v-if="isLoading 
                        && !input.isFocused 
                        && !input.isEnter 
                        && defaultValue != input.value
                    "
                class="fa fa-refresh fa-spin"></i>
        </div>

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
        iconColor:      { type: String,   default: '', required: false },
        placeholder:    { type: String,   default: '', required: false },
        defaultValue:   { type: String,   default: '', required: false },
        isLoading:      { type: Boolean,  default: false },
        syncValue:      { type: String,   required: true },
        saveCallback:   { type: Function, required: true }
    },

    data() {
        return {
            input: {
                isEnter: false,
                isFocused: false,
//                isEditing: false,
                value: ''
            },
            button: {
                isEnter: false
            }
        }
    },

    computed: {
        inputId: function() {
            if(this.id === '') return '';
            return 'input-' + this.id;
        },

        saveButtonId: function() {
            if(this.id === '') return '';
            return 'save-button-' + this.id;
        },

        undoButtonId: function() {
            if(this.id === '') return '';
            return 'undo-button-' + this.id;
        },

        inputStyle: function() {
            if(this.inputColor == '') return '';

            return {
                color: this.inputColor
            }
        },

        iconStyle: function() {
            if(this.iconColor == '') return '';

            return {
                color: this.iconColor
            }
        },

        isButtonShow: function() {
//            return ( this.input.isEnter 
//                        || ( this.button.isEnter && this.defaultValue != this.input.value )
//                        || this.input.isFocused || this.isEditing
//                    ) && !this.notSaved;
            return ( this.input.isEnter 
                        || ( this.button.isEnter && this.defaultValue != this.input.value )
                        || this.input.isFocused || this.isLoading
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
//                this.isEditing = true;
            } else {
                if(this.defaultValue == this.input.value) {
//                    this.isEditing = false;
                }

                if(this.input.value == '') {
                    this.input.value = this.defaultValue;
                }
            }
        },

        syncProps() {
            this.$emit('update:syncValue', this.input.value)
        },

        changeValue: function() {
            this.syncProps();
        },

        clickSave: function() {
            this.saveCallback();
        },

        clickUndo: function() {
            this.input.value = this.defaultValue;
            this.syncProps();
//            this.isEditing = false;
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
