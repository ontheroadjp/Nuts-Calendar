export default {

    created() {
        const self = this;
        this.$root.$on('nuts-select-main-menu', function(index) {
            console.log('mixin: nuts-select-main-menu');
            if( index == 0 ) {
                self.mainMenuCalendar();
            } else if( index == 1 ) {
                self.mainMenuAddEvent();
            } else if( index == 99 ) {
                self.mainMenuSettings();
            }
        });
    }
}
