<template>
  <div class="monitor">
    <h1>{{ msg }}</h1>
    <client id="client1"></client>
    <client id="client2"></client>
  </div>
</template>

<script>
  import Client from './Client'

  export default {
    name: 'monitor',
    components: {Client},
    data () {
      return {
        msg: 'monitor'
      }
    }
  }
</script>

<style scoped>
</style>
