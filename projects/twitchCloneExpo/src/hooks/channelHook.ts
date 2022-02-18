import { LiveStreamChannel } from "../models/channel";

const useStreamChannel = () => {
  const stream1 = new LiveStreamChannel(
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "Okey"
  );
  const stream2 = new LiveStreamChannel(
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "Mads"
  );

  const stream3 = new LiveStreamChannel(
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "Vish"
  );

  const stream4 = new LiveStreamChannel(
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "Kushal"
  );

  const stream5 = new LiveStreamChannel(
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    "Enigma"
  );

  const stream6 = new LiveStreamChannel(
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerJoyrides.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    "Paradox"
  );

  const stream7 = new LiveStreamChannel(
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerMeltdowns.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    "Knull"
  );

  const stream8 = new LiveStreamChannel(
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.jpg",
    "Moon knight"
  );

  const stream9 = new LiveStreamChannel(
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/SubaruOutbackOnStreetAndDirt.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    "Netflix"
  );

  const stream10 = new LiveStreamChannel(
    "https://storage.googleapis.com/gtv-videos-bucket/sample/images/TearsOfSteel.jpg",
    "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "Mads"
  );

  const channels = [
    stream1,
    stream2,
    stream3,
    stream4,
    stream5,
    stream6,
    stream7,
    stream8,
    stream9,
    stream10,
  ];

  return { channels };
};

export default useStreamChannel;
