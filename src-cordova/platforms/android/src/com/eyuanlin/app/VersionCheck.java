package com.eyuanlin.app;

/**
 * Created by test on 2018/4/13.
 */

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.pm.PackageManager;
import android.os.AsyncTask;
import android.util.Log;

import com.pgyersdk.javabean.AppBean;
import com.pgyersdk.update.PgyUpdateManager;
import com.pgyersdk.update.UpdateManagerListener;

public class VersionCheck {
    private static AsyncTask<Activity, Void, Boolean> sInitTask;

    private static int getVersionCode(Context context) {
        int versionCode = 0;
        try {
            // 获取软件版本号，对应AndroidManifest.xml下android:versionCode
            versionCode = context.getPackageManager().getPackageInfo(context.getPackageName(), 0).versionCode;
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }
        return versionCode;
    }

    public static void checkNewVersion(Activity context) {

        if (sInitTask != null && sInitTask.getStatus() == AsyncTask.Status.RUNNING) {
            return;
        }
        if (sInitTask != null) {
            sInitTask.cancel(true);
        }
        sInitTask = new AsyncTask<Activity, Void, Boolean>() {
            @Override
            protected Boolean doInBackground(Activity... params) {
                Activity context = params[0];
                PgyUpdateManager.register(context, new MyUpdateManagerListener(context));
                return true;
            }
        };
        sInitTask.execute(context);

    }

    public static class MyUpdateManagerListener extends UpdateManagerListener {

        Activity activity;

        public MyUpdateManagerListener(Activity activity) {
            super();
            this.activity = activity;
        }

        @Override
        public void onNoUpdateAvailable() {

        }

        @Override
        public void onUpdateAvailable(String result) {
            Log.e("VersionCheck", "result:" + result);
            final int VersionCode = getVersionCode(activity);
            final AppBean appBean = getAppBeanFromString(result);
            if (VersionCode < Integer.valueOf(appBean.getVersionCode())) {
                new AlertDialog.Builder(activity).setTitle("更新").setMessage("检测到新版本").setNegativeButton("确定",
                        new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int which) {
//                                DataCleanManager.clearAllCache(activity);
                                startDownloadTask(activity, appBean.getDownloadURL());
                            }
                        }).show();
            }

        }
    }
}
