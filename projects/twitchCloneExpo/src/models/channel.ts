export class LiveStreamChannel {
  channelImg: string;
  channelStream: string;

  channelName: string;

  constructor(
    channelImg: string,
    channelStream: string,

    channelName: string
  ) {
    this.channelImg = channelImg;
    this.channelStream = channelStream;

    this.channelName = channelName;
  }
}
