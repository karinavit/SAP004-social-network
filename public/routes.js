import { formLogin } from "./pages/login/login.js";
import { signIn } from "./pages/posts/posts.js";
import { register } from "./pages/register/register.js";
export const routes = {
  home: formLogin(),
  posts: signIn(name),
  register: register(),
};
