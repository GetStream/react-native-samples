import AudioRecorderPlayer, {
  PlayBackType,
} from 'react-native-audio-recorder-player'

type Callback = (args: {status: AudioStatus; data?: PlayBackType}) => void
type Path = string | undefined
export enum AudioStatus {
  PLAYING = 'PLAYING',
  STARTED = 'STARTED',
  PAUSED = 'PAUSED',
  RESUMED = 'RESUMED',
  STOPPED = 'STOPPED',
}

let audioRecorderPlayer: AudioRecorderPlayer | undefined = undefined
let currentPath: Path = undefined
let currentCallback: Callback = () => {}
let currentPosition = 0

export const startPlayer = async (path: string, callback: Callback) => {
  if (currentPath === undefined) {
    currentPath = path
    currentCallback = callback
  } else if (currentPath !== path) {
    if (audioRecorderPlayer !== undefined) {
      await stopPlayer()
    }
    currentPath = path
    currentCallback = callback
  }

  if (audioRecorderPlayer === undefined) {
    audioRecorderPlayer = new AudioRecorderPlayer()
  }

  const shouldBeResumed = currentPath === path && currentPosition > 0

  if (shouldBeResumed) {
    await audioRecorderPlayer.resumePlayer()
    currentCallback({
      status: AudioStatus.RESUMED,
    })
    return
  }

  await audioRecorderPlayer.startPlayer(currentPath)
  currentCallback({
    status: AudioStatus.STARTED,
  })
  audioRecorderPlayer.addPlayBackListener(async e => {
    if (e.currentPosition === e.duration) {
      await stopPlayer()
    } else {
      currentPosition = e.currentPosition
      currentCallback({
        status: AudioStatus.PLAYING,
        data: e,
      })
    }
    return
  })
}

export const pausePlayer = async () => {
  await audioRecorderPlayer?.pausePlayer()
  currentCallback({status: AudioStatus.PAUSED})
}

export const stopPlayer = async () => {
  await audioRecorderPlayer?.stopPlayer()
  audioRecorderPlayer?.removePlayBackListener()
  currentPosition = 0
  currentCallback({status: AudioStatus.STOPPED})
  audioRecorderPlayer = undefined
}
