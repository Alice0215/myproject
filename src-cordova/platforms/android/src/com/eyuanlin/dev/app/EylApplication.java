package com.eyuanlin.dev.app;

/**
 * Created by test on 2018/4/13.
 */

import com.pgyersdk.crash.PgyCrashManager;
import android.app.Application;

public class EylApplication extends Application{
    @Override
    public void onCreate() {
        // TODO Auto-generated method stub
        super.onCreate();

        PgyCrashManager.register(this);
    }
}
