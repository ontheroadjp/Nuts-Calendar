<template>
<div>
    <template v-if="!editing">
        <span @click="editing = true" style="font-size: 1.8em; color: #fff">
            {{ currentYear }} 年 {{ currentMonth }} 月
        </span>
    </template>

    <template v-else>
        <div class="field">
        <p class="control">
    
            <span class="select">
                <select v-model="currentYear" @change="editing = false">
                    <option v-for="val in yearVals">{{ val }}</option>
                </select>
            </span><span style="font-size: 1.8em; margin:5px;">年</span>
    
            <span class="select">
                <select v-model="currentMonth" @change="editing = false">
                    <option v-for="val in monthVals">{{ val }}</option>
                </select>
            </span><span style="font-size:1.8em; margin:5px;">月</span>
    
            <span style="font-size: 1.2em; margin: 5px;">
                (<a href="#" @click="editing = false">x</a>)
            </span>
    
        </p><!-- // .control -->
        </div><!-- // .field -->
    </template>

</div>
</template>

<script>
export default {
    props: {
        'yearFrom': {
            type: Number,
            default: 2015
        }, 
        'yearPeriod': {
            type: Number,
            default: 5
        }
    },

    data() {
        return {
            editing: false,
            monthVals: [
                '01','02','03','04','05','06',
                '07','08','09','10','11','12'
            ]
        }
    },

    computed: {
        currentYear: {
            get() {
                return this.$store.state.calendar.currentYear;
            },
            set(value) {
                this.$store.commit('setCurrentYear', value);
            }
        },

        currentMonth: {
            get() {
                return this.$store.state.calendar.currentMonth;
            },
            set(value) {
                this.$store.commit('setCurrentMonth', value);
            }
        },

        yearVals: function() {
            let start, period, vals = [];
            this.yearFrom ? start = this.yearFrom : start = this.currentYear;
            this.yearPeriod ? period = this.yearPeriod : period = 5;
            for( var n=0; n < period; n++ ) {
                vals.push(parseInt(start) + n);
            }
            return vals;
        },

        theme: function() {
            return this.$store.state.app.theme;
        }
    },
}
</script>
