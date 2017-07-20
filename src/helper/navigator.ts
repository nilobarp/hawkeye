import { browserHistory } from 'react-router'

class Navigate {
    navigate (path: string) {
        browserHistory.push(path);
    }

    static toHome() {
        browserHistory.push('/');
    }

    static toLogin () {
        browserHistory.push('/login');
    }

    static toSignup () {
        browserHistory.push('/signup');
    }

    static toEditor () {
        browserHistory.push('/editor');
    }
}

export {
    Navigate
}