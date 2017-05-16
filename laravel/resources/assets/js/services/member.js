export default {
    directives: {
        focus: {
            inserted: function(el) {
                el.focus();
            },
        }
    },

//    data() {
//        return {
//            memberService: {
//                isLoading: false,
//            },
//
//            input: {
//                name: '',
//                order: '',
//                isShow: false,
//            }
//        }
//    },

    computed: {
        // temp
        nameHasError: function() {
            return false;
        }
    },

//    methods: {
//        execDeleteMember: function(memberId) {
//            this.memberService.isLoading = true;
//            const url = '/api/v1/member/' + memberId;
//    
//            http.fetchDelete(url)
//                .then(response => this.successDeleteMember(response))
//                .catch(error => this.failedDeleteMember(error));
//        },
//
//        successDeleteMember(response) {
//            u.clog('success');
//            this.$store.commit('deleteMember', response.data.id);
//            this.memberService.isLoading = false;
//        },
//
//        failedDeleteMember(error) {
//            u.clog('error');
//            this.memberService.isLoading = false;
//        },
//    }
}
