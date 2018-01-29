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
            <div v-if="usrData">
                <img class="profile-pic" :src="logo" />
                <span>
                    {{$store.state.usrData.username}}
                    (<a href="/logout">logout</a>)
                </span>
            </div>
            <div v-else>
                <a class="uk-button uk-button-default login" @click="go">Login</a></button>
            </div>
        </div>
    </nav>
</template>

<script>
import logo from './assets/logo.png'
export default {
    data () {
        return {
            logo: logo
        }
    },
    computed: {
        usrData: function() {
            return this.$store.state.usrData
        }
    },
    methods: {
        go() 
        {
            window.location.href = "/login?back=" + this.$route.path;
        }
    }
}
</script>

<style lang="scss" scoped>
    ul.uk-navbar-nav > li > a {
        font-size: 18px;
    }
    .login {
        margin-right: 10px;
        border: 1px solid #959595;
        border-radius: 20px;
    }
    img.profile-pic {
        width: 64px;
        height: 64px;
    }
</style>

