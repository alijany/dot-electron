import { getManager } from 'typeorm';
import { Container } from 'typescript-ioc';
import App from './contract/App';
import AuthenticateController from './contract/Auth/AuthenticateController';
import GuardMiddleware from './contract/Auth/GuardMiddleware';
import Channel from './contract/Channel';
import Controller from './contract/Controller';
import Router from './contract/Router';
import FileSource from './contract/utilities/FileSource';
import JsonFileSourceDecorator from './contract/utilities/JsonFileSourceDecorator';
import $Privilege from './Entities/Privilege';
import $User from './Entities/User';
import './ioc';

const app = Container.get(App);

app.onReady(async () => {
    const controller = Container.get(Controller);
    const router = Container.get(Router);
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

    const authenticateController = Container.get(AuthenticateController);
    const authRouter = Container.get(Router);
    const loginRoute = authRouter.addRoute({
        controller:authenticateController,
        method: "login",
    });
    loginRoute.setMatches(request => request.type === "login");
    const registerRoute = authRouter.addRoute({
        controller:authenticateController,
        method: "register",
    });
    registerRoute.setMatches(request => request.type === "register");
    const logOutRoute = authRouter.addRoute({
        controller:authenticateController,
        method: "logout",
    });
    logOutRoute.setMatches(request => request.type === "logout");
    logOutRoute.setMiddleware(Container.get(GuardMiddleware))
    const authChannel = Container.get(Channel);
    authChannel.setName("auth")
    authChannel.setRouter(authRouter);
    authChannel.register();


    const fileSource = Container.get(FileSource);
    fileSource.setPath('./test.txt')
    const jsonFile = Container.get(JsonFileSourceDecorator);
    jsonFile.setDataSource(fileSource);
    async function test() {
        await jsonFile.write({ x: "hello" })
        console.log((await jsonFile.read()).x);
    }
    test();

    const entityManager = getManager();
    const user = await entityManager.findOne($User, 1, { relations: ["privileges"] });
    const privilege = await entityManager.findOne($Privilege);
    if (privilege)
        console.log(user?.has(privilege));
});

app.boot();


