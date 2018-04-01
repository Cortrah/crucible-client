<template>
    <div id="stage">

        <h1>{{ title }}</h1>

        <label for="tableName">
            Name
        </label>
        <input id="tableName"
               v-model="tableName"
               placeholder="Name">

        <p>choose some settings</p>

        <p>invite some players</p>

        <button @click='createTable()'
                class="pure-button
                pure-button-primary">
            Create Table
        </button>

    </div>
</template>

<script type="text/babel">

    export default {
        name: 'host',
        data () {
            return {
                title: 'Host a Table',
                tableName: "X's Table"
            }
        },
        methods: {
            createTable: function () {
                this.$bus.$emit('create-table', {name: this.tableName});
            }
        }
    }
</script>
