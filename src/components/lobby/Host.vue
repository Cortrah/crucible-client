<template>
    <div id="stage">
        <h1>{{ title }}</h1>

        <label for="tableName">Name</label>
        <input id="tableName" v-model="tableName" placeholder="Name">

        <p>
            choose some settings
        </p>
        <p>
           invite some players
        </p>
        <button @click='hostGame()'
                class="pure-button pure-button-primary">
            Create Table
        </button>
    </div>
</template>

<script type="text/babel">

    export default {
        name: 'Host',
        props: ['store'],
        data () {
            return {
                title: 'Host a Table',
                tableName: "X's Table"
            }
        },
        methods: {
            hostGame: function () {
                // this.$children;
                this.store.createTable(this.tableName);
                let elem = document.getElementById('stage');
                window.TweenMax.to(elem, 0.5,
                    {height: 400, onComplete: this.go('tabletop')});
            },
            go: function (route) {
                this.$route.router.go('/' + route);
            }
        }
    }
</script>
