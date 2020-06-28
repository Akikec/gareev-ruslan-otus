<template>
    <div id="element-0" class="cell-number" :style="styleInput">
        <v-text-field v-model.trim="valueInput" :rules="rules" @focus="$emit('focus', index )">
            <v-icon slot="prepend" small>{{ dataInput.icon }}</v-icon>
        </v-text-field>
    </div>
</template>

<script>
    export default {
        name: "InputElement",

        props: {
            dataInput: {
                type: Object,
                default: function () {
                    return {
                        active: false,
                        type: '',
                        icon: '',
                        value: 0 }
                },
                required: true,
                validator: value => {
                    return typeof value.active === 'boolean' && (typeof value.type === 'string' || typeof value.type === 'undefined')
                        && typeof value.icon === 'string' && typeof value.value === 'number' && !Number.isNaN(value.value);
                }
            },
            index: {
                type: Number,
                default: 0,
                required: true
            }
        },

        data: () => ({
            rules: [
                value => !!value || 'Required',
                value => {
                    const pattern = /^[0-9]+$/;
                    return pattern.test(value) || 'Invalid number';
                },
            ]
        }),

        computed: {
            valueInput: {
                get() {
                    return this.dataInput.value === 0 ? '' : this.dataInput.value;
                },
                set(value) {
                    const v = value.trim();
                    this.$emit('change', { value: this.checkNumber(v) ? +v : 0, index: this.index });
                }
            },
            styleInput: {
                get() {
                    return this.dataInput.active ? { 'display':'block' } : { 'display':'none' };
                }
            }
        },

        methods: {
            checkNumber(value) {
                const pattern = /^[0-9]+$/;
                return pattern.test(value);
            }
        }
    }
</script>

<style scoped>
    .cell-number {
        float: left;
        margin-right: 3px;
        height: 40px;
        width: 75px;
    }
    .v-icon {
        margin-top: 5px;
    }
</style>