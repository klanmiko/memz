<template>
  <div id="loginPrompt" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">You need to be logged in to do that.</h2>
        <p class="uk-text-center">
            <button class="uk-button uk-button-default uk-modal-close" type="button">No, I'm Lame</button>
            <a class="uk-button uk-button-primary" type="button" href="/login">Join!</a>
        </p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
 .uk-button-primary a {
    color: white;
 }
</style>
