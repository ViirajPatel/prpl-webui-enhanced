import Model, { attr } from '@ember-data/model';

export default class IpInterfaceStatsModel extends Model {
  @attr MulticastPacketsSent;
  @attr ErrorsSent;
  @attr BroadcastPacketsSent;
  @attr BytesSent;
  @attr PacketsSent;
  @attr BytesReceived;
  @attr DiscardPacketsReceived;
  @attr ErrorsReceived;
  @attr MulticastPacketsReceived;
  @attr UnknownProtoPacketsReceived;
  @attr UnicastPacketsSent;
  @attr UnicastPacketsReceived;
  @attr PacketsReceived;
  @attr DiscardPacketsSent;
  @attr BroadcastPacketsReceived;
}
