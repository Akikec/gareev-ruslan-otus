<template>
    <div class="page">
        <div class="mt-1">
            <v-btn @click="onCancel" color="primary" dark>
                <v-icon>mdi-close</v-icon> Отмена
            </v-btn>
            <div class="timer-box">
                <Timer :time="timeAsText" />
            </div>
        </div>
        <div class="formula-box">
            <Formula :resultNeeded="resultNeeded"
                     @showHintResult="onShowHint"
                     @changeResultUser="onChangeResultUser"
                     @nextPlay="nextPlay" />
            <DialogWindow :dialog="dialog"
                          @close="onCloseDialog"/>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import router from '../router';
    import Timer from './Timer';
    import Formula from './Formula';
    import DialogWindow from './DialogWindow';

    export default {
        name: "PagePlay",

        components: {
            Timer,
            Formula,
            DialogWindow
        },

        data: () => ({
            timer: null,
            seconds: 0,
            resultNeeded: 0,
            strResultNeeded: '',
            resultUser: 0,
            dialogParametres: {
                visibility: false,
                title: 'Информация',
                text: '',
                stop: false
            }
        }),

        computed: {
            ...mapGetters([
                'sliderTimerValue',
                'countAll'
            ]),
            timeAsText() {
                const min = Math.floor(this.seconds / 60);
                const sec = this.seconds - min * 60;
                return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
            },
            dialog() {
                return this.dialogParametres;
            }
        },

        methods: {
            startPlay() {
                this.$store.commit('clear');
                if (this.createNewResultNeeded()) {
                    this.startTimer(this.sliderTimerValue);
                } else {
                    router.push('/');
                }
            },
            nextPlay() {
                if (this.resultUser == this.resultNeeded) {
                    this.$store.commit('updateCountCompleted');
                    this.dialogParametres = {
                        visibility: true,
                        title: 'Результат',
                        text: 'Вы ответили верно. \nТак держать!'
                    }
                } else {
                    this.$store.commit('updateCountFailed');
                    this.dialogParametres = {
                        visibility: true,
                        title: 'Результат',
                        text: 'Ваш ответ неверный! \nПравильный ответ: \n' + this.strResultNeeded
                    }
                }
                this.saveState();
                this.resultUser = 0;
                if (this.countAll == 0 || !this.createNewResultNeeded()) {
                    this.stopTimer();
                    router.push('/');
                }
            },
            startTimer(minutes) {
                clearInterval(this.timer);
                this.seconds = minutes * 60;
                this.timer = setInterval(() => {
                    this.seconds--;
                    if (this.seconds < 0) {
                        this.$store.commit('updateCountFailed');
                        this.dialogParametres = {
                            visibility: true,
                            title: 'Таймер',
                            text: 'Время истекло!',
                            stop: true
                        };
                        this.stopTimer();
                    }
                }, 1000);
            },
            stopTimer() {
                clearInterval(this.timer);
                this.seconds = 0;
            },
            onChangeResultUser(value) {
                this.resultUser = value;
            },
            createNewResultNeeded() {
                this.resultUser = 0;
                let numbers = [null, 'Sum', 'Rzn', 'Umn', 'Del', 'Stp'].map(item => {
                    return (item == null || this.$store.getters.checkboxSelected.includes(item)) ? 1 : null;
                });
                if (!numbers.length) {
                    this.resultNeeded = 0;
                    this.strResultNeeded = '';
                    return false;
                }
                let a = this.$store.getters.sliderDifValue - numbers.length;
                let i = 0;
                while (a > 0) {
                    if (numbers[i] !== null) {
                        numbers[i]++;
                        a--;
                    }
                    i++;
                    if (i >= numbers.length) i = 0;
                }
                numbers = numbers.map(value => {
                    if (value === null) return null;
                    const b = Math.pow(10, value - 1);
                    const min = b >= 10 ? b + 1: b;
                    const max = Math.pow(10, value) - 1;
                    return this.getRandomIntInclusive(min, max);
                }, this);
                numbers.reverse();
                let strResult = '';
                const result = numbers.reduce((result, value, index) => {
                    if (value === null) return result;
                    const v1 = result === 0 ? value : result;
                    const v2 = numbers.find((el, i) => (i > index && el !== null));
                    if (v2) {
                        if (strResult === '') strResult = v1.toString();
                    } else {
                        if (result === 0) {
                            strResult = v1.toString();
                            return v1;
                        }
                        else {
                            return result;
                        }
                    }
                    if (index === 0) {
                        strResult = `${v2} ^ ${v1}`;
                        return Math.pow(v2, v1);
                    } else if (index === 1) {
                        strResult = `${v2} / ${strResult}`;
                        return v2 / v1;
                    } else if (index === 2) {
                        strResult = `${v2} * ${strResult}`;
                        return v2 * v1;
                    } else if (index === 3) {
                        strResult = `${v2} - ${strResult}`;
                        return v2 - v1;
                    } else if (index === 4) {
                        strResult = `${v2} + ${strResult}`;
                        return v2 + v1;
                    }
                }, 0);
                strResult += ' = ' + result;
                this.resultNeeded = result;
                this.strResultNeeded = strResult;
                return true;
            },
            getRandomIntInclusive(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
            },
            onShowHint() {
                this.dialogParametres = {
                    visibility: true,
                    title: 'Подсказка',
                    text: 'Правильный ответ: \n' + this. strResultNeeded
                };
            },
            onCancel() {
                this.stopTimer();
                router.push('/');
            },
            onCloseDialog(data) {
                this.dialogParametres.visibility = false;
                if (data.stop) {
                    router.push('/');
                }
            },
            saveState() {
                localStorage.setItem('appVue', JSON.stringify(this.$store.getters.parametres));
            },
        },

        mounted() {
            this.startPlay();
        },

        unmounted() {
            this.stopTimer();
        }
    }
</script>

<style scoped>
    div {
        margin: 0;
        padding: 0;
    }
    h3 {
        margin: 0;
    }
    .page {
        width: 500px;
        border: #bbb 1px solid;
        margin: 20px auto;
        padding: 10px 20px;
        overflow: hidden;
    }
    .timer-box {
        float: right;
        margin-bottom: 5px;
    }
    .formula-box {
        position: relative;
        margin: 10px 0;
    }
</style>