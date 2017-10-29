Register.vue<template>
    <div id="stage">
        <h1>{{ title }}</h1>

        <h2>Tables</h2>
        <ul id="gameList">
            <li v-for="table in tables">
                {{ table.name }}
                <button  @click="joinTable(table)">
                    Join
                </button>
            </li>
        </ul>
        <p v-if="tables.length == 0">No Tables Yet</p>
        <button @click="hostTable()"> Host a table </button>
        <br/>
        <br/>
    </div>
</template>

<script type="text/babel">
    import store from '../../store/store.js'

    export default {
        name: 'Lobby',
        data () {
            return {
                title: 'Lobby',
            }
        },
        computed: {
            tables() {
                return this.$store.state.tables;
            },
            players(){
                return  this.$store.state.players;
            },
            messages() {
                return this.$store.state.messages;
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
