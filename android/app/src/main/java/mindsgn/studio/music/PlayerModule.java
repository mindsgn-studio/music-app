package mindsgn.studio.music;


import android.media.MediaMetadataRetriever;
import android.util.Base64;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.WritableMap;

public class PlayerModule extends ReactContextBaseJavaModule {
    PlayerModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "Player";
    }

    // This is an example method that can be called from JavaScript
    @ReactMethod
    public void getMetadata(String file, Callback cb) {
        try {
            MediaMetadataRetriever mmr = new MediaMetadataRetriever();
            mmr.setDataSource(file);

            String album = mmr.extractMetadata(MediaMetadataRetriever.METADATA_KEY_ALBUM);
            String title = mmr.extractMetadata(MediaMetadataRetriever.METADATA_KEY_TITLE);
            String artist = mmr.extractMetadata(MediaMetadataRetriever.METADATA_KEY_ARTIST);
            String albumArtist = mmr.extractMetadata(MediaMetadataRetriever.METADATA_KEY_ALBUMARTIST);
            String trackNumber = mmr.extractMetadata(MediaMetadataRetriever.METADATA_KEY_CD_TRACK_NUMBER);
            String duration = mmr.extractMetadata(MediaMetadataRetriever.METADATA_KEY_DURATION);
            String discNumber = mmr.extractMetadata(MediaMetadataRetriever.METADATA_KEY_DISC_NUMBER);
            String genre = mmr.extractMetadata(MediaMetadataRetriever.METADATA_KEY_GENRE);
            String compilation = mmr.extractMetadata(MediaMetadataRetriever.METADATA_KEY_COMPILATION);
            String year = mmr.extractMetadata(MediaMetadataRetriever.METADATA_KEY_YEAR);

            byte[] coverArtBytes = mmr.getEmbeddedPicture();
            String base64CoverArt = (coverArtBytes != null) ? Base64.encodeToString(coverArtBytes, Base64.DEFAULT) : null;

            WritableMap metadata = Arguments.createMap();

            metadata.putString("title", title);
            metadata.putString("album", album);
            metadata.putString("artist", artist);
            metadata.putString("albumArtist", albumArtist);
            metadata.putString("duration", duration);
            metadata.putString("trackNumber", trackNumber);
            metadata.putString("year", year);
            metadata.putString("genre", genre);
            metadata.putString("compilation", compilation);
            metadata.putString("discNumber", discNumber);
            metadata.putString("cover", base64CoverArt);

            cb.invoke(null, metadata);
        } catch (Exception err) {
            cb.invoke(err, null);
        }
    }
}
