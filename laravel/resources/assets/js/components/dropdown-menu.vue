<template>
<div class="dropdown">
    <template v-if="label !== ''">
        <a href="#" class="dropdown-toggle" @click="toggle()">
            <span>
                <span class="icon is-small">
                    <i class="fa" :class="icon"></i>
                </span>
                {{ label }}
            </span>
            <span class="icon is-small" style="margin-top: 4px">
                <i class="fa fa-caret-down"></i>
            </span>
        </a>
    </template>

    <template v-else>
        <a href="#" class="dropdown-toggle" @click="toggle()">
            <span class="fa-stack fa-lg">
                <i class="fa fa-circle fa-stack-2x" :style="backIconStyle"></i>
                <i class="fa fa-stack-1x fa-inverse" :class="icon" :style="frontIconStyle"></i>
            </span>
        </a>
    </template>

    <transition :name="id">
        <ul :id="id" class="dropdown-menu" v-show="isOpen">
            <slot></slot>
        </ul>
    </transition>

</div>
</template>

<script>
export default {
    props: {
        id:             { type: String,  required: true },
        icon:           { type: String,  default: 'fa-user' },
        label:          { type: String,  default: '' },
        frontIconStyle: { type: Object,  default: () => { color: '#fff' } },
        backIconStyle:  { type: Object,  default: () => { color: '#000' } },
        menuHeight:     { type: Number, default: 40 }
//        isOpen:         { type: Boolean, default: false }
    },

    data() {
        return {
            isOpen: false
        }
    },

    methods: {
        toggle () {
            if (this.isOpen) {
                return this.hide()
            }
            return this.show()
        },

        show () {
            this.isOpen = true;
            setTimeout(() => document.addEventListener('click', this.hide), 0);
        },

        hide () {
            this.isOpen = false;
            document.removeEventListener('click', this.hide);
        }
    },

    mounted() {
        const doc = window.document;
        const css = doc.createElement('style');
        const rule = document.createTextNode(`
            .${this.id}-enter-active,
            .${this.id}-leave-active {
                transition: all 0.25s ease;
            }
            
            .${this.id}-enter,
            .${this.id}-leave-to {
                height: 0;
                opacity: 0;
            }

            .${this.id}-enter-to,
            .${this.id}-leave {
                height: ${this.menuHeight}px;
                overflow: hidden;
            }
        `);

        css.id = this.id;
        css.type = 'text/css';
        css.appendChild(rule);
        doc.getElementsByTagName('head')[0].appendChild(css);
    }
}
</script>

<style lang="scss">
/* A fork of https://github.com/twbs/bootstrap.  */
.dropdown {
    position: relative;
}

.dropdown-menu {
    display: block;
    position: absolute;
    top: 100%;
    right: 0;
    z-index: 1000;
    float: left;
    min-width: 180px;
    padding: 5px 0;
    margin: 2px 0 0;
    list-style: none;
    font-size: 14px;
    text-align: left;
    background-color: #fff;
    border: 1px solid #ccc;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    background-clip: padding-box;

    & > li > a {
        display: block;
        padding: 3px 20px;
        clear: both;
        line-height: 1.428571429;
        color: white;
        white-space: nowrap;
    }

    & > li > a:hover,
    & > li > a:focus {
        text-decoration: none;
        color: #262626;
        background-color: #f5f5f5;
    }
}
</style>
