<template>
<div>
    <div class="level-left" style="margin-bottom: 15px;" >
        <div class="level-item select">
            <select v-model="selectedTab"
                class="thin"
                style="font-size: 0.9rem;"
                :disabled="disabled"
                @change="updateRRule()"
            >
                <option value="none" :selected="selectedTab === 'none'">なし</option>
                <option value="DAILY" :selected="selectedTab === 'DAILY'">デイリー</option>
                <option value="WEEKLY" :selected="selectedTab === 'WEEKLY'">ウィークリー</option>
                <option value="MONTHLY" :selected="selectedTab === 'MONTHLY'">マンスリー</option>
            </select>
        </div>
    </div>

    <div v-show="selectedTab === 'DAILY'">

    </div>

    <div v-show="selectedTab === 'WEEKLY'" style="margin-bottom: 15px;" >
        <label v-for="label in dateLabels.ja" class="checkbox" style="margin-right: 15px;" >
            <input type="checkbox"> {{ label }}
        </label>
    </div>


    <div v-show="selectedTab != 'none'">
        <div style="font-size: 0.9rem;"><span>リピート回数</span></div>
        <div style="margin-bottom: 15px;" >
            <button v-for="time in count"
                class="button thin"
                style="margin: 0 2px 2px 0; font-size: 0.9rem; width: 2rem"
                :style="selectedCount == time ? style.primary : ''"
                @click="selectedCount = time; updateRRule()"
            >{{ time }}</button>
        </div>

        <div style="font-size: 0.9rem;"><span>間隔</span></div>
        <div class="level-left" style="margin-bottom: 15px;" >
            <div class="level-item select">
                <select v-model="selectedInterval"
                    class="thin"
                    style="font-size: 0.9rem;"
                    :disabled="disabled"
                    @change="updateRRule()"
                >
                    <option value="1" :selected="selectedInterval == 2">毎日</option>
                    <option value="2" :selected="selectedInterval == 2">1日おき</option>
                    <option value="3" :selected="selectedInterval == 3">2日おき</option>
                    <option value="4" :selected="selectedInterval == 4">3日おき</option>
                    <option value="5" :selected="selectedInterval == 5">4日おき</option>
                    <option value="6" :selected="selectedInterval == 6">5日おき</option>
                </select>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import { mapState } from 'vuex';
import { RRule, RRuleSet, rrulestr } from 'rrule';

export default {
    props: {
        'item': { type: Object, required: true },
        'disabled': { type: Boolean, default: false }
    },

    data() {
        return {
            selectedTab: 'none',
            selectedCount: 30,
            selectedInterval: 1,
            count: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30
            ],
            repeatSpans: [ 1, 2, 3, 4, 5 ],
            dateLabels: {
                ja: [ '日', '月', '火', '水', '木', '金', '土' ]
            },
            rrule: '',
            weekly: {

            }
        }
    },

    computed: {
        ...mapState({
            theme: state => state.app.theme
        }),

        style: function() {
            return {
                primary: {
                    'background-color': this.theme.primary.code,
                    'color': '#fff'
                }
            }
        }
    },

    methods: {
        fireEvent: function() {
            const rruleString = this.selectedTab !== 'none' ? this.rrule.toString() : '';
            const rruleText = this.selectedTab !== 'none' ? this.rrule.toText(): '';
            const rruleJson = this.selectedTab !== 'none' ? JSON.stringify(this.rrule.all()) : '';

            u.clog(this.rrule.all());
            u.clog('rruleString: ' + rruleString);
            u.clog('rruleText: ' + rruleText);
            u.clog('rruleJson: ' + rruleJson);

            const data = {
                values: { rruleString, rruleText, rruleJson },
                hasError: false
            }
            this.$emit('changeValue', data);
        },

        updateRRule: function() {

            const date = (this.item.date).split('-');
            const y = parseInt(date[0]);
            const m = parseInt(date[1]) - 1;
            const d = parseInt(date[2]);

            const time = this.item.start_time.split(':');
            const HH = parseInt(time[0]);
            const mm = parseInt(time[1]);

            const dtstart = new Date(Date.UTC(y, m, d, HH, mm, 0));
            const until = new Date(Date.UTC(y + 1, 12, 31));
//            const tzid = 'Asia/Tokyo';

            const options = {
                dtstart: new Date(Date.UTC(y, m, d, HH, mm, 0)),
                until: new Date(Date.UTC(y + 1, 12, 31)),
//                tzid: tzid,
                count: parseInt(this.selectedCount),
                interval: parseInt(this.selectedInterval),
//                wkst: RRule.MO
            };

            switch(this.selectedTab) {
                case 'none':
                    u.clog('--------------------------------none');
                    this.rrule = '';
                    break;
                case 'DAILY':
                    u.clog('--------------------------------DAILY');
                    options.freq = RRule.DAILY;
                    this.rrule = new RRule(options);
                    break;
                case 'WEEKLY':
                    u.clog('--------------------------------WEEKLY');
                    options.freq = RRule.WEEKLY;
                    this.rrule = new RRule(options);
                    break;
                case 'MONTHLY':
                    u.clog('--------------------------------MONTHLY');
                    options.freq = RRule.MONTHLY;
                    this.rrule = new RRule(options);
                    break;
            }

            this.fireEvent();
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
