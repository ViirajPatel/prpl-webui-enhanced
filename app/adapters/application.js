import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { camelize, capitalize } from '@ember/string';

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service session;

  namespace = 'serviceElements/Device.';

  pathForType(type) {
    let result = '';
    type.split('-').forEach((chunk) => {
      result = result + capitalize(chunk) + '.';
    });
    return result;
  }

  @computed('session.data.authenticated.sessionID', 'session.isAuthenticated')
  get headers() {
    let headers = {
      'Content-Type': 'application/json',
    };

    if (this.session.isAuthenticated) {
      headers['Authorization'] =
        'bearer ' + this.session.data.authenticated.sessionID;
    } else {
      console.log('User not authenticated');
    }
    return headers;
  }

  urlForFindAll(modelName, snapshot) {
    // get the correct TR-181 namespace to call the REST API
    let modelNamespace = this._getModelNamespace(modelName, snapshot);
    return this._buildURL(modelNamespace);
  }

  urlForFindRecord(id, modelName, snapshot) {
    let modelNamespace = this._getModelNamespace(modelName, snapshot);

    if (id) {
      if (modelNamespace.match(/(?<=X_PRPLWARE-COM_).+/)) {
        id = 'X_PRPLWARE-COM_' + id;
      }
      modelNamespace = '';
    }

    return this._buildURL(modelNamespace, id);
  }

  urlForUpdateRecord(id, modelName, snapshot) {
    return this.namespace + id;
  }

  /**
   retrieves the model's namespace from the _namespace attribute
   
   @method _getModelNamespace
   @private
   @param {String} modelName
   @param {Object} snapshot
   */
  _getModelNamespace(modelName, snapshot) {
    // get the correct TR-181 namespace to call the REST API
    let store = null;
    let modelNamespace = '';

    if (snapshot._recordArray) {
      store = snapshot._recordArray.get('store');
    } else {
      store = snapshot._store;
    }

    if (store) {
      let model = store.modelFor(modelName);
      if (model.attributes.has('_namespace')) {
        modelNamespace = model.attributes
          .get('_namespace')
          .options.defaultValue();
      }
    }
    if (!modelNamespace) modelNamespace = this.pathForType(modelName);

    return modelNamespace;
  }

  /**
    @method _buildURL
    @private
    @param {String} modelNamespace
    @param {String} id
    @return {String} url
  */
  _buildURL(modelNamespace, id) {
    let { host } = this;

    // add the adapter's namespace
    let url = this.urlPrefix();

    // add the model's namespace
    if (modelNamespace) url = url + modelNamespace;

    // add trailing slash if needed
    if (!host && url && url.charAt(0) !== '/') url = '/' + url;

    // add the entry id
    if (id) url = url + id;

    return url;
  }
}
