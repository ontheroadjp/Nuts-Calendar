export default {
    methods: {

        alertSuccess( message, isImportant, from ) {
            nutsHub.fire(
                'auth-alert', 
                {
                    'message': message, 
                    'level': 'is-success',
                    'isImportant': isImportant
                },
                from
            );
        },

        alertDanger( message, isImportant, from ) {
            nutsHub.fire(
                'auth-alert', 
                {
                    'message': message, 
                    'level': 'is-danger',
                    'isImportant': isImportant
                },
                from
            );
        },

    }
}
