<template>
    <div class="client">
        <h2>{{ msg + st.thing1 }}</h2>
    </div>
</template>

<script>
    export default {
        name: 'client',
        props: ['st'],
        data () {
            return {
                msg: 'client'
            }
        }
    }
</script>

<style>
</style>
