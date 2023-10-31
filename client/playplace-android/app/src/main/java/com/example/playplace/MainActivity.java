package com.example.playplace;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.IntentSender;
import android.content.pm.PackageManager;
import android.location.Location;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Toast;

import com.google.android.gms.common.api.ResolvableApiException;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.LocationSettingsRequest;
import com.google.android.gms.location.LocationSettingsResponse;
import com.google.android.gms.location.SettingsClient;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;


public class MainActivity extends AppCompatActivity {
    private static final int REQUEST_PERMISSIONS_REQUEST_CODE = 1981;
    private static final int REQUEST_CODE_LOCATION_SETTINGS = 2981;
    private static final String[] PERMISSIONS = new String[]{Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION};
    private FusedLocationProviderClient mFusedLocationClient;
    private SettingsClient mSettingsClient;
    private LocationRequest mLocationRequest;
    private LocationCallback mLocationCallback;
    private LocationSettingsRequest mLocationSettingsRequest;
    private Location mLastLocation;

    /* 웹뷰 기본설정 */
    static void setWebView (WebView webView) {
        webView.getSettings().setJavaScriptEnabled(true);                       // 자바스크립트 사용여부
        webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);   // 자바스크립트가 창을 자동으로 열 수 있게할지 여부
        webView.getSettings().setLoadsImagesAutomatically(true);                // 이미지 자동 로드
        webView.getSettings().setUseWideViewPort(true);                         // wide viewport 설정
        webView.getSettings().setLoadWithOverviewMode(true);                    // 컨텐츠가 웹뷰보다 클때 스크린크기에 맞추기
        webView.getSettings().setSupportZoom(false);                            // 줌설정
        webView.getSettings().setBuiltInZoomControls(true);                     // 줌아이콘
        webView.getSettings().setCacheMode(WebSettings.LOAD_NO_CACHE);           // 캐시모드 활성화
        webView.getSettings().setDomStorageEnabled(true);                       // 로컬 스토리지 사용여부
        webView.getSettings().setAllowFileAccess(true);                         // 파일 액세스 허용 여부
        webView.getSettings().setUserAgentString("app");                        // 사용자 문자열 설정
        webView.getSettings().setDefaultTextEncodingName("UTF-8");              // 인코딩 설정
        webView.getSettings().setAllowUniversalAccessFromFileURLs(true);
        webView.getSettings().setBlockNetworkImage(false);                      // 네트워크를 통해 이미지리소스 받을지 여부
        webView.getSettings().setSupportMultipleWindows(true);                  //  멀티윈도우를 지원할지 여부
        webView.getSettings().setDatabaseEnabled(false);                        //database storage API 사용 여부
        webView.getSettings().setAllowContentAccess(true);                      // 웹뷰를 통해 Content URL 에 접근할지 여부
        webView.getSettings().setMediaPlaybackRequiresUserGesture(false);
    }

    /** 액티비티 생성 시 */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        init();

        mLocationCallback = new LocationCallback() {
            @Override
            public void onLocationResult(LocationResult locationResult) {
                if (locationResult == null) {
                    return;
                }
                for (Location location : locationResult.getLocations()) {
                    mLastLocation = location;
                }
            }
        };

        WebView webView = findViewById(R.id.webview);
        setWebView(webView);

//        webView.addJavascriptInterface(new WebAppInterface(), "Android");
        webView.addJavascriptInterface(new MapInterface(), "AndMap");


//        webView.loadUrl("https://k9c109.p.ssafy.io/pp"); // 서버
        webView.loadUrl("http://10.0.2.2:3000"); // 로컬


    }

//    public static class WebAppInterface {
//        @JavascriptInterface
//        public String getData() {
//            return "통신 성공 from Android!";
//        }
//    }

    public class MapInterface {
        @JavascriptInterface
        public void successLocate() {
            checkLocation();
        }

        @JavascriptInterface
        public String getLastKnownLocation() {
            if (mLastLocation != null) {
                return mLastLocation.getLatitude() + "," + mLastLocation.getLongitude();
            }
            return "위치를 찾을 수 없습니다";
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_CODE_LOCATION_SETTINGS) {
            switch (resultCode) {
                case Activity.RESULT_OK:
                    Toast.makeText(MainActivity.this, "Result OK", Toast.LENGTH_SHORT).show();
                    break;
                case Activity.RESULT_CANCELED:
                    Toast.makeText(MainActivity.this, "Result Cancel", Toast.LENGTH_SHORT).show();
                    break;
                default:
                    break;
            }
        }
    }

    private void init() {
        if (mFusedLocationClient == null) {
            mFusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
        }

        mSettingsClient = LocationServices.getSettingsClient(this);

        mLocationRequest = new LocationRequest();
        mLocationRequest.setInterval(1000);
//        mLocationRequest.setFastestInterval(500);
        mLocationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
        mLocationRequest.setPriority(LocationRequest.PRIORITY_BALANCED_POWER_ACCURACY);

        LocationSettingsRequest.Builder builder = new LocationSettingsRequest.Builder();
        builder.addLocationRequest(mLocationRequest);
        mLocationSettingsRequest = builder.build();
    }

    private void checkLocation() {
        if (isPermissionGranted()) {
            startLocationUpdates();
        } else {
            requestPermissions();
        }
    }

    private boolean isPermissionGranted() {
        for (String permission : PERMISSIONS) {
            if (permission.equals(Manifest.permission.ACCESS_BACKGROUND_LOCATION) && Build.VERSION.SDK_INT < Build.VERSION_CODES.Q) {
                continue;
            }
            final int result = ContextCompat.checkSelfPermission(this, permission);

            if (PackageManager.PERMISSION_GRANTED != result) {
                return false;
            }
        }
        return true;
    }

    private void requestPermissions() {
        requestPermissions(PERMISSIONS, REQUEST_PERMISSIONS_REQUEST_CODE);
    }

    private void startLocationUpdates() {
        mSettingsClient.checkLocationSettings(mLocationSettingsRequest).addOnSuccessListener(this, new OnSuccessListener<LocationSettingsResponse>() {
            @SuppressLint("MissingPermission")
            @Override
            public void onSuccess(LocationSettingsResponse locationSettingsResponse) {
                mFusedLocationClient.requestLocationUpdates(mLocationRequest,
                        mLocationCallback,
                        null /* Looper */);
            }
        }).addOnFailureListener(this, new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception e) {
                if (e instanceof ResolvableApiException) {
                    resolveLocationSettings(e);
                }
            }
        });
    }

    public void resolveLocationSettings(Exception exception) {
        ResolvableApiException resolvable = (ResolvableApiException) exception;
        try {
            resolvable.startResolutionForResult(this, REQUEST_CODE_LOCATION_SETTINGS);
        } catch (IntentSender.SendIntentException e1) {
            e1.printStackTrace();
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == REQUEST_PERMISSIONS_REQUEST_CODE) {
            if (grantResults.length <= 0) {
                // If user interaction was interrupted, the permission request is cancelled and you
                // receive empty arrays.
            } else if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // Permission granted.
                startLocationUpdates();
            } else {
                // Permission denied.
                for (String permission:permissions) {
                    if ("android.permission.ACCESS_FINE_LOCATION".equals(permission)) {
                        AlertDialog.Builder builder = new AlertDialog.Builder(this);
                        builder.setTitle("알림");
                        builder.setMessage("위치 정보 권한이 필요합니다.\n\n[설정]->[권한]에서 '위치' 항목을 사용으로 설정해 주세요.");
                        builder.setPositiveButton("OK", new DialogInterface.OnClickListener(){
                            @Override
                            public void onClick(DialogInterface dialog, int id)
                            {
                                Intent intent = new Intent();
                                intent.setAction(android.provider.Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
                                intent.setData(Uri.fromParts("package", getPackageName(), null));
                                startActivity(intent);
                            }
                        });
                        builder.setNegativeButton("Cancel", new DialogInterface.OnClickListener(){
                            @Override
                            public void onClick(DialogInterface dialog, int id)
                            {
                                Toast.makeText(MainActivity.this, "Cancel Click", Toast.LENGTH_SHORT).show();
                            }
                        });
                        AlertDialog alertDialog = builder.create();
                        alertDialog.show();
                    }
                }
            }
        }
    }
}