import EmberRouter from '@ember/routing/router';
import config from 'prpl-webui/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('authenticated', { path: '' }, function () {
    this.route('dashboard');
    this.route('lan');
    this.route('dhcpv4');
    this.route('wan');
    this.route('lcm');
    this.route('wifi');
    this.route('firewall');
    this.route('hosts');
  });
  this.route('loading');
});
