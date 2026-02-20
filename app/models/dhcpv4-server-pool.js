import Model, { attr } from '@ember-data/model';

export default class Dhcpv4ServerPoolModel extends Model {
  @attr Alias;
  @attr Chaddr;
  @attr ChaddrExclude;
  @attr ChaddrMask;
  @attr ClientID;
  @attr ClientIDExclude;
  @attr ClientNumberOfEntries;
  @attr DNSServers;
  @attr DomainName;
  @attr Enable;
  @attr IPRouters;
  @attr Interface;
  @attr LeaseTime;
  @attr MaxAddress;
  @attr MinAddress;
  @attr OptionNumberOfEntries;
  @attr Order;
  @attr ReservedAddresses;
  @attr StaticAddressNumberOfEntries;
  @attr Status;
  @attr SubnetMask;
  @attr UserClassID;
  @attr UserClassIDExclude;
  @attr VendorClassID;
  @attr VendorClassIDExclude;
  @attr VendorClassIDMode;
}
