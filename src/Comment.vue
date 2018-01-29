<template>
    <div>
        <article class="uk-comment">
            <header class="uk-comment-header">
                <h5>{{user.name}}</h5>
                <img class="uk-comment-avatar" :src="user.img" :alt="user.name">
                <h4 class="uk-comment-title">{{title}}</h4>
            </header>
            <div class="uk-comment-body">{{text}}</div>
            <footer>
                <ul class="uk-comment-meta uk-subnav">
                    <li><a @click="commentBox">Reply</a></li>
                </ul>
            </footer>
        </article>
        <ul>
            <li :key="comment.id" v-for="comment in comments">
                <comment :title="comment.title" :user="comment.user" :text="comment.text"></comment>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['title','user','text','comments'],
    name: 'comment',
    methods: {
        commentBox: () => {
            
        }
    }
}
</script>

<style>

</style>
