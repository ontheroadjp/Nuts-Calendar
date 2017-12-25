<template>
    <footer class="footer">
        <div class="container">
            <div class="content has-text-centered thin">
                <p>Copyright (C) 2017 Nuts, LLC. All Rights Reserved.</p>
                <p v-if="isMIT">
                    The source code is licensed
                    <a href="//opensource.org/licenses/mit-license.php">MIT</a>.
                </p>

                <p v-if="isCCLANS">
                    The website content is licensed
                    <a href="//creativecommons.org/licenses/by-nc-sa/4.0/">CC ANS 4.0</a>.
                </p>

                <p v-if="github !== ''">
                    <a class="icon" :href="github">
                        <i class="fa fa-github"></i>
                    </a>
                </p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    data() {
        return {
            isMIT: false,
            isCCLANS: false,
            github: ''
        }
    }
}
</script>
