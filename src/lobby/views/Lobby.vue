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

        <button @click="hostTable()">
            Host a table
        </button>
        <br/>
        <br/>
    </div>
</template>

<script type="text/babel">
    import Goto from '../../main/Goto';
    import JoinTable from '../commands/JoinTable';

    export default {
        name: 'lobby',
        data () {
            return {
                title: 'Lobby',
            }
        },
        computed: {
            tables() {
                return this.$store.state.lobby.tables;
            },
            actors(){
                return  this.$store.state.lobby.players;
            },
            messages() {
                return this.$store.state.lobby.messages;
            }
        },
        methods: {
            joinTable: function (table) {
                this.$bus.$emit('onDispatch', new JoinTable({table: table}));
            },
            hostTable: function () {
                this.$bus.$emit('onDispatch', new Goto({destination:"Host"}));
            },
        }
    }
</script>
