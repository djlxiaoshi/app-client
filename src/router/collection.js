import CreateCollection from '../pages/collection-system/collection-manage/CreateCollection';
import CollectionList from '../pages/collection-system/collection-manage/CollectionList';
import UpdateCollection from '../pages/collection-system/collection-manage/UpdateCollection';
import ViewCollection from '../pages/collection-system/collection-manage/ViewCollection';
import CollectionListByTag from '../pages/collection-system/collection-manage/CollectionListByTag';
import TagManage from '../pages/collection-system/tag-manage/TagManage';
import NotFoundPage from '../components/common/exception/NotFound';

import routerNameConfig from './config';

export default [
  {
    path: 'CollectionList',
    component: CollectionList,
    meta: {
      activeMenu: '/collection/CollectionList'
    }
  },
  {
    path: 'CreateCollection',
    name: routerNameConfig.CreateCollectionRouterName,
    component: CreateCollection
  },
  {
    path: 'UpdateCollection/:id',
    name: routerNameConfig.UpdateCollectionRouterName,
    component: UpdateCollection
  },
  {
    path: 'ViewCollection/:id',
    name: routerNameConfig.ViewCollectionRouterName,
    component: ViewCollection
  },
  {
    path: 'CollectionListByTag',
    name: routerNameConfig.CollectionListByTagRouterName,
    component: CollectionListByTag
  },
  {
    path: 'TagList',
    component: TagManage,
    meta: {
      activeMenu: '/collection/TagList'
    }
  },
  {
    path: '',
    redirect: 'CollectionList'
  },
  {
    path: '**',
    component: NotFoundPage
  }
];
