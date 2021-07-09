import { getRepository } from 'typeorm';
import { Container } from 'typescript-ioc';
import App from './contract/App';
import AuthenticateController from './contract/Auth/AuthenticateController';
import Gate from './contract/Auth/Gate';
import GateMiddleware from './contract/Auth/GateMiddleware';
import GuardMiddleware from './contract/Auth/GuardMiddleware';
import Channel from './contract/Channel';
import Controller from './contract/Controller';
import Router from './contract/Router';
import FileSource from './contract/utilities/FileSource';
import JsonFileSourceDecorator from './contract/utilities/JsonFileSourceDecorator';
import $Privilege from './Entities/Privilege';
import './ioc';

const app = Container.get(App);

app.onReady(async () => {
    const authenticateController = Container.get(AuthenticateController);
    const authRouter = Container.get(Router);
    const loginRoute = authRouter.addRoute({
        controller: authenticateController,
        method: "login",
    });
    loginRoute.setMatches(request => request.type === "login");
    const registerRoute = authRouter.addRoute({
        controller: authenticateController,
        method: "register",
    });
    registerRoute.setMatches(request => request.type === "register");
    const logOutRoute = authRouter.addRoute({
        controller: authenticateController,
        method: "logout",
    });
    logOutRoute.setMatches(request => request.type === "logout");
    logOutRoute.setMiddleware(Container.get(GuardMiddleware))
    const authChannel = Container.get(Channel);
    authChannel.setName("auth")
    authChannel.setRouter(authRouter);
    authChannel.register();

    const privilege = await getRepository($Privilege).findOne();
    const gate = Container.get(Gate)
    gate.define(privilege!)
    const gateMiddleware = Container.get(GateMiddleware);
    gateMiddleware.setGate(gate);


    const controller = Container.get(Controller);
    const router = Container.get(Router);

    router.setMiddleware(Container.get(GuardMiddleware))
        .setNext(gateMiddleware);
    const route = router.addRoute({
        controller,
        method: "asyncInvoke",
        params: ["body"]
    });

    route.setMatches(request => request.type === "add");
    const channel = Container.get(Channel);
    channel.setName("default")
    channel.setRouter(router);
    channel.register();


    const fileSource = Container.get(FileSource);
    fileSource.setPath('./test.txt')
    const jsonFile = Container.get(JsonFileSourceDecorator);
    jsonFile.setDataSource(fileSource);
    await jsonFile.write({ x: "hello" })
    console.log((await jsonFile.read()).x);

});

app.boot();


