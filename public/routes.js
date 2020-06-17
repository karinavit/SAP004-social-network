import { formLogin } from './pages/login/login.js';
import { signIn } from './pages/posts/postsTemplate.js';
import { register } from './pages/register/register.js';
import { profilePage } from './pages/profile/profile.js';

const routes = {
  home: formLogin,
  register,
  posts: signIn,
  profile: profilePage,
}

export default routes;