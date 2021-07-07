import { AuthRequest, Request } from '../shared/request';
import './index.css'

import { Channel } from './scripts/Channel';
declare const channel: Channel<Request>;
channel.send({ type: 'add', data: {} }, (event, response) => {
    console.log(response);
});

declare const authChannel: Channel<AuthRequest>;
const request : AuthRequest = { type: 'register', data: {
    firstName:"mohammad",
    lastName: "alijany",
    username:"alijany",
    password:"Gr33nR0z"
} }
authChannel.send(request, (event, response) => {
    console.log(response);
});