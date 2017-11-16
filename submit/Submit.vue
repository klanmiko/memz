<<template>
  <div class="uk-margin uk-child-width-1-2@m uk-grid-divider" uk-grid>
    <div>
        <form class="uk-padding">
            <legend class="uk-legend"> Post Title</legend>
            <div class="uk-margin">
                <input v-model="title" class="uk-input uk-width-1-1" required type="text" placeholder="A creative title" />
            </div>
            <div class="uk-flex uk-flex-left uk-flex-top">
                <div class="uk-margin uk-width-1-2" uk-form-custom="target: true">
                    <input @change="changeImg" type="file"/>
                    <input id="toggle" type="text" class="uk-input" required disabled placeholder="Select Image"/>
                </div>
                <button @click="upload" class="uk-button uk-button-primary uk-width-1-4">Submit</button>
            </div>
        </form>
        <progress id="progressbar" class="uk-progress" value="0" max="100" hidden></progress>
    </div>
    <div class="margins">
        <Card :link="'#'" :title="title" :commentCount="commentCount" :points="points" :vote="voted" :img="img || require('../src/assets/logo.png')">
        </Card>
    </div>
  </div>
</template>

<script>
import Card from '../src/Card.vue'
import UIKit from 'uikit'
import $ from 'jquery'
export default {
    data () {
        return {
            title: "",
            points: 0,
            commentCount: 0,
            voted: false,
            img: null
        }
    },
    components: {
        Card
    },
    methods: {
        changeImg: function (event) {
            var input = event.target;
            if(input.files && input.files[0])
            {
                var reader = new FileReader();
                var self = this;
                reader.onload = function(e) 
                {
                    self.img = e.target.result;
                }
                reader.readAsDataURL(input.files[0]);
            }
        },
        upload: function () {
            if(this.img === null) {
                $('#toggle')[0].removeAttribute('disabled');
            }
            if(this.img === null || this.title === "")
            {
                return;
            }

            var bar = $("#progressbar")[0];
            UIKit.upload('form', {
                url: '/submit',
                multiple: false,
                params: {
                    title: this.title
                },

                beforeSend: function() { console.log('beforeSend', arguments); },
                beforeAll: function() { console.log('beforeAll', arguments); },
                load: function() { console.log('load', arguments); },
                error: function() { UIKit.notification('error', arguments); },
                complete: function() { console.log('complete', arguments); },

                loadStart: function (e) {
                    console.log('loadStart', arguments);

                    bar.removeAttribute('hidden');
                    bar.max =  e.total;
                    bar.value =  e.loaded;
                },

                progress: function (e) {
                    console.log('progress', arguments);

                    bar.max =  e.total;
                    bar.value =  e.loaded;

                },

                loadEnd: function (e) {
                    console.log('loadEnd', arguments);

                    bar.max =  e.total;
                    bar.value =  e.loaded;
                },

                completeAll: function () {
                    console.log('completeAll', arguments);

                    setTimeout(function () {
                        bar.setAttribute('hidden', 'hidden');
                    }, 1000);
                    UIKit.notification("upload Completed");
                }
            });
        }
    }
}
</script>

<style scoped>
  legend {
      text-align: left;
      padding-left: 15px;
  }
  .margins {
      padding-right: 60px;
  }
</style>
