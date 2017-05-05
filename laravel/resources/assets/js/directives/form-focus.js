export default {
    deep: true,
    update: function() {
        u.clog('v-focus update!');
        const el = this.el;
        Vue.nextTick(() => el.focus());
    }
}
