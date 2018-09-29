import Vue from 'vue';
import http from './http';
import { Button, Menu, MenuItem, Submenu, Input, Dropdown, DropdownMenu, DropdownItem, Row, Col } from 'element-ui';

import 'izitoast/dist/css/iziToast.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';

Vue.use(Button);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Input);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Row);
Vue.use(Col);

Vue.prototype.$http = http;
