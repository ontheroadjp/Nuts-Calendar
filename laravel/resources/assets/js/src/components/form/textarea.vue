<template>
<span>
    <textarea
        :class="['input-textarea', 'textarea', 'thin', { hasError: errorResult }]"
        style="box-shadow: none;"
        v-model="input"
        :placeholder="t('item.' + placeholder)"
        @keyup="onKeyup"
        :disabled="disabled"
    ></textarea>
    <span v-if="showError && errorResult" style="color:red">Error</span>
    <span v-if="showCount"><small>({{ textLength }} / {{ maxTextLength }})</small></span>
</span>
</template>

<script>
import core from '../../mixins/core.js';

export default {
    mixins: [ core ],

    props: {
        initialValue:  { type: String, default: '' },
        placeholder:   { type: String, default: '' },
        minTextLength: { type: Number, default: 0 },
        maxTextLength: { type: Number, default: 20 },
        showError:     { type: Boolean, default: false },
        showCount:     { type: Boolean, default: false },
        disabled:      { type: Boolean, default: false }
    },

    data() {
        return {
            input: ''
        }
    },

    computed: {
        textLength: function() {
            if( this.input == '' || this.input == null) return 0;
            return this.input.length;
        },

        errorResult: function() {
            if( this.input == '' || typeof this.input === 'object' ) {
                return this.minTextLength !== 0;
            }

            return this.input.length > this.maxTextLength ||
                    this.input.length < this.minTextLength;
        },

        isReadyResult: function() {
            return this.input !== this.initialValue;
        }
    },

    methods: {
        onKeyup: function() {
            const data = {
                value: this.input,
                hasError: this.errorResult,
                isReady: this.isReadyResult
            }

            this.$emit('changeValue', data);
        }
    },

    mounted() {
        this.input = this.initialValue;
    }
}
</script>

<style lang="scss" scoped>
.input-textarea {
    height: 270px;
    width: 100%;
    padding: .4rem;
    border: 1px solid #d2d2d2;
    border-radius: 0;
    outline: none;
    resize: none;
    font-size: 1rem;
}

.hasError {
    border-color: red;
}
</style>
