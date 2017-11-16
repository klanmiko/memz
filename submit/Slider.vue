<template>
  <div data-uk-slider>

    <div class="uk-slider-container">
        <ul id="slider" class="uk-slider uk-grid-width-medium-1-4 uk-grid-width-small-1-2 uk-grid-width-large-1-5">
            <li :key="post.id" v-for="post in posts">
                <img :src="post.img">
                <p>{{post.title}}</p>
            </li>
        </ul>
    </div>

</div>
</template>

<script>
export default {
    data () {
        return {
            posts: [
            ]
        }
    },
    created: function () {
        this.$http.get('/posts').then(function(result){
            console.log(result);
        }, function(err){
            console.error(err);
        });
    }
}
</script>

<style>
 
</style>
