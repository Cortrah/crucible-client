<template>
    <div class="Card">
        <span>{{ label }}</span>
        <span>{{ cost }}</span>
        <span>{{ type }}</span>
        <img :src="face">
        <span>{{ effect }}</span>
    </div>
</template>

<script type="text/babel">

    export default {
        name: "Card",
        props: ["label", "cost", "type", "face", "effect"],
        methods: {
            select(e){
                return this;
            },
            apply: function(target){
                return target.apply(this);
            }
        }
    }

</script>

<style scoped>
    .Card {
        width: 130px;
        height: 210px;
        display: flex;
        flex-direction: column;
    }

    img {
        width: 100px;
        height: 100px;
    }
</style>
