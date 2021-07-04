import { Request } from '../shared/request';
import './index.css'

import { Channel } from './scripts/Channel';
declare const channel: Channel<Request>;
channel.send({ type: 'add', data: {} }, (event, response) => {
    console.log(response);
});
