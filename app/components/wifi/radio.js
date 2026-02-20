import Component from '@glimmer/component';
import { set } from '@ember/object';
import { action } from '@ember/object';

export default class WifiRadioComponent extends Component {
  get enabled() {
    return this.args.radio.Enable == 1 ? true : false;
  }

  set enabled(value) {
    set(this.args.radio, 'Enable', value ? 1 : 0);
  }

  get autoChannelEnabled() {
    return this.args.radio.AutoChannelEnable == 1 ? true : false;
  }

  set autoChannelEnabled(value) {
    set(this.args.radio, 'AutoChannelEnable', value ? 1 : 0);
  }

  get channels() {
    let channels = [];
    this.args.radio.PossibleChannels.split(',').forEach((channel) => {
      channels.push({ key: channel, label: channel });
    });
    return channels;
  }

  @action
  setChannel(channel) {
    this.args.radio.Channel = channel;
  }
}
