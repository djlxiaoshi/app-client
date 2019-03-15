import Vue from 'vue';
import Router from 'vue-router';
import http from './http';
import gloabalConfig from './config';
import sweetAlert from 'assets/js/utils/alert.js';
import { Button, Menu, MenuItem, Submenu, Input,
  Dropdown, DropdownMenu, DropdownItem, Row, Col,
  Form, FormItem, Card, Upload, Tag, Checkbox, CheckboxGroup,
  MessageBox, Notification, Message, Loading, Pagination, Dialog,
  Radio, RadioGroup
} from 'element-ui';

import Empty from 'components/common/empty/Empty';

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
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Radio);
Vue.use(RadioGroup);

// 自定义全局公共组件
Vue.component('Empty', Empty);

Vue.use(Router);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.prototype.$http = http;
Vue.prototype.$alert = sweetAlert;
Vue.prototype.$globalConfig = gloabalConfig;
