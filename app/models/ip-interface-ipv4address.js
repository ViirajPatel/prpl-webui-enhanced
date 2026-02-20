import Model, { attr } from '@ember-data/model';

export default class IpInterfaceIpv4addressModel extends Model {
  @attr AddressingType;
  @attr('string', { readOnly: true }) Alias;
  @attr Enable;
  @attr IPAddress;
  @attr Status;
  @attr SubnetMask;
}
