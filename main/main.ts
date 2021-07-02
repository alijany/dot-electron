import { Container } from 'typescript-ioc';
import App from './contract/App';
import './ioc';

Container.get(App);
