<template>
<span class="text-input">
    <input :class="['text-input', { 'has-error': showError && hasError }, inputClass]" 
        :style="inputStyle"
        type="text" 
        :placeholder="placeholder"
        v-model="input.value" 
        @keyup="onKeyup"/>    

    <div class="status">
        <span v-show="showError && hasError" class="error-message">
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
        errorMessage:  { type: String, default: 'Error' },
        initialValue:  { type: String, default: '' },
        minTextLength: { type: Number, default: 5 },
        maxTextLength: { type: Number, default: 15 }
    },

    data() {
        return {
            input: {
                value: ''
            }
        }
    },

    computed: {
        hasError: function() {
            return (this.input.value.length > this.maxTextLength)
            || (this.input.value.length < this.minTextLength);
        }
    },

    methods: {
        onKeyup: function() {
            const isReady = !this.hasError && this.input.value !== this.initialValue;
            if( isReady ) {
                this.$emit('readyValue', this.input.value);
            } else {
                this.$emit('readyValue', "");
            }
            this.$emit('hasError', this.hasError);
            this.$emit('ready', isReady);
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
</style>
