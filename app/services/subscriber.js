import Service from '@ember/service';

/**
 * uses SSE (server side event) provided by the amx_cgi to subscribe to
 * events, i.e. value changes.
 */
export default class SubscriberService extends Service {
  evtSource;
  url =
    'events/evtqueue' + ('00000' + Math.floor(Math.random() * 10000)).slice(-5);

  init() {
    super.init(...arguments);

    if (!this.evtSource) {
      //this.evtSource = new EventSource(this.url + "?authorization=" + btoa('admin:admin'), {
      //  withCredentials: true
      //});

      this.evtSource = new EventSource(this.url, {
        headers: {
          Authorization: 'Basic ' + btoa('admin:admin'),
        },
      });

      // subscription example
      let headers = new Headers();
      headers.set('Authorization', 'Basic ' + btoa('admin:admin'));
      headers.set('Accept', 'application/json');
      headers.set('Content-Type', 'application/json');

      fetch(this.url, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          'subs-id': 'test',
          path: 'Device.IP.',
          notifications: ['ValueChange'],
        }),
      });

      this.evtSource.addEventListener('open', function (event) {
        //debugger;
        console.log('Event Open');
        console.log(event);
      });

      this.evtSource.addEventListener('test', (event) => {
        console.log('Event Message');
        console.log(event);
      });

      this.evtSource.addEventListener('error', (event) => {
        console.log('Event Error');
        console.log(event);
      });
    }
  }

  test() {
    debugger;
  }
}
