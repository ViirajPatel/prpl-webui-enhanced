import Base from 'ember-simple-auth/authenticators/base';

export default Base.extend({
  restore(data) {},

  authenticate(identification, password) {
    let data = {
      username: identification,
      password: password,
    };

    return fetch('/session', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Authentication failed');
      }
    });
  },
});
