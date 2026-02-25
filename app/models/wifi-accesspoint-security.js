import Model, { attr } from '@ember-data/model';

export default class WifiAccesspointSecurityModel extends Model {
  @attr EncryptionMode;
  @attr KeyPassPhrase;
  @attr MFPConfig;
  @attr ModeEnabled;
  @attr ModesAvailable;
  @attr ModesSupported;
  @attr OWETransitionInterface;
  @attr PreSharedKey;
  @attr RadiusCalledStationId;
  @attr RadiusChargeableUserId;
  @attr RadiusDefaultSessionTimeout;
  @attr RadiusNASIdentifier;
  @attr RadiusOwnIPAddress;
  @attr RadiusSecret;
  @attr RadiusServerIPAddr;
  @attr RadiusServerPort;
  @attr RekeyingInterval;
  @attr SAEPassphrase;
  @attr SHA256Enable;
  @attr SPPAmsdu;
  @attr TransitionDisable;
  @attr WEPKey;

  @attr({
    defaultValue() {
      return 'WiFi.AccessPoint.';
    },
  })
  _namespace;
}
