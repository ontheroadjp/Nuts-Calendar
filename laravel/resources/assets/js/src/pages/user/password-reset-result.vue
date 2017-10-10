<template>
<div id="password-reset-result" class="panel" style="margin-top: 120px;">
    <div style="
        padding: 60px;
        width: 100%;
        text-align: center;
    ">
        <span>
            <i :class="['fa', 'fa-3x', 'fa-btn', icon]"></i>
            <span style="font-size: 36px; margin-left: 20px;">{{ message }}</span>
        </span>
        <p v-if="status === 'success'">
            <router-link to="/login">Click here to return to the login page.</router-link>
        </p>
    </div>
</div>
</template>

<script>
export default {
    props: [
        'status'
    ],

    computed: {
        icon: function() {
            return this.status === 'success' ? 'fa-lock' : 'fa-close';
        },

        message: function() {
            return this.status === 'success'
                ? 'Your password has been successfully changed.'
                : 'Password reset failed';
        }
    }
}
</script>
