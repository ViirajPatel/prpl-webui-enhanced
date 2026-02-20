import Model, { attr } from '@ember-data/model';

export default class WifiSsidStatsModel extends Model {
  @attr BroadcastPacketsReceived;
  @attr BroadcastPacketsSent;
  @attr BytesReceived;
  @attr BytesSent;
  @attr DiscardPacketsReceived;
  @attr DiscardPacketsSent;
  @attr ErrorsReceived;
  @attr ErrorsSent;
  @attr FailedRetransCount;
  @attr MulticastPacketsReceived;
  @attr MulticastPacketsSent;
  @attr MultipleRetryCount;
  @attr PacketsReceived;
  @attr PacketsSent;
  @attr RetransCount;
  @attr RetryCount;
  @attr UnicastPacketsReceived;
  @attr UnicastPacketsSent;
  @attr UnknownProtoPacketsReceived;
}
