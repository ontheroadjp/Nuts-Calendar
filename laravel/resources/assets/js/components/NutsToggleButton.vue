<template id="nuts-toggle-button">
        <a v-if="type == null || ''" href="#" @click="fire">
            {{ is_on ? on_label : off_label }}</a>

        <button v-if="type == 'btn-primary'" class="btn btn-primary" @click="fire">
            {{ is_on ? on_label : off_label }}</button>

        <button v-if="type == 'btn-success'" class="btn btn-success" @click="fire">
            {{ is_on ? on_label : off_label }}</button>

        <button v-if="type == 'btn-info'" class="btn btn-info" @click="fire">
            {{ is_on ? on_label : off_label }}</button>

        <button v-if="type == 'btn-warning'" class="btn btn-warning" @click="fire">
            {{ is_on ? on_label : off_label }}</button>

        <button v-if="type == 'btn-danger'" class="btn btn-danger" @click="fire">
            {{ is_on ? on_label : off_label }}</button>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: ''
            }, 
            on_label: {
                type: String,
                default: 'ON'
            }, 
            off_label: {
                type: String,
                default: 'OFF'
            },
            emit: {
                type: String,
                require
            }
        },
        data() {
            return {
                is_on: false
            }
        },
        methods: {
            fire() {
                nutsBus.$emit(this.emit, !this.is_on);
            },
            toggleState() {
                this.is_on = !this.is_on
            },
        },
        created() {
            const self = this;
            nutsBus.$on(this.emit, function() {
                console.log('$on@NutsToggleButton: ' + self.emit);
                self.toggleState();
            });
        },
    }
</script>
