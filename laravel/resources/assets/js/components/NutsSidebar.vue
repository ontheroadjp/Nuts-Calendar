<style>
    .nuts-sidebar {
        position: fixed;
        color: #fff;
    }

    .nuts-sidebar.left {
        top: 0;
        left: 0;
        bottom: 0;
        width: 270px;
        background: rgba(221, 221, 221, 0.95);
    }

    .nuts-sidebar.right {
        top: 0;
        right: 0;
        bottom: 0;
        width: 270px;
        background: rgba(221, 221, 221, 0.95);
    }

    .nuts-sidebar.top {
        left: 0;
        right: 0;
        top: 0;
        height: 270px;
        background: rgba(1, 209, 178, 1);
    }

    .nuts-sidebar.bottom {
        left: 0;
        right: 0;
        bottom: 0;
        height: 270px;
        background: rgba(1, 209, 178, 1);
    }
</style>

<template id="nuts-sidebar">
    <div class="nuts-sidebar {{ position }}">
        <slot></slot>
    </div>
</template>

<script>
    export default {

        // 'plce' shuld be 'left', 'right', 'top' or 'bottom'
        // 'action' shuld be 'open', 'close' or 'toggle'
        props: {
            position: {
                type: String,
                default: "right"
            },
            action: {
                type: String,
                default: "toggle"
            }
        },
        methods: {
            toggle() {
                //var position, action
                //this.position ? position = this.position : position = 'left'
                //this.action ? action = this.action : action = 'toggle'
                $(".nuts-sidebar." + this.position).trigger("sidebar:" + this.action, [{ speed: 200 }]);

                $(".nuts-sidebar." + this.position).on("sidebar:opened", function () {
                    this.$root.$emit('nuts-sidebar-opened');
                });

                $(".nuts-sidebar." + this.position).on("sidebar:closed", function () {
                    this.$root.$emit('nuts-sidebar-closed');
                });
            }
        },
        created() {
            const self = this;
            this.$root.$on('nuts-sidebar-toggle', function() {
                console.log('$on@NutsSidebar: nuts-sidebar-toggle');
                self.toggle()
            });
        },
        ready() {
            var sides = ["left", "top", "right", "bottom"];
            for (var i = 0; i < sides.length; i++) {
                var cSide = sides[i];
                $(".nuts-sidebar." + cSide).sidebar({side: cSide});
            }
        },
    }
</script>
