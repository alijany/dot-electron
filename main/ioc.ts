import { Container, Scope } from "typescript-ioc";
import $App from "./App";
import App from "./contract/App";

Container.bind(App).to($App).scope(Scope.Singleton);