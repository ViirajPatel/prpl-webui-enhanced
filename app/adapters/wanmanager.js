import ApplicationAdapter from './application';

export default class WanmanagerAdapter extends ApplicationAdapter {
  pathForType(type) {
    return 'X_PRPLWARE-COM_WANManager.';
  }

  urlForUpdateRecord(id, modelName, snapshot) {
    let url = super.urlForUpdateRecord(...arguments);
    let part = url.match(/^.+(?=WANManager.)/);
    //url = part[0] + 'X_PRPLWARE-COM_WANManager.';
    url = part[0] + 'X_PRPLWARE-COM_' + id;
    return url;
  }
}
