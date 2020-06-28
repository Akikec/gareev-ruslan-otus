<template>
    <v-dialog width="300" v-model="visibilityStatus">
        <v-card>
            <v-card-title class="headline grey lighten-2 title"
                          primary-title>
                {{ title }}
            </v-card-title>
            <v-card-text class="text">
                <nl2br tag="p" :text="text" />
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary"
                       text
                       @click="close()">
                    Закрыть
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "DialogWindow",

        props: {
            dialog: {
                type: Object,
                default: function () {
                    return {
                        visibility: false,
                        title: 'Информация',
                        text: '',
                        stop: false
                    }
                },
                validator: value => {
                    return (typeof value.visibility === 'boolean' && typeof value.title === 'string')
                        && typeof value.text === 'string' && (typeof value.stop === 'boolean' || typeof value.stop === 'undefined');
                }
            }
        },

        computed: {
            visibilityStatus() {
                return this.dialog.visibility;
            },
            title() {
                return this.dialog.title;
            },
            text() {
                return this.dialog.text;
            }
        },

        methods: {
            close() {
                this.$emit('close', { stop: this.dialog.stop });
            }
        }
    }
</script>

<style scoped>
    .v-dialog > .v-card > .v-card__title {
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .v-dialog > .v-card > .v-card__text {
        padding-top: 15px;
        font-size: 16px;
    }
</style>