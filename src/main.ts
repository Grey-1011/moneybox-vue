import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';

import {Button, MessageBox, Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);
Vue.use(Button);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

window.onload = function () {
    setTimeout(function () {
        window.scrollTo(0, 200);
    }, 0);
};

if (document.documentElement.clientWidth > 500) {
    window.alert('请使用手机打开本页面，以保证浏览效果');
    const img = document.createElement('img');
    img.src = './qrcode.png';
    img.style.position = 'fixed';
    img.style.left = '50%';
    img.style.top = '50%';
    img.style.transform = 'translate(-50%,-50%)';
    img.style.boxShadow = '0 0 10px rgba(0,0,0,.5)';
    document.body.appendChild(img);
}