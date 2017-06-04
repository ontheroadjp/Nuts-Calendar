const now = new Date();

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
    },

    calendar: {
        isLoading: false,
        currentId: 'dashboard',
        currentYear: now.getFullYear(),
        currentMonth: ('0' + (now.getMonth() + 1)).slice(-2),
        data: {
            userCalendars: [],
            calendars: [],
            members: []
        }
    }
}
