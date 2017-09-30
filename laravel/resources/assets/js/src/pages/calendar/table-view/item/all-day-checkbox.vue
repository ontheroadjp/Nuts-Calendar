<template>
    <label>
        <input 
            :class="['input-checkbox', {'disabled': disabled}]" 
            type="checkbox" 
            v-model="input" 
            @change="onChange"
            :disabled="disabled"
        />
        <span class="input-checkbox-parts">{{ label }}</span>
    </label>
</template>

<script>
export default {
    props: {
        label:        { type: String, default: 'Check' },
        initialValue: { type: [Boolean, Number], required: true },
        disabled:     { type: Boolean, default: false }
    },

    data() {
        return {
            input: ''
        }
    },

    computed: {
        isReadyResult: function() {
            return this.initialValue != this.input;
        }
    },

    methods: {
        onChange: function() {
            const data = {
                value: this.input,
                error: false,
                isReady: this.isReadyResult
            }

            this.$emit('changeValue', data);
        }
    },

    mounted() {
        if( typeof this.initialValue === 'number' ) {
            this.initialValue > 0 ? this.input = true : this.input = false;
        } else {
            this.input = this.initialValue;
        }
    }
}    
</script>

<style lang="scss" scoped>
.input-checkbox {
    display: none;
}

.input-checkbox-parts {
    position: relative;
    margin-right: 20px;
    padding-left: 20px;
    font-size: 0.8em;

    &::before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 15px;
        height: 15px;
        border: 1px solid #999;
        border-radius: 4px;
    }
}


.input-checkbox:checked + .input-checkbox-parts {
    color: #546e7a;
}

.input-checkbox:checked + .input-checkbox-parts::after {
    content: "";
    display: block;
    position: absolute;
    top: -3px;
    left: 5px;
    width: 7px;
    height: 14px;
    transform: rotate(40deg);
    border-bottom: 3px solid #41b883;
    border-right: 3px solid #41b883;
}

.input-checkbox.disabled + .input-checkbox-parts,
.input-checkbox.disabled + .input-checkbox-parts::before,
.input-checkbox.disabled + .input-checkbox-parts::after {
    color: rgba(190, 190, 190, 1);
}
</style>
