<template>
    <div class="page">
        <h2 class="font-weight-bold mb-3">Привет!</h2>
        <p>
            Добро пожаловать на {{ countDay }} тренировочный день.<br/>
            Ваш последний результат - решено {{ countCompleted }} из 25<br/>
            Общая точность - {{ accuracy }}%
        </p>
        <Config />
        <div class="btn-box-1">
            <v-btn to="/play" color="primary" dark>Play!</v-btn>
        </div>
    </div>
</template>

<script>
    import Config from './Config';
    import { mapGetters } from "vuex";

    export default {
        name: "PageConfig",

        components: {
            Config
        },

        computed: {
            ...mapGetters([
                'day',
                'countCompleted',
                'countAll',
                'accuracy'
            ]),
            countDay() {
                return Math.ceil((Date.now() - this.$store.getters.day) / (24* 3600 * 1000));
            }
        },

        methods: {
            saveState() {
                localStorage.setItem('appVue', JSON.stringify(this.$store.getters.parametres));
            },
            loadState() {
                if (localStorage.getItem('appVue')) {
                    this.$store.commit('updateParametresFromJSON', localStorage.getItem('appVue'));
                }
            },
        },

        created() {
            this.loadState();
        },

        mounted() {
            this.saveState();
        },
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
        width: 400px;
        border: #bbb 1px solid;
        margin: 20px auto;
        padding: 10px 20px;
        overflow: hidden;
    }
    .btn-box-1 {
        float: right;
        margin-bottom: 5px;
    }
</style>