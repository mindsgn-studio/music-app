import Realm, {ObjectSchema} from 'realm';
import {createRealmContext} from '@realm/react';

class History extends Realm.Object<History> {
  _id!: Realm.BSON.ObjectId;

  static schema: ObjectSchema = {
    name: 'History',
    properties: {
      _id: 'objectId',
    },
    primaryKey: '_id',
  };
}

class Artists extends Realm.Object<Artists> {
  _id!: Realm.BSON.ObjectId;

  static schema: ObjectSchema = {
    name: 'Artists',
    properties: {
      _id: 'objectId',
      artist: {type: 'string?', indexed: true},
      profile: 'string?',
      createdAt: 'date?',
    },
    primaryKey: '_id',
  };
}

class Albums extends Realm.Object<Albums> {
  _id!: Realm.BSON.ObjectId;

  static schema: ObjectSchema = {
    name: 'Albums',
    properties: {
      _id: 'objectId',
      album: {type: 'string?', indexed: true},
      artist: 'string?',
      year: 'int?',
      createdAt: 'date?',
      cover: 'string?',
    },
    primaryKey: '_id',
  };
}

class Tracks extends Realm.Object<Tracks> {
  _id!: Realm.BSON.ObjectId;

  static schema: ObjectSchema = {
    name: 'Tracks',
    properties: {
      _id: 'objectId',
      url: 'string?',
      title: 'string?',
      duration: 'int?',
      album: 'string?',
      artist: 'string?',
      cover: 'string?',
      trackNumber: 'int?',
      discNumber: 'int?',
      createdAt: 'date',
    },
    primaryKey: '_id',
  };
}

const realmConfig: Realm.Configuration = {
  schema: [Tracks, Artists, Albums, History],
  schemaVersion: 24,
};

const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);

export {RealmProvider, useRealm, useObject, useQuery};
