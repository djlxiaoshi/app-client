import Vue from 'vue';
import Cube from 'cube-ui';
import http from './http';
import 'izitoast/dist/css/iziToast.css';
import './directive';

Vue.use(Cube);
Vue.prototype.$http = http;
