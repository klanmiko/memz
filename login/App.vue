<template>
  <div class="uk-container-small outer">
    <h1>Login to Access Entertainment</h1>
    <div id="login-alert" class="uk-alert-danger" v-if="loginStatus.loginError || loginStatus.loginInfo" v-bind:class = "{'uk-alert-danger': loginStatus.loginError, 
        'uk-alert-info': loginStatus.loginInfo}" uk-alert>
        <p>{{loginStatus.loginMessage}}</p>
    </div>
    <div>
        <form class="uk-form-horizontal" v-on:submit.prevent = "submit()">
            <label class="uk-form-label">Username</label>
            <div class="uk-form-controls">
                <input class="uk-input" type="text" v-model="username" required placeholder="Username">
            </div>
            <label class="uk-form-label">Password</label>
            <div class="uk-form-controls">
                <input class="uk-input" type="password" v-model="password" required placeholder="password">
            </div>
            <hr>
            <div class="level">
                <span :class="{active: state=='login'}">Login</span>
                <label class="switch">
                    <input id="toggle" type="checkbox" v-model="checked">
                    <span class="slider round"></span>
                </label>
            <span :class="{active: state=='register'}">Register</span></div>
            <div id="switched">
                <div v-if="state == 'register'">
                    <div id="email-alert" v-if="!emailValid" class="uk-alert-danger" uk-alert>
                        <p>That email address is invalid</p>
                     </div>
                     <label class="uk-form-label">Email</label>
                    <div class="uk-form-controls">
                        <input class="uk-input" type="email" v-model.lazy="email" required placeholder="Email">
                    </div>
                    <button class="uk-button uk-button-primary">Register</button>
                </div>
                <div v-if="state == 'login'">
                    <button class="uk-button uk-button-primary">Login</button>
                </div>
            </div>
        </form>
      </div>
  </div>
</template>

<script>
import UIKit from 'uikit';
export default {
    data () {
        return {
            checked: false,
            username: '',
            password: '',
            email: '',
            loginStatus: {
                loginError: false,
                loginInfo: false,
                loginMessage: ""
            },
            emailValid: true
        }
    },
    watch: {
        email: function() {
            this.emailValid = true;
        }
    },
    computed: {
        state: function() {
            return this.checked ? "register" : "login";
        }
    },
    methods: {
        submit: function() {
            if(this.state == 'register') {
                if(this.email.includes('@') && this.email.slice(this.email.indexOf('@') + 1).indexOf('.') > 1){
                    this.$http.post('/api/register', {username: this.username, password: this.password, email: this.email}).then(
                        response => {
                            if(response.body.redirect) window.location.href = response.body.redirect;
                        },
                        response => {
                            console.log(response);
                        }
                    );
                }
                else {
                    this.emailValid = false;
                }
            }
            else if(this.state == 'login') {
                this.$http.post('/login'+window.location.search,  {username: this.username, password: this.password}).then(
                    response => {
                        console.log(response);
                        window.location.href = response.body.redirect;
                    },
                    response => {
                        console.log(response.body.message);
                    }
                );
            }
        },
    }
}
</script>

<style lang="scss">
    @import "~uikit/src/scss/variables-theme.scss";
    @import "~uikit/src/scss/mixins-theme.scss";

// 4. Import UIkit.
    @import "~uikit/src/scss/uikit-theme.scss";
    .outer {
        margin: 20px;
    }
    .level {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .level > span {
        margin-left: 20px;
        margin-right: 20px;
        color: #a4a4a4;
    }
    .level > span.active {
        color: black;
    }
     /* The switch - the box around the slider */
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    /* Hide default HTML checkbox */
    .switch input {display:none;}

    /* The slider */
    .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    }

    .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    }

    input:checked + .slider {
    background-color: #2196F3;
    }

    input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
    border-radius: 34px;
    }

    .slider.round:before {
    border-radius: 50%;
    } 
</style>
