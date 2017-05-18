<template>
    <button @click="click(val, index)"
            :class="{'sel': isSel}">
        {{ faceVal }}
    </button>
</template>

<script type="text/babel">
    import Vue from 'vue';

    export default {
        name: "Simple",
        props: {
            faceVal: {
                type: String,
                default: "ok"
            },
        },
        data () {
            return {
                isSel: false
            }
        },
        methods: {
            click: function (val, index) {
                this.faceVal = "yar";
                this.isSel = true;
                this.$emit('input', true)
            }
        }
    }
</script>

<style scoped>
    .unsel {
        box-shadow: none;
    }

    .sel {
        box-shadow: 0 0 1em #345cee;
        color: #bc22ca;
    }
</style>
