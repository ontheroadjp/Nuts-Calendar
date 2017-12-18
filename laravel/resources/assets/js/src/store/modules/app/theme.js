export default {
    namespaced: true,

    state: {
        name: '',
        background: '',
        primary: {
            class: '',
            classInvert: '',
            code: '',
            codeInvert: ''
        },
        secondary: {
            class: '',
            classInvert: '',
            code: '',
            codeInvert: ''
        },
        accent: {
            code: ''
        }
    },

    actions: {
        setTheme( { commit }, { name } ) {
            commit('setTheme', { name });
        }
    },

    mutations: {
        setTheme( state, { name }) {
            localStorage.setItem('theme', name);
            state.name = name;
            switch (name) {
                case 'ruri':
    //                state.background = '#f0f0f1';
                    state.primary.class = 'is-ruri';
                    state.primary.classInvert = 'is-ruri-invert';
                    state.primary.code = '#1e50a2';
                    state.primary.codeInvert = '#164a84';

                    state.secondary.class = 'is-ruri-secondary';
                    state.secondary.classInvert = 'is-ruri-invert';
                    state.secondary.code = '#fff';
                    state.secondary.codeInvert = '';

                    state.accent.code = '';
                    break;

                case 'koiai':
    //                state.background = '#f0f0f1';
                    state.primary.class = 'is-koiai';
                    state.primary.classInvert = 'is-koiai-invert';
                    state.primary.code = '#002e4e';
                    state.primary.codeInvert = '#b0bfc8';

                    state.secondary.class = 'is-koiai-secondary';
                    state.secondary.classInvert = 'is-koiai-secondary-invert';
                    state.secondary.code = '#1960b7';
                    state.secondary.codeInvert = '';

                    state.accent.code = '';
                    break;

                case 'nadeshiko':
    //                state.background = '#f0f0f1';
                    state.primary.class = 'is-nadeshiko';
                    state.primary.classInvert = 'is-nadeshiko-invert';
                    state.primary.code = '#f6adc6';
                    state.primary.codeInvert = '#49343b';

                    state.secondary.class = 'is-nadeshiko-secondary';
                    state.secondary.classInvert = 'is-nadeshiko-secondary-invert';
                    state.secondary.code = '#ee6896';
                    state.secondary.codeInvert = '';

                    state.app.theme.accent.code = '';
                    break;

                case 'mikan':
    //                state.background = '#f0f0f1';
                    state.primary.class = 'is-mikan';
                    state.primary.classInvert = 'is-mikan-invert';
                    state.primary.code = '#f08300';
                    state.primary.codeInvert = '#fbdab3';

                    state.secondary.class = 'is-mikan-secondary';
                    state.secondary.classInvert = 'is-mikan-secondary-invert';
                    state.secondary.code = '#ffc112';
                    state.secondary.codeInvert = '';

                    state.accent.code = '';
                    break;

                case 'sumire':
    //                state.background = '#f0f0f1';
                    state.app.theme.primary.class = 'is-sumire';
                    state.app.theme.primary.classInvert = 'is-sumire-invert';
                    state.app.theme.primary.code = '#7058a3';
                    state.app.theme.primary.codeInvert = '#cfc7e0';

                    state.app.theme.secondary.class = 'is-sumire-secondary';
                    state.app.theme.secondary.classInvert = 'is-sumire-secondary-invert';
                    state.app.theme.secondary.code = '#b688ff';
                    state.app.theme.secondary.codeInvert = '';

                    state.app.theme.accent.code = '';
                    break;

                case 'moegi':
    //                state.background = '#f0f0f1';
                    state.primary.class = 'is-moegi';
                    state.primary.classInvert = 'is-moegi-invert';
                    state.primary.code = '#aacf53';
                    state.primary.codeInvert = '';

                    state.secondary.class = 'is-moegi-secondary';
                    state.secondary.classInvert = 'is-moegi-secondary-invert';
                    state.secondary.code = '#37af05';
                    state.secondary.codeInvert = '';

                    state.accent.code = '';
                    break;
            }
        }
    }
};
