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
                codeInvert: '',
            },
            secondary: {
                class: '',
                classInvert: '',
                code: '',
                codeInvert: '',
            },
            accent: {
                code: '',
            },
        },
    },

    user: {
        name: null,
        token: null,
        rememberMe: false,
    },

    calendar: {
        currentId: 'dashboard',
        currentYear: now.getFullYear(),
        currentMonth: ("0" + (now.getMonth() + 1)).slice(-2),
        data: {
            userCalendars: [],
            calendars: [],
            members: [],
        },

        isLoading: false,

        behavior: {

            showColumns: [],
            isEventItemShow: true,
            isTaskItemShow: true,

            query: {
                search: '',
                internal: ''
            },

            toolPalette: {
                isActive: false,
            },

            column: {
                isInserting: false,
                isEditing: false,
                isDeleting: false,
                insertingColumnId: null,
                editingColumnId: null,
                deletingColumnId: null
            },

            item: {
                isInserting: false,
                isEditing: false,
                isDeleting: false,
                insertingCellTo: null,
                editingItem: null,
                deletingItem: null,
            }
        },
    }
}
