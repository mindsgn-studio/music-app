/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {useRealm} from './realmContext';
import mobileAds from 'react-native-google-mobile-ads';

import {
  requestMultiple,
  checkMultiple,
  PERMISSIONS,
} from 'react-native-permissions';
import RNFS from 'react-native-fs';
import {NativeModules} from 'react-native';
import TrackPlayer, {Capability} from 'react-native-track-player';

const {Player} = NativeModules;

interface Player {
  isReady: boolean;
  songs: any[];
  play: () => void;
  addTrack: (tracks: any[], index: number) => void;
  removeTrack: () => void;
  searchTracks: (search: string, page: number, scrolling: boolean) => void;
}

const PlayerContext = createContext<Player>({
  isReady: false,
  songs: [],
  play: () => {},
  addTrack: (tracks: any[], index: number) => {},
  removeTrack: () => {},
  searchTracks: () => {},
});

function usePlayer(): any {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within an PlayerProvider');
  }
  return context;
}

const PlayerProvider = (props: {children: ReactNode}): any => {
  const realm = useRealm();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [songs, setSongs] = useState<any[]>([]);

  const deleteTracks = async (collection: string) => {
    try {
      realm.write(() => {
        const tracksToDelete = realm.objects(collection);

        realm.delete(tracksToDelete);
      });
    } catch (error: any) {
      console.error('Error deleting Tracks:', error);
    }
  };

  const crawlDirectories = async (directory: any) => {
    try {
      const files: any = await RNFS.readDir(directory);
      const mp3Files: any = files
        .filter((file: any) => file.isFile() && file.name.endsWith('.mp3'))
        .map((mp3File: any) => mp3File.path);

      const subdirectories = files.filter((file: any) => file.isDirectory());

      for (const subdirectory of subdirectories) {
        const subdirectoryMp3Files = await crawlDirectories(subdirectory.path);
        mp3Files.push(...subdirectoryMp3Files);
      }

      return mp3Files;
    } catch (error: any) {
      return [];
    }
  };

  const saveBase64AsImage = async (
    base64String: string,
    filename: string,
  ): Promise<string | null> => {
    const path = RNFS.DocumentDirectoryPath + `/${filename}.png`;

    try {
      const exists = await RNFS.exists(path);

      if (exists) {
        return path;
      }

      await RNFS.writeFile(path, base64String, 'base64');
      return path;
    } catch (error) {
      return null;
    }
  };

  const split = (inputString: string) => {
    try {
      const parts = inputString.split('/');
      if (!parts[0]) {
        parts[0] = '1';
      }

      if (!parts[1]) {
        parts[1] = '1';
      }

      return [parseInt(parts[0]), parseInt(parts[1])];
    } catch (error: any) {
      return [parseInt('1'), parseInt('1')];
    }
  };

  const AddToDatabase = async (metadata: any) => {
    try {
      const {artist, title, album, url, trackNumber, discNumber, duration} =
        metadata;

      const path = await saveBase64AsImage(
        metadata.cover,
        `${artist}-${album}`,
      );

      const tracks = realm
        .objects('Tracks')
        .filtered('artist = $0 AND title = $1', artist, title);

      if (tracks.length === 0) {
        realm.write(() => {
          realm.create('Tracks', {
            _id: new Realm.BSON.ObjectId(),
            artist,
            title,
            album,
            url,
            trackNumber: trackNumber ? split(trackNumber)[0] : 1,
            discNumber: discNumber ? split(discNumber)[0] : 1,
            cover: path,
            duration: duration ? parseInt(duration) : null,
            createdAt: new Date(),
          });
        });
      }
      /*
      const artist = realm
        .objects('Artists')
        .filtered('artist = $0', metadata.albumArtist);

      if (artist.length === 0) {
        realm.write(() => {
          realm.create('Artists', {
            _id: new Realm.BSON.ObjectId(),
            artist: metadata.albumArtist,
            profile: path,
            createdAt: new Date(),
          });
        });
      }

      const album = realm
        .objects('Albums')
        .filtered('album = $0', metadata.album);

      if (album.length === 0) {
        realm.write(() => {
          realm.create('Albums', {
            _id: new Realm.BSON.ObjectId(),
            artist: metadata.albumArtist,
            album: metadata.album,
            year: metadata.year ? parseInt(metadata.year) : null,
            cover: path,
            createdAt: new Date(),
          });
        });
      }*/
    } catch (error: any) {
      console.error('Error:', error);
    }
  };

  const getAllFiles = () => {
    const folders = [
      RNFS.CachesDirectoryPath,
      RNFS.DocumentDirectoryPath,
      RNFS.DownloadDirectoryPath,
      RNFS.ExternalCachesDirectoryPath,
      RNFS.ExternalDirectoryPath,
      RNFS.ExternalStorageDirectoryPath,
      RNFS.FileProtectionKeys,
      RNFS.LibraryDirectoryPath,
      RNFS.MainBundlePath,
      RNFS.PicturesDirectoryPath,
      RNFS.TemporaryDirectoryPath,
    ];

    try {
      folders.map(directory => {
        crawlDirectories(directory)
          .then((mp3Files: any) => {
            if (mp3Files.length !== 0) {
              getMetadata(mp3Files);
            }
          })
          .catch(error => {
            console.error(error);
          });
      });
    } catch (error) {
      console.log(error);
    } finally {
      return;
    }
  };

  const checkMediaAudioPermission = async () => {
    await deleteTracks('Tracks');
    await deleteTracks('Albums');
    await deleteTracks('Artists');

    checkMultiple([
      PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
    ])
      .then(statuses => {
        if (statuses[PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION] === 'denied') {
          console.log('ACCESS_MEDIA_LOCATION');
          requestMediaAudioPermission();
          return;
        }

        if (statuses[PERMISSIONS.ANDROID.READ_MEDIA_AUDIO] === 'denied') {
          console.log('READ_MEDIA_AUDIO');
          requestMediaAudioPermission();
          return;
        }
      })
      .catch((error: any) => {
        return error;
      })
      .finally(() => {
        getAllFiles();
      });
  };

  const requestMediaAudioPermission = async () => {
    requestMultiple([
      PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
    ])
      .then(statuses => {
        if (statuses[PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION] === 'denied') {
          requestMediaAudioPermission();
          return;
        }

        if (statuses[PERMISSIONS.ANDROID.READ_MEDIA_AUDIO] === 'denied') {
          requestMediaAudioPermission();
          return;
        }
      })
      .catch((error: any) => {
        console.log(error);
      })
      .finally(() => {
        checkMediaAudioPermission();
      });
  };

  const getMetadata = async (mp3Files: string[]) => {
    await mp3Files.map(async (file: any) => {
      await Player.getMetadata(file, async (err: any, metadata: any) => {
        if (err) {
          console.log(err);
          return;
        }

        const data = {
          ...metadata,
          url: file,
        };

        await AddToDatabase(data);
      });
    });

    setTimeout(() => {
      setIsReady(true);
    }, 10000);
  };

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
    } catch (error: any) {}
  };

  const play = async () => {
    try {
      await TrackPlayer.play();
    } catch (error) {
      console.log(error);
    }
  };

  const addTrack = async (tracks: any[], index: number, local: boolean) => {
    try {
      let data: any = {
        url: null,
        title: null,
        artist: null,
        album: null,
        artwork: null,
      };

      await TrackPlayer.pause();
      await TrackPlayer.reset();

      const queue = await TrackPlayer.getQueue();

      queue.map(async (track: any, trackIndex: number) => {
        await TrackPlayer.remove([trackIndex]);
      });

      tracks.map(async (track: any) => {
        const {artist, title, albumTitle} = track;
        if (local) {
          data = {
            ...data,
            url: `file://${track.url}`,
            title,
            artist,
            album: albumTitle,
            artwork: `file://${track.cover}`,
          };
        } else {
          data = {
            ...data,
            url: track.link,
            title,
            artist,
            album: albumTitle,
            artwork: track.coverArt,
          };
        }

        await TrackPlayer.add([data]);
      });

      await TrackPlayer.skip(index);

      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],

        compactCapabilities: [Capability.Play, Capability.Pause],
      });

      await TrackPlayer.play();
    } catch (error: any) {
      console.log(error);
    }
  };

  const removeTrack = async () => {};

  const searchTracks = async (
    search: string,
    page: number,
    scrolling: boolean,
  ) => {
    try {
      let link = 'https://dolphin-app-janfy.ondigitalocean.app/track';

      if (search && search != '') {
        link += `/search?search=${encodeURIComponent(
          search,
        )}&page=${encodeURIComponent(page)}&limit=20`;
      }

      if (!search) {
        link += '/random';
      }

      const response = await fetch(link);

      if (response.ok) {
        const data = await response.json();
        const {tracks} = data;
        if (scrolling) {
          setSongs((prevSongs: any[]) => {
            return [...prevSongs, ...tracks];
          });
        } else {
          setSongs([...tracks]);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsReady(true);
    }
  };

  useEffect(() => {
    checkMediaAudioPermission();
    setupPlayer();
    searchTracks('', 1, false);
    mobileAds()
      .initialize()
      .then((adapterStatuses: any) => {
        console.log(adapterStatuses);
      });
  }, []);

  return (
    <PlayerContext.Provider
      {...props}
      value={{
        isReady,
        addTrack,
        removeTrack,
        play,
        songs,
        searchTracks,
      }}
    />
  );
};

export {PlayerProvider, usePlayer};
