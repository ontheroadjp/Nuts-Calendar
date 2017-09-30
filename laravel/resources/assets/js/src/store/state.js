export default {
    app: {
        ready: false,
        lang: 'en',
        theme: {
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
        message: {
            notification: {
                isActive: false,
                isImportant: false,
                type: 'is-info',
                content: '',
                autoClose: 3000
            }
        }
    },

    user: {
        name: null,
        token: null,
        rememberMe: false
    }
};
