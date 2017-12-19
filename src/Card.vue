<template>
    <div class="uk-card uk-card-default uk-box-shadow-small">
        <div class="uk-card-header">
            <h3 class="uk-card-title">{{title}}</h3>
        </div>
        <div class="uk-card-body">
            <div class="uk-card-media-top">
                <img v-bind:src="img">
            </div>
        </div>
        <div class="uk-card-footer">
            <span>{{tally}}</span>
            <transition name='fade'>
                <a key="stale" v-if="!voted" uk-icon="icon: chevron-up" v-on:click="upvote" class="uk-button uk-button-default">
                </a>
                <a key="upvoted" v-else uk-icon="icon: check" v-on:click="upvote" class="uk-button uk-button-default">
                </a>
            </transition>
            <span>{{commentCount}}</span>
            <a class="uk-button uk-button-default" uk-icon="icon: comments" v-bind:href="link">

            </a>
        </div>
    </div>
</template>

<script>
import UIKit from 'uikit'
export default {
    name: "Card",
    props: ['vote', 'link', 'commentCount', 'title', 'img', 'points'],
    data () {
        return {
            voted: this.vote
        }
    },
    computed: {
        tally: function() {
            return this.points + this.voted;
        }
    },
    methods: {
        upvote: function () {
            if(!this.$store.state.usrData) {
                var modal = UIKit.modal('#loginPrompt', {});
                modal.show();
                return;
            }
            //TODO make API request
            this.voted = !this.voted
        }
    }
}
</script>

<style>
  .fade-enter-active .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter .fade-leave-to {
    opacity: 0;
  }
  .uk-card .uk-card-header{
      border-bottom: none;
  }
  .uk-card {
      text-align: center;
  }
</style>
