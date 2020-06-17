import { formLogin } from './pages/login/login.js';
import { signIn } from './pages/posts/postPage/pagePostTemplate.js';
import { register } from './pages/register/register.js';
import { profilePage } from './pages/profile/profileTemplate.js';

const routes = {
  home: formLogin,
  register,
  posts: signIn,
  profile: profilePage,
};

export default routes;
