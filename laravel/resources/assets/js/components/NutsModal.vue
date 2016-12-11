<template id="nuts-modal">
    <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-content">
            <slot></slot>
        </div>
        <button class="modal-close"></button>
    </div>
</template>

<script>
    export default {
        name: "nuts-modal",
        props: ['val'],
        data: function() {
            return {
                isActive: false
            }
        },
        created() {
            const self = this;
            nutsBus.$on('member-add-modal', function() {
                console.log('member-add-modal');
                self.isActive = !this.isActive;
            });
        }
    }
</script>
