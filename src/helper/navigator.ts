import { browserHistory } from 'react-router'

class Navigate {
    navigate (path: string) {
        browserHistory.push(path);
    }

    static toConsole() {
        browserHistory.push('/console');
    }

    static toLogin () {
        browserHistory.push('/console/login');
    }

    static toSignup () {
        browserHistory.push('/console/signup');
    }

    static toEditor () {
        browserHistory.push('/console/editor');
    }
}

export {
    Navigate
}