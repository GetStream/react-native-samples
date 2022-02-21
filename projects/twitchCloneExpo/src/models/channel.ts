export class LiveStreamChannel {
  channelImg: string;
  channelStream: string;

  channelName: string;
  ID: string;

  constructor(
    ID: string,
    channelImg: string,
    channelStream: string,

    channelName: string
  ) {
    this.ID = ID;
    this.channelImg = channelImg;
    this.channelStream = channelStream;

    this.channelName = channelName;
  }
}
