<template>
    <div class="monitor">
        <h1>{{ msg }}</h1>
        <client id="client1" :st="st" ></client>
        <client id="client2" :st="st" ></client>
    </div>
</template>

<script>
    import Client from './Client'

    export default {
        name: 'monitor',
        components: {Client},
        data () {
            return {
                st: {
                    thing1: 1,
                    thing2: 2,
                },
                msg: 'monitor'
            }
        }
    }
</script>

<style scoped>
</style>
