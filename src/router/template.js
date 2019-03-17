import CreateTemplate from '../pages/template-manage/CreateTemplate';
import TemplateList from '../pages/template-manage/TemplateList';
import UpdateTemplate from '../pages/template-manage/UpdateTemplate';
import ViewTemplate from '../pages/template-manage/ViewTemplate';
import TemplateListByTag from '../pages/template-manage/TemplateListByTag';

import { ACTIVE_MENU } from '../store/mutation-types';
import store from '../store/index';

export default [
  {
    path: 'TemplateList',
    component: TemplateList,
    beforeEnter (to, from, next) {
      store.commit(ACTIVE_MENU, to.fullPath);
      next();
    }
  },
  {
    path: 'CreateTemplate',
    component: CreateTemplate
  },
  {
    path: 'UpdateTemplate/:id',
    component: UpdateTemplate
  },
  {
    path: 'ViewTemplate/:id',
    component: ViewTemplate
  },
  {
    path: 'TemplateListByTag',
    component: TemplateListByTag
  },
  {
    path: '',
    redirect: 'TemplateList'
  },
  {
    path: '**',
    redirect: 'TemplateList'
  }
];
