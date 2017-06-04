import { mapState, mapGetters } from 'vuex';

export default {
    computed : {
        ...mapState({
            theme: state => state.app.theme,
            lang: state => state.app.lang,
            i18n: state => state.i18n
        }),

        ...mapGetters({
            t: 'i18nText'
        })
    }
}
