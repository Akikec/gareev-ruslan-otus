import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        parametres: {
            day: 0,
            countCompleted: 0,
            countFailed: 0,
            countAll: 25,
            accuracy: 0,
            timePlay: 0
        },
        config: {
            checkboxSelected: ['Sum', 'Umn', 'Stp'],
            sliderTimerValue: 7,
            sliderDifValue: 5
        }
    },
    getters: {
        day(state) {
            return state.parametres.day;
        },
        countCompleted(state) {
            return state.parametres.countCompleted;
        },
        countFailed(state) {
            return state.parametres.countFailed;
        },
        countAll(state) {
            return state.parametres.countAll;
        },
        accuracy(state) {
            return state.parametres.accuracy;
        },
        timePlay(state) {
            return state.parametres.timePlay;
        },
        checkboxSelected(state) {
            return state.config.checkboxSelected;
        },
        sliderTimerValue(state) {
            return state.config.sliderTimerValue;
        },
        sliderDifValue(state) {
            return state.config.sliderDifValue;
        },
        parametres(state) {
            return state.parametres;
        }
    },
    mutations: {
        updateDay(state, value) {
            state.parametres.day = value;
        },
        updateCountCompleted(state) {
            state.parametres.countCompleted++;
            if (state.parametres.countAll > 0) state.parametres.countAll--;
            state.parametres.accuracy = Math.floor(state.parametres.countCompleted * 100 / (state.parametres.countCompleted + state.parametres.countFailed));
        },
        updateCountFailed(state) {
            state.parametres.countFailed++;
            if (state.parametres.countAll > 0) state.parametres.countAll--;
            state.parametres.accuracy = Math.floor(state.parametres.countCompleted * 100 / (state.parametres.countCompleted + state.parametres.countFailed));
        },
        updateCountAll(state, value) {
            state.parametres.countAll = value;
        },
        updateTimePlay(state, value) {
            state.parametres.timePlay = value;
        },
        updateCheckboxSelected(state, value) {
            state.config.checkboxSelected = value;
        },
        updateSliderTimerValue(state, value) {
            state.config.sliderTimerValue = value;
        },
        updateSliderDifValue(state, value) {
            state.config.sliderDifValue = value;
        },
        clear(state) {
            state.parametres.countCompleted = 0;
            state.parametres.countFailed = 0;
            state.parametres.countAll = 25;
            state.parametres.accuracy = 0;
        },
        updateParametresFromJSON(state, json) {
            state.parametres = JSON.parse(json);
            if (!state.parametres.day) {
                state.parametres.day = Date.now();
            }
        }
    },
    actions: {},
});

export default store;