<template>
  <div class="uk-container-small outer">
    <h1>Login to Access Entertainment</h1>
    <div>
        <form v-on:submit = "submit()">
            <input class="uk-input" type="text" required placeholder="Username">
            <input class="uk-input" type="password" required placeholder="password">
            <hr>
            <button class="uk-button uk-button-primary">Login</button>
        </form>
      </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            state: 'login',
            username: '',
            password: ''
        }
    },
    methods: {
        submit: function() {
            
        }
    }
}
</script>

<style lang="scss">
    @import "~uikit/src/scss/variables-theme.scss";
    @import "~uikit/src/scss/mixins-theme.scss";

// 4. Import UIkit.
    @import "~uikit/src/scss/uikit-theme.scss";
    .outer {
        margin-top: 20px;
    }
</style>
