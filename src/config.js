export default {
    health: {
        url: 'http://localhost:8080/api/health/check',
    },
    API_URL: 'http://localhost:8080/api',
    CLIENT_ROOT_URL: 'http://localhost:3000',
    info: {
        msg: 'Hello World!',
    },
    nav: [
        ['Home', '/'],
        ['About', '/about'],
        ['Login', '/login'],
        ['Register', '/register'],
        ],
    routes: {
        user: '/app/api/v1/user',
        auth: {
            register: '/app/api/v1/auth/register',
            login: '/app/api/v1/auth/login'
        }
    }
};
