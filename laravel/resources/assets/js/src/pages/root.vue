<template>
<div>
    <section :class="['hero', theme.primary.class, 'is-fullheight']">
    <div class="hero-body">
    <div id="home" class="container">

        <div class="contents" style="width: 40%;">
            <h1 class="title thin-300" style="color:#fff">Nuts <strong>Calendar</strong>(BETA)</h1>
            <div style="margin-bottom: 30px;">
                <h2 class="subtitle thin" style="color:#fff">
                    Grasp the schedules of your own multiple roles,
                    family members, lovers, and colleagues with one
                    simple calendar !!
                </h2>
            </div>
            <div style="display: flex; justify-content: space-around;">
                <a :class="['button', theme.secondary.class]">Sign-in</a>
                <a :class="['button', theme.secondary.class]">Create New Account</a>
            </div>
        </div>

    </div>
    </div>
    </section>

    <section>
        <div style="height: 250px; background-color: blue;">
            HOGEHOGE
        </div>
    </section>
    <section>
        <div style="height: 250px; background-color: red;">
            HOGEHOGE
        </div>
    </section>
    <section>
        <div style="height: 250px; background-color: yellow;">
            HOGEHOGE
        </div>
    </section>
</div>
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

<style lang="scss" scoped>
.contents {
    /* display: flex; */
}
</style>
