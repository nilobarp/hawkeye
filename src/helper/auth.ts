import { Navigate } from './navigator';

const USER_TOKEN = 'USER_TOKEN';
const USER_EMAIL = 'USER_EMAIL';

class Auth {
    storeState (state) {
        localStorage.setItem(USER_TOKEN, state.token);
        localStorage.setItem(USER_EMAIL, state.email)
    }

    eraseState () {
        localStorage.removeItem(USER_TOKEN);
        localStorage.removeItem(USER_EMAIL);
        Navigate.toLogin();
    }

    check (nextState, replace) {
        if (localStorage.getItem(USER_TOKEN) === null) {
            replace('/console/login');
        }
    }

    redirect () {
        Navigate.toConsole();
    }

    getToken () {
        return localStorage.getItem(USER_TOKEN);
    }
}

let auth = new Auth();

export {
    auth as Auth
}