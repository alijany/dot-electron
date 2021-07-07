const { contextBridge } = require("electron");
import { AuthRequest, Request } from '../shared/request';
import $Channel from './scripts/Channel';
contextBridge.exposeInMainWorld("authChannel", new $Channel<AuthRequest>("auth"));
contextBridge.exposeInMainWorld("channel", new $Channel<Request>("default"));