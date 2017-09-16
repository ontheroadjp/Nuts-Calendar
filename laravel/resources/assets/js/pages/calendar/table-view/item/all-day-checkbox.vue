<template>
    <span class="all-day-checkbox">
        <label>
            <input 
                :class="['all-day-input', {'disabled': disabled}]" 
                type="checkbox" 
                v-model="input" 
                @change="onChange"
                :disabled="disabled"
            />
            <span class="all-day-parts">All day</span>
        </label>
    </span>
</template>

<script>
export default {
    props: {
        initialValue: { type: [Boolean, Number], required: true },
        disabled:     { type: Boolean, default: false }
    },

    data() {
        return {
            initial: '',
            input: ''
        }
    },

    computed: {
        isReadyResult: function() {
            return this.initial != this.input;
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
.all-day-input {
    display: none;
}

.all-day-parts {
    position: relative;
    margin-right: 20px;
    padding-left: 20px;
    font-size: 0.8em;
}

.all-day-parts::before {
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

.all-day-input:checked + .all-day-parts {
    color: #546e7a;
}

.all-day-input:checked + .all-day-parts::after {
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

.all-day-input.disabled + .all-day-parts,
.all-day-input.disabled + .all-day-parts::before,
.all-day-input.disabled + .all-day-parts::after {
    color: rgba(190, 190, 190, 1);
}
</style>
