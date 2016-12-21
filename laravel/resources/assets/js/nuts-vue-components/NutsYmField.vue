<template>
    <span v-if="!editing" @click="editing = true">{{ currentYear }} 年 {{ currentMonth }} 月</span>
    <span v-else>
        <div class="form-group form-inline">

            <div class="form-group">
                <select
                    class="form-control"
                    v-model="currentYear"
                    @change="editing = false"
                >
                    <option v-for="val in yearVals">{{ val }}</option>
                </select>
            </div>年

            <div class="form-group">
                <select
                    class="form-control"
                    v-model="currentMonth"
                    @change="editing = false"
                >
                    <option v-for="val in monthVals">{{ val }}</option>
                </select>
            </div>月

            <span :style="cancelButtonStyle">(</span>
            <a href="#" @click="editing =false" :style="cancelButtonStyle">x</a>
            <span :style="cancelButtonStyle">)</span>
        </div>
    </span>
</template>

<script>

    export default {
        props: [
           'yearFrom', 'yearPeriod'
        ],
        data() {
            return {
                editing: false,
                cancelButtonStyle: {
                    fontSize: '0.6em',
                },
                lang: 'en',
                monthVals: [
                    '01','02','03','04','05','06',
                    '07','08','09','10','11','12'
                ]
            }
        },

        computed: {

            currentYear: {
                get() {
                    return this.$store.state.currentYear;
                },
                set(value) {
                    this.$store.commit('setCurrentYear', value);
                }
            },

            currentMonth: {
                get() {
                    return this.$store.state.currentMonth;
                },
                set(value) {
                    this.$store.commit('setCurrentMonth', value);
                }
            },

            yearVals: function() {
                var start, period, vals = [];
                this.yearFrom ? start = this.yearFrom : start = this.currentYear;
                this.yearPeriod ? period = this.yearPeriod : period = 5;
                for( var n=0; n < period; n++ ) {
                    vals.push(parseInt(start) + n);
                }
                return vals;
            }
        },

    }
</script>
