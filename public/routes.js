import { formLogin } from './pages/loginpage/main.js';
import { signIn } from './pages/posts/posts.js';
import { register } from './pages/loginpage/register.js';
export const routes = {
    home: formLogin(),
    posts: signIn(),
    register: register()
}