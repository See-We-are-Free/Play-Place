package kr.co.playplace;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.Intent;
import android.content.IntentSender;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.hardware.Sensor;
import android.hardware.SensorManager;
import android.location.Location;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Looper;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.provider.MediaStore;
import android.util.Base64;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.google.android.gms.common.api.ResolvableApiException;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationCallback;
import com.google.android.gms.location.LocationRequest;
import com.google.android.gms.location.LocationResult;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.location.LocationSettingsRequest;
import com.google.android.gms.location.SettingsClient;

import java.io.ByteArrayOutputStream;

import kr.co.playplace.utils.SetWebView;
import kr.co.playplace.webview.MyWebViewClient;

public class MainActivity extends AppCompatActivity {
    private static final int REQUEST_CAMERA_PERMISSION_CODE = 1;
    private static final int REQUEST_IMAGE_CAPTURE = 2;
    private static final int REQUEST_PERMISSIONS_REQUEST_CODE = 1981;
    private static final int REQUEST_CODE_LOCATION_SETTINGS = 2981;
    private static final String[] PERMISSIONS = new String[]{Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_COARSE_LOCATION};
    private FusedLocationProviderClient mFusedLocationClient;
    private SettingsClient mSettingsClient;
    private LocationRequest mLocationRequest;
    private LocationCallback mLocationCallback;
    private LocationSettingsRequest mLocationSettingsRequest;
    private Location mLastLocation;
    private WebView webView;
    private Bitmap imageBitmap;
    private SensorManager mSensorManager;
    private Sensor mAccelerometer;
    private ShakeDetector mShakeDetector;
    private long backBtnTime = 0;
    private static final String TAG = "permission";
        private static final String BASE_URL = "https://k9c109.p.ssafy.io/pp";
//    private static final String BASE_URL = "http://192.168.137.1:3000/pp";


    /* Activity 시작점 */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        /* 웹뷰 설정 */
        webView = findViewById(R.id.webview);
        SetWebView.setWebView(webView);
        webView.setWebViewClient(new MyWebViewClient());


        /* 흔들기(가속도계) 관련 설정 */
        mSensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
        mAccelerometer = mSensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        mShakeDetector = new ShakeDetector();
        mShakeDetector.setOnShakeListener((count) -> {
            Vibrator vibrator = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
            // 1초 진동
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                vibrator.vibrate(VibrationEffect.createOneShot(200, VibrationEffect.DEFAULT_AMPLITUDE));
            } else {
                vibrator.vibrate(200);
            }
            webView.loadUrl(BASE_URL + "/chatbot");
        });


        /* 위치 관련 설정 */
        LocationInit();
        mLocationCallback = new LocationCallback() {
            @Override
            public void onLocationResult(@NonNull LocationResult locationResult) {
                for (Location location : locationResult.getLocations()) {
                    mLastLocation = location;
                }
            }
        };

        /* 자바스크립트(Next)로 전달 */
        webView.addJavascriptInterface(new MapInterface(), "AndMap");
        webView.addJavascriptInterface(new CameraInterface(), "AndCamera");

        /* 웹뷰에 페이지 요청 */
        webView.loadUrl(BASE_URL);
    }

    // ** 뒤로가기 이벤트 제어
    @Override
    public void onBackPressed() {
        long curTime = System.currentTimeMillis();
        long gapTime = curTime - backBtnTime;
        if (webView.canGoBack()) {
            webView.goBack();
        } else if (0 <= gapTime && 2000 >= gapTime) {
            super.onBackPressed();
        } else {
            backBtnTime = curTime;
            Toast.makeText(this, "뒤로가기를 한번 더 누르면 종료됩니다.", Toast.LENGTH_SHORT).show();
        }
    }

    public class MapInterface {
        @JavascriptInterface
        public void successLocate() {
            checkLocationPermission();
        }

        @JavascriptInterface
        public String getLastKnownLocation() {
            if (mLastLocation != null) {
                String json = "{\"lat\" : " + mLastLocation.getLatitude() + ", \"lng\" : " + mLastLocation.getLongitude() + " }";
                Log.i(TAG, json);
                return json;
            }
            return "";
        }
    }

    public class CameraInterface {
        /* 카메라 권한 허용 */
        @JavascriptInterface
        public void successCamera() {
            checkCamera();
        }

        /* 카메라 앱 작동 */
        @JavascriptInterface
        public void openCamera() {
            captureImage();
        }

        /* 사진 찍고 이미지 전달 */
        @JavascriptInterface
        public String sendData() {
            if (imageBitmap != null) {
                webView.loadUrl(BASE_URL + "/search");
                return encodeToBase64(imageBitmap);
            }
            return null;
        }

        /* image 인코딩 */
        private String encodeToBase64(Bitmap image) {
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            image.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
            byte[] byteArray = byteArrayOutputStream.toByteArray();
            return Base64.encodeToString(byteArray, Base64.DEFAULT);
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

        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
            assert data != null;
            Bundle extras = data.getExtras();
            assert extras != null;
            imageBitmap = (Bitmap) extras.get("data");
        }
    }

    private void LocationInit() {
        if (mFusedLocationClient == null) {
            mFusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
        }

        mSettingsClient = LocationServices.getSettingsClient(this);

//        mLocationRequest = new LocationRequest();
        mLocationRequest = LocationRequest.create();
        mLocationRequest.setInterval(500);
        mLocationRequest.setFastestInterval(500);
        mLocationRequest.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
//        mLocationRequest.setPriority(LocationRequest.PRIORITY_BALANCED_POWER_ACCURACY);

        LocationSettingsRequest.Builder builder = new LocationSettingsRequest.Builder();
        builder.addLocationRequest(mLocationRequest);
        mLocationSettingsRequest = builder.build();
    }


    /* 카메라 권한 요청 함수 */
    public void checkCamera() {
        if (checkSelfPermission(Manifest.permission.INTERNET) != PackageManager.PERMISSION_GRANTED ||
                checkSelfPermission(Manifest.permission.ACCESS_NETWORK_STATE) != PackageManager.PERMISSION_GRANTED ||
                checkSelfPermission(Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            //카메라 권한 획득 여부 확인
            if (shouldShowRequestPermissionRationale(Manifest.permission.CAMERA)) {
                // 카메라 권한 요청
                requestPermissions(new String[]{Manifest.permission.INTERNET, Manifest.permission.CAMERA}, 1);
            }
        }
    }

    public void captureImage() {
        int isPermitted = ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA);

        // 카메라 권한 요청이 없다면 요청
        if (isPermitted != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.CAMERA}, REQUEST_CAMERA_PERMISSION_CODE);
            return;
        }

        // 카메라 권한이 있을 때는 진행.
        Intent intentCamera = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
//        File path = getFilesDir();
//        File file = new File(path, "sample.png");
//
//        String strpa = getApplicationContext().getPackageName();
//        cameraImageUri = FileProvider.getUriForFile(this, strpa + ".fileprovider", file);
//        intentCamera.putExtra(MediaStore.EXTRA_OUTPUT, cameraImageUri);
        if (intentCamera.resolveActivity(getPackageManager()) != null) {
            startActivityForResult(intentCamera, REQUEST_IMAGE_CAPTURE);
        }
    }

    private void checkLocationPermission() {
        if (isPermissionGranted()) {
            Log.i(TAG, "위치 권한 Allow");
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

    @SuppressLint("MissingPermission")
    private void startLocationUpdates() {
        mSettingsClient.checkLocationSettings(mLocationSettingsRequest)
                .addOnSuccessListener(this, locationSettingsResponse ->
                        mFusedLocationClient.requestLocationUpdates(mLocationRequest, mLocationCallback, Looper.myLooper())
                )
                .addOnFailureListener(this, e -> {
                    if (e instanceof ResolvableApiException) {
                        resolveLocationSettings(e);
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
                Log.i(TAG, "Permission Pass");
            } else if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // Permission granted.
                startLocationUpdates();
            } else {
                // Permission denied.
                for (String permission : permissions) {
                    if ("android.permission.ACCESS_FINE_LOCATION".equals(permission)) {
                        AlertDialog.Builder builder = new AlertDialog.Builder(this);
                        builder.setTitle("알림");
                        builder.setMessage("위치 정보 권한이 필요합니다.\n\n[설정] -> [권한]에서 '위치' 항목을 사용으로 설정해 주세요.");
                        builder.setPositiveButton("OK", (dialog, id) -> {
                            Intent intent = new Intent();
                            intent.setAction(android.provider.Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
                            intent.setData(Uri.fromParts("package", getPackageName(), null));
                            startActivity(intent);
                        });
                        builder.setNegativeButton("Cancel", (dialog, id) -> Toast.makeText(MainActivity.this, "Cancel Click", Toast.LENGTH_SHORT).show());
                        AlertDialog alertDialog = builder.create();
                        alertDialog.show();
                    }
                }
            }
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        mSensorManager.registerListener(mShakeDetector, mAccelerometer, SensorManager.SENSOR_DELAY_UI);
    }

    @Override
    public void onPause() {
        mSensorManager.unregisterListener(mShakeDetector);
        super.onPause();
    }
}