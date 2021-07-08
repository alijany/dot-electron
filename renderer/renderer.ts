import { AuthRequest, Request } from '../shared/request';
import './index.css'

import { Channel } from './scripts/Channel';
declare const channel: Channel<Request>;
channel.send({ type: 'add', data: {} }, (event, response) => {
    console.log(response);
});

declare const authChannel: Channel<AuthRequest>;

const register: AuthRequest = {
    type: 'register', data: {
        firstName: "mohammad",
        lastName: "alijany",
        username: "alijany",
        password: "Gr33nR0z"
    }
}

const login: AuthRequest = {
    type: 'login', data: {
        username: "alijany",
        password: "Gr33nR0z"
    }
}

const logout: AuthRequest = { type: 'logout', token: '', data: {} }


authChannel.send(login, (event, response) => {
    console.log(response);
    logout.token = response.data.token;
    authChannel.send(logout, (event, response) => {
        console.log(response);
    });
});