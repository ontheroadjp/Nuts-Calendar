<template id="nuts-toggle-button">
        <a v-if="type == null || ''" href="#" @click="fire">
            {{ isOn ? onLabel : offLabel }}</a>

        <button v-if="type == 'button'" class="btn btn-primary" @click="fire">
            {{ isOn ? onLabel : offLabel }}</button>

</template>

<script>
    export default {

        props: {
            type: {
                type: String,
                default: null
            }, 
            onLabel: {
                type: String,
                default: 'ON'
            }, 
            offLabel: {
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
                isOn: false
            }
        },

        methods: {

            fire() {
                nutsHub.fire(this.emit, {state: !this.isOn}, 'NutsToggleButton.vue');
            },

            toggleState() {
                this.isOn = !this.isOn
            },
        },

        created() {
            const self = this;

            nutsHub.listen(this.emit, function() {
                self.toggleState();
            }, 'NutsToggleButton.vue');

        },
    }
</script>
