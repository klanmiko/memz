<<template>
<div class="uk-container">
  <div class="uk-card uk-card-default uk-box-shadow-small">
    <div class="uk-card-header">
        <h3 class="uk-card-title">{{this.$store.state.activePost.title}}</h3>
    </div>
    <div class="uk-card-body">
        <div class="uk-card-media-top">
            <img v-bind:src="this.$store.state.activePost.photo">
        </div>
    </div>
  </div>
  <div class="add-comment">
    <transition name='fade'>
      <a key="stale" v-if="!voted" uk-icon="icon: chevron-up" v-on:click="upvote" class="uk-button uk-button-default">
      </a>
      <a key="upvoted" v-else uk-icon="icon: check" v-on:click="upvote" class="uk-button uk-button-default">
      </a>
    </transition>
    <comment-box @update:commentText="addComment"/>
  </div>
  <ul class="uk-comment-list">
    <li v-for="comment in this.$store.state.activePost.comments">
      <comment :title="comment.title" :user="comment.user" :text="comment.text" :comments="comment.comments"></comment>
    </li>
  </ul>
</div>
</template>

<style scoped>
  .add-comment {
    display: flex;
    height: 5em;
    margin-top: 1em;
  }
  .add-comment textarea {
    height: inherit;
    resize: none;
  }
  a.uk-icon >>> svg{
    padding-top: 2em;
  }
</style>

<script>
import Comment from './Comment.vue'
import CommentBoxVue from './CommentBox.vue';
import UIKit from 'uikit'
export default {
  components: {
    'comment': Comment,
    'comment-box': CommentBoxVue
  },
  methods: {
    displayModal(fn){
      if(this.$store && !this.$store.state.usrData) {
          var modal = UIKit.modal('#loginPrompt', {});
          modal.show();
          return;
      }
      fn();
    },
    addComment(comment) {
      this.displayModal(() => {
        let obj = {comment: {text: comment}};        
        this.$store.dispatch('comment', obj);
      });
    },
    upvote: function() {
      this.displayModal(() => {
        this.$http.get("/api" + this.$route.path + "/vote").then(null,() => {

        })
      });
    }
  },
  created() {
    this.$store.dispatch('loadActive', this.$route.params.id);
  },
  computed: {
    voted: () => {
      return true;
    },
  }
}
</script>
