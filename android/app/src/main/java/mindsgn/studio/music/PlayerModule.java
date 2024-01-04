package mindsgn.studio.music;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

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
    public void play(String name, Callback cb) {
        try {
            String hello = "Hello: " + name;
            cb.invoke(null, hello);
        } catch (Exception err) {
            cb.invoke(err, null);
        }
    }
}
