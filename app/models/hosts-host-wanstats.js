import Model, { attr } from '@ember-data/model';

export default class HostsHostWanstatsModel extends Model {
    @attr('number') BytesReceived;
    @attr('number') BytesSent;
    @attr('number') PacketsReceived;
    @attr('number') PacketsSent;

}
