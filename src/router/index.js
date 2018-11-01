import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login';
import Home from '@/views/Home';
//@代表 src的绝对路劲
//@ 是在build/webpack.base.conf.js中农配置的
//为什么可以省略.vue  在build/webpack.base.conf.js中配置的
// import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);


export default new Router({
    routes: [
        { name: 'Home', path: '/', component: Home },
        { name: 'Login', path: '/login', component: Login }
    ]
});