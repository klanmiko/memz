<<template>
<div @scroll="loadMore" class="uk-container uk-container-small nopad">
  <Card v-for="post in posts" :key="post.link" :vote="post.voted" :link="post.link" 
        :img="post.img" :title="post.title" :points="post.points" :commentCount="post.commentCount"></Card>
</div>
</template>

<script>
import Card from './Card.vue'
export default {
    data () {
        return {
            posts: [
                {
                    link: "",
                    voted: false,
                    img: require("./assets/logo.png"),
                    points: 100,
                    title: "Biggest Meme",
                    commentCount: 10
                }
            ],
            scroll: 0
        }
    },
    components: {
        Card
    },
    methods: {
        loadMore: function (event) {
            console.log(event);
            this.$http.get('/api/posts', {body: {scroll: scroll}}).then(response => {
                console.log(response);
            }, error => {
                console.error(error);
            });
        }
    },
    created: function () {
        this.$http.get('/api/posts').then(response => {
            console.log(response);

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
