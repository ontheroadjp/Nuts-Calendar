<template>
<span class="text-input">
    <input :class="[
            'text-input', 
            inputClass,
            { 'has-error': showError && errorResult }, 
            { 'disabled': disabled }
        ]" 
        :style="inputStyle"
        type="text" 
        :placeholder="placeholder"
        v-model="input.value" 
        @keyup="onKeyup"
        :disabled="disabled" />    

    <div class="status">
        <span v-show="showError && errorResult" class="error-message">
            {{ errorMessage }}
        </span>

        <span v-show="showCount" class="char-length">
            {{ input.value.length }}
        </span>
    </div>
</span>
</template>

<script>
export default {
    props: {
        placeholder:   { type: String, default: 'text input' },
        inputClass:    { type: String, default: '' },
        inputStyle:    { type: String, default: '' },
        showError:     { type: Boolean, default: false },
        showCount:     { type: Boolean, default: false },
        initialValue:  { type: String, default: '' },
        minTextLength: { type: Number, default: 0 },
        maxTextLength: { type: Number, default: 20 },
        disabled:      { type: Boolean, default: false }
    },

    data() {
        return {
            input: {
                value: ''
            }
        }
    },

    computed: {
        errorResult: function() {
            return (this.input.value.length > this.maxTextLength)
            || (this.input.value.length < this.minTextLength);
        },

        errorMessage: function() {
            if( this.input.value.length < this.minTextLength ) {
                return "Title must be more than " + this.minTextLength + " charactor(s)";
            }
            if( this.input.value.length > this.maxTextLength ) {
                return "Title must be less than " + this.maxTextLength + " charactors";
            }

            return "Error";
        }
    },

    methods: {
        onKeyup: function() {
            const isReady = !this.errorResult && (this.input.value !== this.initialValue);

            const data = {
                initialValue: this.initialValue,
                inputValue: this.input.value,
                error: this.errorResult,
                isReady: isReady
            }

            this.$emit('changeValue', data);
        }
    },

    mounted() {
        this.input.value = this.initialValue;
    }
} 
</script>

<style lang="scss" scoped>
.text-input {
    width: 100%;
    font-size: 1.2em;
    border: none;
    outline: none;
    line-height: 2rem;
    font-weight: 100;

    &:focus {
        border-bottom: 1px solid #d2d2d2;
    }
}

.has-error {
    color: red
}

.status {
    display: flex;

    & .char-length {
        font-size: 0.8em;
    }

    & .error-message {
        font-size: 0.8em;
        color: red;
    }
} 

.disabled {
    color: rgba(190, 190, 190, 1);
}
</style>
