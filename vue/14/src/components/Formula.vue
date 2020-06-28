<template>
    <div>
        <div class="grey lighten-5 headline box container-numbers">
            <InputElement v-for="(item, index) in this.values"
                          :key="index"
                          :dataInput="item"
                          :index="index"
                          @change="changeValueInput"
                          @focus="onFocusInput"/>
        </div>
        <div class="grey lighten-5 headline box container-result">
            = <span class="result">{{ resultNeeded }}</span> ?
        </div>
        <div class="calc-box">
            <v-container class="grey lighten-5">
                <v-row class="mb-6" no-gutters>
                    <v-col class="text-center">
                        <v-btn @click="clickNumber(1)" color="warning" fab dark class="font-weight-bold title">1</v-btn>
                    </v-col>
                    <v-col class="text-center">
                        <v-btn @click="clickNumber(2)" color="warning" fab dark class="font-weight-bold title">2</v-btn>
                    </v-col>
                    <v-col class="text-center">
                        <v-btn @click="clickNumber(3)" color="warning" fab dark class="font-weight-bold title">3</v-btn>
                    </v-col>
                    <v-col class="text-center">
                        <v-btn @click="focusInputPrev" color="blue-grey" fab dark class="font-weight-bold headline">&lt;</v-btn>
                    </v-col>
                </v-row>
                <v-row class="mb-6" no-gutters>
                    <v-col class="text-center">
                        <v-btn @click="clickNumber(4)" color="warning" fab dark class="font-weight-bold title">4</v-btn>
                    </v-col>
                    <v-col class="text-center">
                        <v-btn @click="clickNumber(5)" color="warning" fab dark class="font-weight-bold title">5</v-btn>
                    </v-col>
                    <v-col class="text-center">
                        <v-btn @click="clickNumber(6)" color="warning" fab dark class="font-weight-bold title">6</v-btn>
                    </v-col>
                    <v-col class="text-center">
                        <v-btn @click="focusInputNext" color="blue-grey" fab dark class="font-weight-bold headline">&gt;</v-btn>
                    </v-col>
                </v-row>
                <v-row class="mb-6" no-gutters>
                    <v-col class="text-center">
                        <v-btn @click="clickNumber(7)" color="warning" fab dark class="font-weight-bold title">7</v-btn>
                    </v-col>
                    <v-col class="text-center">
                        <v-btn @click="clickNumber(8)" color="warning" fab dark class="font-weight-bold title">8</v-btn>
                    </v-col>
                    <v-col class="text-center">
                        <v-btn @click="clickNumber(9)" color="warning" fab dark class="font-weight-bold title">9</v-btn>
                    </v-col>
                    <v-col class="text-center">
                        <v-btn @click="$emit('showHintResult')" color="blue-grey" fab dark class="font-weight-bold title">?</v-btn>
                    </v-col>
                </v-row>
                <v-row class="mb-6" no-gutters>
                    <v-col class="text-center">
                    </v-col>
                    <v-col class="text-center">
                        <v-btn @click="clickNumber(0)" color="warning" fab dark class="font-weight-bold title">0</v-btn>
                    </v-col>
                    <v-col class="text-center">
                    </v-col>
                    <v-col class="text-center">
                        <v-btn @click="nextPlay" color="blue-grey" fab dark class="font-weight-bold title">=</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<script>
    import InputElement from "./InputElement";

    export default {
        name: "Formula",

        components: {
            InputElement
        },

        props: {
            resultNeeded: {
                type: Number,
                default: -1,
                required: true
            }
        },

        data: () => ({
            values: [],
            indexFocused: null
        }),

        methods: {
            calcActive(value){
                return this.$store.getters.checkboxSelected.includes(value);
            },
            calcResult() {
                if (this.values.find(el => (el.active && !el.value))) return '';
                const values = this.values.slice().reverse();
                const result = values.reduce((result, item, index) => {
                    if (!item.active) return result;
                    if (result === 0) result = item.value;
                    const item2 = values.find((el, i) => (i > index && el.active));
                    if (!item2) return result;
                    if (item.type === 'Stp') {
                        return Math.pow(item2.value, result);
                    } else if (item.type === 'Del') {
                        return item2.value / result;
                    } else if (item.type === 'Umn') {
                        return item2.value * result;
                    } else if (item.type === 'Rzn') {
                        return item2.value - result;
                    } else if (item.type === 'Sum') {
                        return item2.value + result;
                    }
                }, 0);
                return result;
            },
            changeValueInput(data) {
                const { value, index } = data;
                this.values[index].value = value;
                this.$emit('changeResultUser', this.calcResult());
            },
            onFocusInput(index) {
                this.indexFocused = index;
            },
            clickNumber(value) {
                if (this.indexFocused !== null) {
                    const currentValue = this.values[this.indexFocused].value;
                    const newValue = +(`${currentValue}${value}`);
                    if (newValue) this.changeValueInput({ value: newValue, index: this.indexFocused });
                }
            },
            focusInputNext() {
                const currentIndex = this.indexFocused === null ? -1 : this.indexFocused;
                let nextIndex = this.values.findIndex((item, index) => (item.active && (index > currentIndex)));
                if (nextIndex === -1) nextIndex = this.values.findIndex(item => item.active);
                if (nextIndex === -1) {
                    this.indexFocused = null;
                } else {
                    this.onFocusInput(nextIndex);
                }
            },
            focusInputPrev() {
                let currentIndex = this.indexFocused === null ? this.values.length - 1 : this.indexFocused;
                let index = currentIndex - 1;
                while (index !== currentIndex) {
                    if (index >= 0 && this.values[index].active) {
                        this.onFocusInput(index);
                        break;
                    }
                    index--;
                    if (index < 0) index = this.values.length - 1;
                }
            },
            nextPlay() {
                this.$emit('nextPlay', null);
                this.values.forEach(item => {
                   item.value = 0;
                });
            },
            clearValues() {
                this.values = [
                    { active: true, icon: '', value: 0 },
                    { active: this.calcActive('Sum'), type: 'Sum', icon: 'mdi-plus', value: 0 },
                    { active: this.calcActive('Rzn'), type: 'Rzn', icon: 'mdi-minus', value: 0 },
                    { active: this.calcActive('Umn'), type: 'Umn', icon: 'mdi-close', value: 0 },
                    { active: this.calcActive('Del'), type: 'Del', icon: 'mdi-division', value: 0 },
                    { active: this.calcActive('Stp'), type: 'Stp', icon: 'mdi-chevron-up', value: 0 },
                ];
                this.indexFocused = null;
            }
        },

        beforeMount() {
            this.clearValues();
        },
    }
</script>

<style scoped>
    .container-numbers {
        margin: 40px auto 10px auto;
    }
    .container-result {
        margin: 40px auto 40px auto;
    }
    .box {
        padding-right: 10px;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
        position: relative;
        text-align: center;
    }
    .result {
        margin-left: 10px;
        margin-right: 10px;
    }
    .calc-box {
        margin: 10px 30px;
    }
</style>