<template>
<div class="change-theme">
<div class="columns" style="padding: 0 30px">
<div class="column is-offset-2 is-8">

    <!-- <p class="panel-heading">Theme</p> -->

    <form>
    <div class="box" style="padding: 60px; width: 100%;">

        <div class="field" style="margin-bottom: 20px">
            <label class="label">Koiai theme</label>

            <div class="hero is-koiai is-medium">
            <div class="hero-head">
            <div class="nav navbar-fixed-top" style="border-bottom: 1px solid #1960b7; padding-left: 25px;">
            <div class="container"> 

                <div class="nav-left">
                    <a class="nav-item is-brand" href="/">
                        <img src="/images/bulma-type-white.png" alt="Bulma logo">
                    </a>
                </div>

                <span class="nav-item">
                    <a class="button is-koiai is-inverted">
                        <span>Set</span>
                    </a>
                </span>

            </div><!-- // .container -->
            </div><!-- // .nav-right .nav-menu -->
            </div><!-- // .hero-head -->
            </div>
        </div><!-- // .field -->

        <div class="field" style="margin-bottom: 20px">
            <label class="label">Nadeshiko theme</label>
            <div class="hero is-nadeshiko is-medium">
            <div class="hero-head">
            <div class="nav navbar-fixed-top" style="border-bottom: 1px solid #ee6896; padding-left: 25px;">
            <div class="container"> 

                <div class="nav-left">
                    <a class="nav-item is-brand" href="/">
                        <img src="/images/bulma-type-white.png" alt="Bulma logo">
                    </a>
                </div>

                <span class="nav-item">
                    <a class="button is-nadeshiko is-inverted">
                        <span>Set</span>
                    </a>
                </span>

            </div><!-- // .container -->
            </div><!-- // .nav-right .nav-menu -->
            </div><!-- // .hero-head -->
            </div>
        </div><!-- // .field -->

        <div class="field" style="margin-bottom: 20px">
            <label class="label">Sumire theme</label>
            <div class="hero is-sumire is-medium">
            <div class="hero-head">
            <div class="nav navbar-fixed-top" style="border-bottom: 1px solid #b688ff; padding-left: 25px;">
            <div class="container"> 

                <div class="nav-left">
                    <a class="nav-item is-brand" href="/">
                        <img src="/images/bulma-type-white.png" alt="Bulma logo">
                    </a>
                </div>

                <span class="nav-item">
                    <a class="button is-sumire is-inverted">
                        <span>Set</span>
                    </a>
                </span>

            </div><!-- // .container -->
            </div><!-- // .nav-right .nav-menu -->
            </div><!-- // .hero-head -->
            </div>
        </div><!-- // .field -->

        <div class="field" style="margin-bottom: 20px">
            <label class="label">Moegi theme</label>
            <div class="hero is-moegi is-medium">
            <div class="hero-head">
            <div class="nav navbar-fixed-top" style="border-bottom: 1px solid #aacf53; padding-left: 25px;">
            <div class="container"> 

                <div class="nav-left">
                    <a class="nav-item is-brand" href="/">
                        <img src="/images/bulma-type-white.png" alt="Bulma logo">
                    </a>
                </div>

                <span class="nav-item">
                    <a class="button is-moegi is-inverted">
                        <span>Set</span>
                    </a>
                </span>

            </div><!-- // .container -->
            </div><!-- // .nav-right .nav-menu -->
            </div><!-- // .hero-head -->
            </div>
        </div><!-- // .field -->

    </div><!-- // .box -->
    </form>

</div><!-- // .column .is-x -->
</div><!-- // .columns -->
</div><!-- // .change-theme -->
</template>

<script>
    export default {
        computed: {
            theme: function() {
                return this.$store.state.app.theme;
            }
        }
    }
</script>

<style>
.result-fade-enter-active .result-fade-leave-active {
    transition: all 0.4s ease;
    z-index: 99999;
}

.result-fade-enter,
.result-fade-leave-to {
    opacity: 0;
}
</style>
