<template>
    <figure>
        <div :style="textStyle ? textStyle : ''">{{ text }}</div>
        <figcaption :style="shutterStyle ? shutterStyle : ''">
            <slot></slot>
        </figcaption>
    </figure>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            required: true
        },
        textStyle: {
            type: Object,
            required: false
        },
        shutterStyle: {
            type: Object,
            required: false
        }
    }
}
</script>

<style lang="scss" scoped>
figure {
    position: relative;
    overflow: hidden;
    &:hover figcaption {
        top: 0;
        left: 0;
    }
    & figcaption {
        position: absolute;
        top: -100%;
        left: 0;
        z-index: 2;
        width: 100%;
        height: 100%;
        background-color: rgba(240, 240, 240, .8);
        transition: .3s;
        opacity: 1;
    }
}
</style>
