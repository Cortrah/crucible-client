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
                this.$bus.$emit('goto-table-top');
            },
            hostTable: function () {
                this.$bus.$emit('goto-host');
            },
        }
    }
</script>
