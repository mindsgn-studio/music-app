import React from 'react';
import Realm, {ObjectSchema} from 'realm';
import {createRealmContext} from '@realm/react';

class Tracks extends Realm.Object<Tracks> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  static schema: ObjectSchema = {
    name: 'tracks',
    properties: {
      _id: 'objectId',
      url: 'string',
      title: 'string',
      genre: 'string',
      duration: 'int',
      album: 'string',
      artist: 'string',
      cover: 'string',
    },
    primaryKey: '_id',
  };
}

const realmConfig: Realm.Configuration = {
  schema: [Tracks],
};

const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);

export {RealmProvider, useRealm, useObject, useQuery};
