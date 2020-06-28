<template>
    <v-container class="container">
        <h3 class="font-weight-bold">Настройки:</h3>
        <v-subheader class="pl-0">Длительность: </v-subheader>
        <v-slider v-model="timer"
                  class="slider"
                  thumb-label="always"
                  :thumb-size="24"
                  :max="options.sliderOptions.timer"
                  :min="1"
        ></v-slider>
        <v-subheader class="pl-0">Сложность: </v-subheader>
        <v-slider v-model="dif"
                  class="slider"
                  thumb-label="always"
                  :thumb-size="24"
                  :max="options.sliderOptions.difficulty"
                  :min="1"
        ></v-slider>
        <div class="list-checkbox">
        <v-checkbox v-model="chk"
                     v-for="(option, index) in options.checkboxOptions"
                     :key="index"
                     :value="option.value"
                     :label="option.label" />
        </div>
    </v-container>
</template>

<script>

    export default {
        name: 'Config',

        data: () => ({
            options: {
                checkboxOptions: [
                    { value: 'Sum', label: 'Суммирование' },
                    { value: 'Rzn', label: 'Разность' },
                    { value: 'Umn', label: 'Умножение' },
                    { value: 'Del', label: 'Деление' },
                    { value: 'Stp', label: 'Возведение в степень' }
                ],
                sliderOptions: {
                    timer: 15,
                    difficulty: 10
                }
            }
        }),

        computed: {
            chk: {
                get() {
                    return this.$store.getters.checkboxSelected;
                },
                set(value) {
                    this.$store.commit('updateCheckboxSelected', value);
                }
            },
            timer: {
                get() {
                    return this.$store.getters.sliderTimerValue;
                },
                set(value) {
                    this.$store.commit('updateSliderTimerValue', value);
                }
            },
            dif: {
                get() {
                    return this.$store.getters.sliderDifValue;
                },
                set(value) {
                    this.$store.commit('updateSliderDifValue', value);
                }
            }
        }
    };
</script>

<style scoped>
    .container {
        width:400px;
    }
    .slider {
        width: 300px;
        margin: 13px 0 0 0;
        height: 25px;
    }
    .list-checkbox {
        margin: 20px 0 10px 0;
    }
    .list-checkbox div {
        height: 30px;
        margin: 0;
    }

</style>
