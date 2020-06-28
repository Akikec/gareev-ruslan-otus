<template>
    <v-chip color="primary" outlined label class="font-weight-bold title">
        {{ time }}
        <v-icon right>mdi-timer</v-icon>
    </v-chip>
</template>

<script>
    export default {
        name: "Timer",

        props: {
            time: {
                type: String,
                default: ''
            }
        },
    }
</script>
