<template>
    <span v-if="!editing" @click="editing = true">{{ year }} 年 {{ month }} 月</span>
    <span v-else>
        <div class="form-group form-inline">

            <div class="form-group">
                <select
                    class="form-control"
                    v-model="year"
                    @change="changeValue"
                >
                    <option v-for="val in year_vals">{{ val }}</option>
                </select>
            </div>年

            <div class="form-group">
                <select
                    class="form-control"
                    v-model="month"
                    @change="changeValue"
                >
                    <option v-for="val in month_vals">{{ val }}</option>
                </select>
            </div>月

            <span :style="cancelButtonStyle">(</span>
            <a href="#" @click="editing =false" :style="cancelButtonStyle">x</a>
            <span :style="cancelButtonStyle">)</span>
        </div>
    </span>
</template>

<script>
    var now = new Date();
    export default {
        props: [
           'yearFrom', 'yearPeriod'
        ],
        data() {
            return {
                year: now.getFullYear(),
                month: now.getMonth() + 1,
                editing: false,
                cancelButtonStyle: {
                    fontSize: '0.6em',
                },
                lang: 'en',
                month_vals: [
                    '01','02','03','04','05','06',
                    '07','08','09','10','11','12'
                ]
            }
        },
        computed: {
            year_vals: function() {
                var start, period, vals = [];
                this.yearFrom ? start = this.yearFrom : start = this.year;
                this.yearPeriod ? period = this.yearPeriod : period = 5;
                for( var n=0; n < period; n++ ) {
                    vals.push(parseInt(start) + n);
                }
                return vals;
            }
        },
        methods: {
            changeValue() {
                this.$root.$emit('ym-change', this.year, this.month);
                this.editing = false;
            }
        },
        created() {
            const self = this;
            this.$root.$on('ym-change', function(year, month) {
                console.log('nuts-ym-field: ' + year + ':' + month);
                self.year = year;
                self.month = month;
            });
        },
    }
</script>
