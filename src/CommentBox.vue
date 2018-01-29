<template>
  <div class="iflex">
    <textarea class="uk-textarea" v-model="comment" type="text" placeholder="Add a comment."/>
    <button v-bind:class="{hidden: this.comment==''}" class="uk-button uk-button-primary" @click="notify">Add Comment</button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            comment: ""
        }
    },
    methods: {
        notify() {
            this.$emit("update:commentText", this.comment);
        }
    }
}
</script>

<style scoped>
    .iflex {
        display: inline-flex;
        flex-basis: 100%;
    }
    textarea {
        flex-basis: 100%;
        flex-shrink: 1;
    }
    button{
        width: auto;
        white-space: nowrap;
    }
    button.hidden {
        display: none;
    }
</style>
