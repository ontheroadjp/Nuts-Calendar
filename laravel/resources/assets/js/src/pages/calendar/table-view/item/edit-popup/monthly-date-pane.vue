<template>
<div>
    <div style="margin-bottom: 15px;" >
        <button v-for="y in years"
            class="button thin"
            style="
                width: 4rem;
                font-size: 0.9rem;
                margin: 0 4px 4px 0;
                "
        >{{ y + '年' }}</button>
    </div>

    <div v-for="line in months">
        <button v-for="m in line"
            class="button thin"
            style="
                width: 4rem;
                font-size: 0.9rem;
                margin: 0 4px 4px 0;
                "
        >{{ m + '月' }}</button>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            years: [
                2018, 2019, 2020, 2021, 2022
            ],

            months: [
                [ 1, 2, 3, 4, 5, 6 ],
                [ 7, 8, 9, 10, 11, 12 ]
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
