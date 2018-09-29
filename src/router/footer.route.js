
import Home from '../pages/home/Home';
import Explore from '../pages/explore/Explore';
import Attention from '../pages/attention/Attention';
import AboutMe from '../pages/about-me/AboutMe';

export default [
  {
    path: '/home',
    icon: 'icon-36',
    label: '我的书签',
    component: Home
  },
  {
    path: '/explore',
    icon: 'icon-yduifaxian',
    label: '发现',
    component: Explore
  },
  {
    path: '/favorite',
    icon: 'icon-faxian-yanjing',
    label: '关注',
    component: Attention
  },
  {
    path: '/about-me',
    icon: 'icon-wo',
    label: '我',
    component: AboutMe
  },
  {
    path: '**',
    redirect: '/home'
  }
];
