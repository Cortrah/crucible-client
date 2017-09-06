Register.vue<template>
    <div id="stage">
        <h1>{{ title }}</h1>

        <h2>Tables</h2>
        <ul id="gameList">
            <li v-for="table in tables">
                {{ table.name }} <button  @click="joinTable(table)">Join</button>
            </li>
        </ul>
        <p v-if="tables.length == 0">No Tables Yet</p>
        <button @click="hostTable()"> Host a table </button>
        <br/>
        <br/>
    </div>
</template>

<script type="text/babel">

    export default {
        name: 'Lobby',
        props: ['store'],
        data () {
            return {
                title: 'Lobby',
                tables: this.store.tables,
                players: this.store.players,
                messages: this.store.messages
            }
        },
        methods: {
            joinTable: function (table) {
                // this.$children;
                let elem = document.getElementById('stage');
                window.TweenMax.to(elem, 0.5,
                    {height: 400, onComplete: this.go('tabletop')});
            },
            hostTable: function () {
                // this.$children;
                let elem = document.getElementById('stage');
                window.TweenMax.to(elem, 0.5,
                    {height: 400, onComplete: this.go('host')});
            },
            go: function (route) {
                this.$router.push('/' + route);
            }
        }
    }
</script>
