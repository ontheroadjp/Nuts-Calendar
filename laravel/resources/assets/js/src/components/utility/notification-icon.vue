<template>
<span>
    <i v-if="type === 'info'"
        :class="['fa', 'fa-info-circle', 'fa-' + size + 'x']"></i>

    <i v-else-if="type === 'success'"
        :class="['fa', 'fa-check-circle', 'fa-' + size + 'x']"></i>

    <i v-else-if="type === 'warning'"
        :class="['fa', 'fa-exclamation-circle', 'fa-' + size + 'x']"></i>

    <i v-else-if="type === 'danger' || type === 'failed'"
        :class="['fa', 'fa-exclamation-triangle', 'fa-' + size + 'x']"></i>
</span>
</template>

<script>
export default {
    props: {
        type: { type: String, required: true, validator: function(value) {
             const expectation = [
                 'success', 'info', 'warning', 'danger', 'failed'
             ];
             return expectation.indexOf(value) > -1;
        }},

        size: { type: Number, default: 1 }
    }
};
</script>
