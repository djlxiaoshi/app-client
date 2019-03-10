import CreateCollection from '../pages/collection-system/collections-manage/CreateCollection';
import CollectionsList from '../pages/collection-system/collections-manage/CollectionsList';
import UpdateCollection from '../pages/collection-system/collections-manage/UpdateCollection';

import TagsList from '../pages/collection-system/tags-manage/TagsList';
import CollectionsInTag from '../pages/collection-system/tags-manage/CollectionsInTag';

import { ACTIVE_MENU } from '../store/mutation-types';
import store from '../store/index';

export default [
  {
    path: 'CollectionsList',
    component: CollectionsList,
    beforeEnter (to, from, next) {
      store.commit(ACTIVE_MENU, to.fullPath);
      next();
    }
  },
  {
    path: 'CreateCollection',
    component: CreateCollection
  },
  {
    path: 'UpdateCollection/:id',
    component: UpdateCollection
  },
  {
    path: 'TagsList',
    component: TagsList
  },
  {
    path: 'Tag/:id',
    component: CollectionsInTag
  },
  {
    path: '',
    redirect: 'CollectionsList'
  },
  {
    path: '**',
    redirect: 'CollectionsList'
  }
];
