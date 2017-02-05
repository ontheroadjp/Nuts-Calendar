export default {
    deep: true,
    update: function () {
        console.log('v-focus update!');
        var object = this.el;
        Vue.nextTick(function() {
            object.focus();
        });
    }
}
