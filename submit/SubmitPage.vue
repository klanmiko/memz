<<template>
<div class="uk-container">
    <h1 class="center">Submit a Post</h1>
    <submit></submit>
    <slider></slider>
</div>
</template>

<script>
import Submit from './Submit.vue'
import Slider from './Slider.vue'
export default {
    data () {
        return {

        }
    },
    components: {
        'submit': Submit,
        'slider': Slider
    }
}
</script>

<style lang="scss" >
// 1. Your custom variables and variable overwrites.
// 2. Import default variables and available mixins.
@import "~uikit/src/scss/variables-theme.scss";
@import "~uikit/src/scss/mixins-theme.scss";

// 3. Your custom mixin overwrites.

// 4. Import UIkit.
@import "~uikit/src/scss/uikit-theme.scss";
.center{ 
    text-align: center;
}
.uk-container {
    margin-top: 20px;
}
</style>
