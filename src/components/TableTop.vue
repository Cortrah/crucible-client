<template>
    <div id="stage">
        <p id="pot">
            Pot:
                <span id="gogo" v-show="displayPot" class='animated' transition="bounce">
                    {{ potValue }}
                </span>
            <br/>
            <button @click='updatePot(20)'>Update Pot</button>
        </p>
        <template v-for='player in players'>
            <player :name="player.name"
                    :avatar="player.avatar"
                    :bones="player.bones"
                    :dealer="player.dealer">
            </player>
        </template>
    </div>
    <br/>
    <br/>
</template>

<script type="text/babel">
    import Vue from 'vue'
    import Player from './Player'
    import DealersChoiceTable from './DealersChoiceTable'

    let bus = new Vue();

    let store = new Vue({
        data () {
            return {
                bus: bus,
                dogAvatars: [
                    { id: '1', name: 'Cavalier', img: '../static/dog1.png' },
                    { id: '2', name: 'Mini Schnauser', img: '../static/dog2.png' },
                    { id: '3', name: 'Boston Terrier', img: '../static/dog3.png' },
                    { id: '4', name: 'Border Collie', img: '../static/dog4.png' }
                ],
                botAvatars: [
                    { id: '1', name: 'Protobot', img: '../static/robot1.png' },
                    { id: '2', name: 'Streambot', img: '../static/robot2.png' },
                    { id: '3', name: 'Grammarbot', img: '../static/robot3.png' },
                    { id: '4', name: 'Lambdabot', img: '../static/robot4.png' }
                ],
                players: [
                    {
                        'name': 'Jim',
                        'dealer': true,
                        'host': false,
                        'avatar': 'static/dog1.png',
                        'bones': 100,
                        'betting': 60
                    },
                    {
                        'name': 'Whitey',
                        'dealer': false,
                        'host': false,
                        'avatar': 'static/robot1.png',
                        'bones': 200,
                        'betting': 0
                    },
                    {
                        'name': 'Dan',
                        'dealer': false,
                        'host': false,
                        'avatar': 'static/dog2.png',
                        'bones': 300,
                        'betting': 0
                    },
                    {
                        'name': 'Kyle',
                        'dealer': false,
                        'host': false,
                        'avatar': 'static/dog3.png',
                        'bones': 400,
                        'betting': 0
                    },
                    {
                        'name': 'Bob',
                        'dealer': false,
                        'host': false,
                        'avatar': 'static/robot2.png',
                        'bones': 100,
                        'betting': 0
                    },
                    {
                        'name': 'Cort',
                        'dealer': false,
                        'host': true,
                        'avatar': 'static/robot3.png',
                        'bones': 200,
                        'betting': 0
                    }
                ],
                tables: [],
                messages: []
            };
        },
        methods: {
            createTable (tableName) {
                // this.tables.push(new DealersChoiceTable(tableName));
            },
            // logout () {
            //     this.loggedIn = false;
            //     this.bus.$emit('logout-event');
            // }
        }
    });


    export default {
        el: function () {
            return '#tabletop';
        },
        props: ['store'],
        components: {
            Player, DealersChoiceTable
        },
        data: function () {
            return {
                _cid: '1',
                displayPot: false,
                currentPlayer: 0,
                players: this.store.players
            }
        },
        computed: {
            potValue: function () {
                var total = 0;
                for (var i = 0; i < this.store.players.length; i++) {
                    total = total + this.store.players[i].betting;
                }
                return total;
            }
        },
        events: {
            'check': function (name) {
            },
            'bet': function (name, bet) {
                this.players[this.currentPlayer].betting += parseInt(bet);
                this.displayPot = !this.displayPot;
            },
            'call': function (name, bet) {
                this.players[this.currentPlayer].betting += parseInt(bet);
                this.displayPot = !this.displayPot;
            },
            'raise': function (name, bet) {
                this.players[this.currentPlayer].betting += parseInt(bet);
                this.displayPot = !this.displayPot;
            },
            'fold': function (name) {
            }
        },
        methods: {
            updatePot: function (amt) {
                this.players[this.currentPlayer].betting += amt;
                this.displayPot = !this.displayPot;
            }
        }
    }
</script>

<style>
    #pot {
        align-items: center;
        height: 40px;
    }
</style>
