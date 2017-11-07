<!--Not Currently Used-->
<template>
    <svg  x="0px" y="0px"
          width="80px" height="80px"
          viewBox="0 0 80 80">

        <ellipse :fill="fill" :stroke="stroke" cx="5.908"  cy="6" rx="2.5" ry="2.5"/>
        <ellipse :fill="fill" :stroke="stroke" cx="12.921" cy="6" rx="2.5" ry="2.5"/>
        <ellipse :fill="fill" :stroke="stroke" cx="20.956" cy="6" rx="2.5" ry="2.5"/>
        <ellipse :fill="fill" :stroke="stroke" cx="27.99"  cy="6" rx="2.5" ry="2.5"/>
        <ellipse :fill="fill" :stroke="stroke" cx="36.024" cy="6" rx="2.5" ry="2.5"/>
        <ellipse :fill="fill" :stroke="stroke" cx="43.143" cy="6" rx="2.5" ry="2.5"/>
        <ellipse :fill="fill" :stroke="stroke" cx="51.178" cy="6" rx="2.5" ry="2.5"/>
        <ellipse :fill="fill" :stroke="stroke" cx="58.212" cy="6" rx="2.5" ry="2.5"/>
        <ellipse :fill="fill" :stroke="stroke" cx="65.771" cy="6" rx="2.5" ry="2.5"/>
        <ellipse :fill="fill" :stroke="stroke" cx="73.027" cy="6" rx="2.5" ry="2.5"/>

        <rect id="health" x="4" y="15" :fill="fill" :stroke="stroke" width="75" height="8"/>
        <rect id="mana" x="62" y="30" :fill="fill" :stroke="stroke" width="10" height="50"/>
        <rect id="deck" x="8" y="30" :fill="fill" :stroke="stroke" width="50" height="50"/>

    </svg>
</template>

<script>
    export default{
        name: 'Portrait',
        props: {
            'height': {
                default: 80
            },
            'width': {
                default: 80
            }
        },
        data(){
            return {
                width: 80,
                height: 80,
                fill: "#336699",
                stroke: "#336699",
                cy: 6,
                rx: 2.5,
                ry: 2.5,
            }
        },
        components: {}
    }
</script>

<style scoped>
    .Portrait {
    }
</style>
