<template>
  <div id="app">
    <app-header></app-header>
    <login-prompt></login-prompt>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './Header.vue'
import LoginPrompt from './LoginPrompt.vue'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    'app-header': Header,
    'login-prompt':LoginPrompt
  }
}
</script>

<style lang="scss">
$navbar-background: #E7F6C0;
$navbar-nav-item-color: #380202;
// 2. Import default variables and available mixins.
@import "~uikit/src/scss/variables-theme.scss";
@import "~uikit/src/scss/mixins-theme.scss";

// 4. Import UIkit.
@import "~uikit/src/scss/uikit-theme.scss";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
