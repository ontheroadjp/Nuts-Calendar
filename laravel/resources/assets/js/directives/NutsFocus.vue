<script>
export default {
        update: function () {
            console.log('v-focus update!');
            var object = this.el;
            Vue.nextTick(function() {
                object.focus();
            });
        }
    }
//    Vue.directive('focus', {
//        update: function () {
//            console.log('v-focus update!');
//            var object = this.el;
//            Vue.nextTick(function() {
//                object.focus();
//            });
//        }
//    });
</script>
