import { Container } from 'typescript-ioc';
import App from './contract/App';
import Channel from './contract/Channel';
import Controller from './contract/Controller';
import Router from './contract/Router';
import './ioc';

Container.get(App);
const controller = Container.get(Controller);
const router = Container.get(Router);
const route = router.addRoute(controller, "asyncInvoke", ["body"]);
route.setMatches(request => request.type === "add");
const channel = Container.get(Channel);
channel.setName("default")
channel.setRouter(router);
channel.register();