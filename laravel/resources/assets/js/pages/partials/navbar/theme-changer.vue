<template>
    <span class="field nav-item">
        <p class="control is-expanded">
        <span class="select is-fullwidth">
            <select 
                :style="selectStyle" 
                v-model="selectedTheme" 
                @change="setTheme()"
                style="border: none"
            >
                <option 
                    v-for="theme in themes" 
                    value="{{ theme.value }}"
                >{{ theme.text }}</option>
            </select>
        </span>
        </p>
    </span>
</template>

<script>
export default {
    data() {
        const self = this;
        return {
            thmes: [
                { value: "koiai", text: "koiai" },
                { value: "nadeshiko", text: "nadeshiko" },
                { value: "mikan", text: "mikan" },
                { value: "sumire", text: "sumire" },
                { value: "moegi", text: "moegi" },
            ],
            selectedTheme: '',
        }
    },

    computed: {
        theme: function() {
            return this.$store.state.app.theme;
        },
        selectStyle: function() {
            return {
                background: 'none',
                color: this.theme.primary.codeInvert,
            }
        }
    },

    methods: {
        setTheme: function() {
            u.clog('changeTheme: ' + this.selectedTheme);
            localStorage.setItem('theme', this.selectedTheme);
            this.$store.commit('setTheme', this.selectedTheme);
        }
    },

    ready() {
        this.selectedTheme = this.$store.state.app.theme.name;
    }
}
</script>
