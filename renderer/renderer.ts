import { AuthRequest, Request } from '../shared/request';
import './index.css';
import { Channel } from './scripts/Channel';

declare const channel: Channel<Request>;

declare const authChannel: Channel<AuthRequest>;


const request: Request = { type: 'add', token: "", data: {} }

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


const test = async () => {
    let [e, res] = await channel.sendAsync(request);
    console.log(res);

     [e, res] = await authChannel.sendAsync(login);
    console.log(res);

    logout.token = request.token = res.data.token;
    [e, res] = await channel.sendAsync(request);
    console.log(res);

    [e, res] = await authChannel.sendAsync(logout);
    console.log(res);

    [e, res] = await channel.sendAsync(request);
    console.log(res);
}

test()