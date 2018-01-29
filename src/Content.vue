<<template>
<div @scroll="loadMore" class="uk-container uk-container-small nopad">
  <Card v-for="post in posts" :key="post.link" :vote="post.voted" :link="post.link" 
        :img="post.file" :title="post.title" :points="post.voteCount" :commentCount="post.commentCount"></Card>
</div>
</template>

<script>
import Card from './Card.vue'
export default {
    data () {
        return {
            posts: [
            ],
        }
    },
    components: {
        Card
    },
    methods: {
        loadMore: function (event) {
            console.log(event);
            this.$http.get('/api/posts', {params: {id: this.posts[this.posts.length]._id}}).then(response => {
                this.posts.concat(response.body.posts);
            }, error => {
                console.error(error);
            });
        }
    },
    created: function () {
        this.$http.get('/api/posts').then(response => {
            console.log(response);
            response.body.posts.forEach(element => {
                element.voted = element.voted || false;
                if(element.voted) element.voteCount--;
                element.file = "/api/image/" + element.file;
                element.link = element._id;
            });
            this.posts = response.data.posts;
        }, err => {
            console.error(err);
        });
    }
}
</script>

<style>
  .nopad{
      padding-left: 0px;
      padding-right: 0px;
  }
</style>
