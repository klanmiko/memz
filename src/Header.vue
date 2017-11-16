<<template>
    <nav class="uk-navbar-container" uk-navbar uk-sticky>
        <div class="uk-navbar-left">
            <ul class="uk-navbar-nav">
                <li class="uk-active uk-logo">
                    <router-link to="/">Memez</router-link>
                </li>
                <li>
                    <router-link to="/about">About</router-link>
                </li>
                <li>
                    <a href="/submit">Submit</a>
                </li>
            </ul>
        </div>
        <div class="uk-navbar-right">
            <div v-if="this.$store.usrData"></div>
            <div v-else>
                <a class="uk-button uk-button-default login" href="/login">Login</a></button>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data () {
        return {
        }
    }
}
</script>

<style lang="scss" scoped>
    .login {
        margin-right: 10px;
        border: 1px solid #959595;
        border-radius: 20px;
    }
</style>

