export default {
    deep: true,
    update: function () {
        u.clog('v-focus update!');
        var object = this.el;
        Vue.nextTick(function() {
            object.focus();
        });
    }
}
