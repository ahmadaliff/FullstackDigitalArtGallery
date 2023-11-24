import MainLayout from '@layouts/MainLayout';
import AddArt from '@pages/AddArt';
import CategoryList from '@pages/CategoryList';
import DetailPage from '@pages/DetailPage';
import EditArt from '@pages/EditArt';
import EditProfile from '@pages/EditProfile';
import Favorit from '@pages/Favorit';
import ForgotPassword from '@pages/ForgotPassword';

import Home from '@pages/Home';
import Login from '@pages/Login';
import NotFound from '@pages/NotFound';
import Profile from '@pages/Profile';
import Register from '@pages/Register';
import ResetPassword from '@pages/ResetPassword';
import SendOTP from '@pages/SendOTP';
import UserList from '@pages/UserList';
import WaitingArt from '@pages/WaitingArt';

const routes = [
  {
    path: '/',
    name: 'Home',
    protected: false,
    component: Home,
    layout: MainLayout,
  },
  {
    path: '/login',
    name: 'Login',
    protected: false,
    component: Login,
  },
  {
    path: '/Register',
    name: 'Register',
    protected: false,
    component: Register,
  },
  {
    path: '/favorit',
    name: 'Favorit',
    protected: true,
    component: Favorit,
    layout: MainLayout,
  },
  {
    path: '/art/add',
    name: 'AddArt',
    protected: true,
    component: AddArt,
    layout: MainLayout,
  },
  {
    path: '/art/edit/:id',
    name: 'EditArt',
    protected: true,
    component: EditArt,
    layout: MainLayout,
  },
  {
    path: '/detail/:id',
    name: 'DetailArt',
    protected: true,
    component: DetailPage,
    layout: MainLayout,
  },
  {
    path: '/admin/waiting-art',
    name: 'WaitingArt',
    protected: true,
    component: WaitingArt,
    layout: MainLayout,
  },
  {
    path: '/admin/category-list',
    name: 'Category List',
    protected: true,
    component: CategoryList,
    layout: MainLayout,
  },
  {
    path: '/admin/user',
    name: 'User List',
    protected: true,
    component: UserList,
    layout: MainLayout,
  },
  {
    path: '/profile',
    name: 'Profile',
    protected: true,
    component: Profile,
    layout: MainLayout,
  },
  {
    path: '/profile/verify',
    name: 'Send OTP',
    protected: true,
    component: SendOTP,
  },
  {
    path: '/profile/edit',
    name: 'Edit Profile',
    protected: true,
    component: EditProfile,
    layout: MainLayout,
  },
  {
    path: '/forgot-password',
    name: 'Forgot Password',
    component: ForgotPassword,
  },
  {
    path: '/:token/reset-password',
    name: 'Reset Password',
    component: ResetPassword,
  },
  { path: '*', name: 'Not Found', component: NotFound, layout: MainLayout, protected: false },
];

export default routes;
