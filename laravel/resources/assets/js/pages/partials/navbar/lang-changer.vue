<template>
<div class="nav-item">
    <p class="control is-expanded">
        <span class="select is-fullwidth">
            <select 
                class="thin"
                style="border: none"
                :style="selectStyle" 
                v-model="selectedVal" 
                @change="setVal()"
                >
                <option v-for="lang in langs" :value="lang.value">
                    {{ lang.label }}
                </option>
            </select>
        </span>
    </p>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            langs: [
                { value: "en", label: 'English' },
                { value: "ja", label: 'Japanese' }
            ],
            selectedVal: ''
        }
    },

    computed: {
        ...mapState({
            lang: state => state.app.lang,
            theme: state => state.app.theme
        }),

        textEn: () => this.lang === 'en' ? 'English' : '英語',
        textJa: () => this.lang === 'en' ? '日本語' : 'Japanese',

        selectStyle: function() {
            return {
                background: 'none',
                color: this.theme.primary.codeInvert,
            }
        }
    },

    methods: {
        setVal: function() {
            u.clog('changeLang: ' + this.selectedVal);
            localStorage.setItem('lang', this.selectedVal);
            this.$store.commit('setLang', this.selectedVal);
        }
    },

    mounted() {
            this.selectedVal = this.lang;
    }
}
</script>
