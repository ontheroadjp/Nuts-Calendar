// -----------------------------------------------------------------------
// getters

export default {
    newColumnKey: (state, getters) => {

        let keys = Object.keys(state.calendar.data.members);

        keys.map(function(key) {
            return parseInt(key);
        });

        return Math.max.apply(null, keys) + 1;
    }
}
