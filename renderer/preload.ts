const { contextBridge } = require("electron");
import { Request } from '../shared/request';
import $Channel from './scripts/Channel';
contextBridge.exposeInMainWorld("channel", new $Channel<Request>("default"));