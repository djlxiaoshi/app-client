import Vue from 'vue';
import Router from 'vue-router';
import http from './http';
import sweetAlert from 'assets/js/utils/alert.js';
import { Button, Menu, MenuItem, Submenu, Input,
  Dropdown, DropdownMenu, DropdownItem, Row, Col,
  Form, FormItem, Card, Upload, Tag, Checkbox, CheckboxGroup,
  MessageBox, Notification, Message, Loading
} from 'element-ui';

import './resize';
import 'izitoast/dist/css/iziToast.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import '../css/common.less';
import 'nprogress/nprogress.css';

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
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Card);
Vue.use(Upload);
Vue.use(Tag);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);

Vue.use(Router);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.prototype.$http = http;
Vue.prototype.$alert = sweetAlert;
