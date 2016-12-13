<template id="nuts-ym-selector">
    <div class="form-group form-inline">
    
        <div class="form-group">
            <select
                class="form-control"
                v-model="year"
                @change="changeValue"
            >
                <option>2015</option>
                <option>2016</option>
                <option>2017</option>
            </select>
        </div>年
    
        <div class="form-group">
            <select
                class="form-control"
                v-model="month"
                @change="changeValue"
            >
                <option>01</option>
                <option>02</option>
                <option>03</option>
                <option>04</option>
                <option>05</option>
                <option>06</option>
                <option>07</option>
                <option>08</option>
                <option>09</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
            </select>
        </div>月
    
    </div><!-- // .fort-group .form-inline -->
</template>

<script>
    var now = new Date();
    export default {        
        data() {
            return {
                year: now.getFullYear(),
                month: now.getMonth() + 1
            }
        },
        methods: {
            changeValue() {
                this.$root.$emit('ym-change', this.year, this.month);
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
