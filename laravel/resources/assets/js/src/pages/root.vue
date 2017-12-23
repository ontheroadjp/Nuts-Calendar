<template>
<div>

    <div class="navBar">
        <router-link to="/register"
        class="button thin-200"
        style="background-color: green; color: #fff; margin-right: 10px;"
        >{{ t('root.startNow') }}
        </router-link>

        <router-link to="/login"
        class="button thin-200"
        style="background-color: green; color: #fff;"
        >{{ t('root.login') }}
        </router-link>
    </div>

<div class="parallax">
    <section
        :class="['hero', theme.primary.class, 'is-fullheight', 'parallax-section']"
        :style="{'background-color': style.topColor}"
    >
        <div id="home" class="parallax-layer layer-deep"
            style="display: flex; flex-direction: column; justify-content: center;">
            <div class="wrapper">
                <div class="columns">
                    <div class="column is-offset-1 is-5 main-hero-left">
                        <div class="contents">
                            <img src="images/nuts-logo-big.png" />
                            <small>(BETA)</small>

                            <div style="margin-bottom: 30px;">
                                <h2 class="subtitle thin" style="color: black">
                                    {{ t('root.subtitle') }}
                                </h2>
                            </div>

                            <div style="display: flex; flex-direction: column; align-items: center">
                                <router-link
                                    to="/register"
                                    tag="a"
                                    :class="['button', theme.secondary.class, 'thin-200']"
                                    style="
                                        width: 20rem;
                                        font-size: 1.5rem;
                                        border-radius: 10px;
                                        margin-bottom: 25px;
                                    "
                                >{{ t('root.startNow') }}
                                </router-link>

                                <router-link to="/login"
                                    class="thin-200"
                                    :style="{'color': theme.secondary.code}"
                                >{{ t('root.alreadyHasAccount') }}
                                </router-link>
                            </div>

                        </div>
                    </div><!-- // .main-hero-left -->

                    <div class="column main-hero-right">
                        <div style="display: flex; justify-content: center; align-items: center;">
                            <img src="images/root/macbook_pro_calendar.png">
                        </div>
                    </div><!-- // .main-hero-right -->
                </div><!-- // .column -->
            </div><!-- // .wrapper -->

        </div><!-- // #home -->
    </section>

    <!-- --------------------------------------------------------- -->

    <div class="group1">

        <section class="parallax-section" style="height: 100vh;">
            <div class="parallax-layer layer-base"
                :style="{'background-color': theme.secondary.code, 'height': '100vh'}"
                 style="
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    color: white;
                "
            >
                <p class="thin" style="font-size: 2.5rem;">パパの予定もママの予定も・・</p>
                <p class="thin" style="font-size: 2.5rem;">子供の習い事や学校行事も・・</p>
                <p class="thin" style="font-size: 2.5rem; margin-bottom: 50px;">
                    忘れちゃいけない家族のこと。</p>
                <img src="images/root/macbook_pro_calendar.png" style="width: 85%;"/>
            </div>
        </section>

<!--
        <section class="parallax-section"
            style="background-color: #c7e7f7; min-height: 50vh;">
            <div class="parallax-layer layer-back"
                style="background-image: url('images/root/family.jpg'); height: 100vh;"
            ></div>
        </section>

        <section class="parallax-section" style="height: 50vh;">
            <div class="parallax-layer layer-base"
                style="display: flex; justify-content: center; align-items: center;"
            ><img src="images/root/macbook_pro.png" />
            </div>
        </section>
-->

        <section class="parallax-section" style="height: 100vh;">
            <div class="parallax-layer layer-back wrapper"
                style="display: flex; align-items: center; background-color: #f0f0f0;">

                <div class="columns">
                    <div class="column is-6">
                        <div style="text-align: center;">
                            <h3 class="thin-500" style="font-size: 2rem;">
                                メンバーごとにわかりやすく
                            </h3>
                            <img src="images/root/future01.png" class="circle-image" />
                        </div>
                        <p class="thin" style="padding: 0 40px; line-height: 2rem;">
                            スケジュールやタスクはメンバー単位で管理できます。
                            メンバー間での面倒な色分けなどは必要ありません。
                            メンバーは複数作成でき、メンバー間での予定項目などの移動は、
                            ドラッグ & ドロップによって簡単に行えます。
                        </p>
                    </div>

                    <div class="column is-6">
                        <div style="text-align: center;">
                            <h3 class="thin-500" style="font-size: 2rem;">
                                必要なメンバーだけをカレンダーへ
                            </h3>
                            <img src="images/root/future02.png" class="circle-image" />
                        </div>
                        <p class="thin" style="padding: 0 40px; line-height: 2rem;">
                            メンバーをカレンダーに追加することによって、
                            1メンバー 1列でカレンダーに表示されます。
                            カレンダーにはいくつでもメンバーを追加することができます。
                        </p>
                    </div>
                </div><!-- // .columns -->

            </div><!-- // .parllax-layer -->
        </section>
    </div><!-- // .group1 -->

    <!-- --------------------------------------------------------- -->

    <div class="group2">

        <section class="parallax-section" style="height: 100vh;">
            <div class="parallax-layer layer-base"
                :style="{'background-color': theme.secondary.code, 'height': '100vh'}"
                 style="
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    color: white;
                "
            >
                <p class="thin" style="font-size: 2.5rem;">会社では複数のプロジェクト・・</p>
                <p class="thin" style="font-size: 2.5rem;">家庭では学校行事に地域の活動・・</p>
                <p class="thin" style="font-size: 2.5rem; margin-bottom: 50px;">現代人は忙しい。</p>
                <img src="images/root/macbook_pro_dashboard.png" style="width: 85%;"/>
            </div>
        </section>

<!--
        <section class="parallax-section"
            style="background-color: #c7e7f7; min-height: 50vh;">
            <div class="parallax-layer layer-back"
                style="background-image: url('images/root/team.jpg'); height: 100vh;"
            >
            </div>
        </section>

        <section class="parallax-section" style="height: 50vh;">
            <div class="parallax-layer layer-base" style="display: flex; justify-content: center; align-items: center;">
                <img src="images/root/macbook_pro.png" />
            </div>
        </section>
-->

        <section class="parallax-section" style="height: 100vh;">
            <div class="parallax-layer layer-back wrapper"
                style="display: flex; align-items: center; background-color: #f0f0f0;">

                <div class="columns">
                    <div class="column is-6">
                        <div style="text-align: center;">
                            <h3 class="thin-500" style="font-size: 2rem;">複数のカレンダー</h3>
                            <img class="circle-image" src="images/root/macbook_pro.png" />
                        </div>
                        <p class="thin" style="padding: 0 40px; line-height: 2rem;">
                            用途に合わせて複数のカレンダーを作成することができます。
                            メンバーは複数のカレンダーへ追加することができます。
                        </p>
                    </div>

                    <div class="column is-6">
                        <div style="text-align: center;">
                            <h3 class="thin-500" style="font-size: 2rem;">メンバーを登録</h3>
                            <img class="circle-image" src="images/root/macbook_pro.png" />
                        </div>
                        <p class="thin" style="padding: 0 40px; line-height: 2rem;">
                            作成したメンバーをカレンダーに追加することによって、
                            カレンダーに表示されます。
                            カレンダーにはいくつでもメンバーを追加することができます。
                        </p>
                    </div>
                </div>

            </div><!-- // .parllax-layer -->
        </section>

    </div><!-- // .group2 -->

    <!-- --------------------------------------------------------- -->

    <div class="group3" >
        <section class="parallax-section" style="height: 100vh;">
            <div class="parallax-layer layer-base"
                style="background-image: url('images/root/schedule.jpg');
                    background-size: cover; height: 514px;"
            >Base Layer 2</div>
<!--
            <div class="parallax-layer layer-fore"
                style="
                    height: 20vh;
                    background-color: #cef3f9;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                "
            ><h2 class="thin" style="font-size: 2.5rem;">チーム・カレンダー</h2>
            </div>
-->
        </section>

        <section class="parallax-section" style="height: 100vh;">
            <div class="parallax-layer layer-back wrapper" style="display: flex; align-items: center; background-color: #f0f0f0;">

                <div class="columns">
                    <div class="column is-6">
                        <div class="text-align: center;">
                            <h3 class="thin-500" style="font-size: 2rem; text-align: center;">
                                セクション３
                            </h3>
                            <img class="circle-image" src="images/root/macbook_pro.png" />
                        </div>
                        <p>
                            ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　
                            ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　
                            ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　
                            ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　
                            ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　
                        </p>
                    </div>
                    <div class="column is-6">
                        <div style="text-align: center;">
                            <h3 class="thin-500" style="font-size: 2rem; text-align: center;">
                                メンバーを登録
                            </h3>
                            <img class="circle-image" src="images/root/macbook_pro.png" />
                        </div>
                        <p>
                            ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　
                            ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　
                            ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　
                            ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　
                            ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　ダミー　
                        </p>
                    </div>
                </div>

            </div><!-- // .parllax-layer -->
        </section>
    </div>

    <!-- --------------------------------------------------------- -->

    <div class="group4" style="margin-top: 300px;">
        <section id="team" class="parallax-section">
            <div
                class="parallax-layer layer-base"
                style="height: 300px; background-color: #383737;"
            > Base Layer 2</div>
        </section>
    </div>

</div>

</div>
</template>

<script>
import core from '../mixins/core.js';
//import loginPanel from './user/login/login-panel.vue';

export default {
//    components: { loginPanel },

    mixins: [ core ],

    computed: {
        theme: function() {
            return this.$store.state.app.theme;
        },

        style: function() {
            return {
//                topColor: '#c7e7f7'
                topColor: this.theme.primary.code
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.main-hero-right {
    width: 50%;
}

.circle-image {
    margin: 30px 0;
    width: 35%;
    border-radius: 50%;
}

.navBar {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 99;
}

.parallax {
    height:100vh;
    overflow-x:hidden;
    overflow-y:auto;
	perspective:300px;

    & .parallax-section {
        position: relative;
    }

    & .parallax-layer {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    & .layer-fore {
        height: 100vh;
        background-color: white;
    	transform:translateZ(90px) scale(.7);
        z-index:4;
    }

    & .layer-base {
    	transform:translateZ(0);
        z-index:3;
    }

    & .layer-back {
        background-color: yellow;
    	transform:translateZ(-300px) scale(2);
        z-index:2;
    }

    & .layer-deep {
    	transform:translateZ(-600px) scale(3);
        z-index:1;
    }
}

</style>
