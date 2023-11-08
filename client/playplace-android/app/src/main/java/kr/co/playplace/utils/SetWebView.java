package kr.co.playplace.utils;

import android.webkit.WebSettings;
import android.webkit.WebView;

/* 웹뷰 기본설정 */
public class SetWebView {
    public static void setWebView(WebView webView) {
        webView.getSettings().setJavaScriptEnabled(true);                       // 자바스크립트 사용여부
        webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);   // 자바스크립트가 창을 자동으로 열 수 있게할지 여부
        webView.getSettings().setLoadsImagesAutomatically(true);                // 이미지 자동 로드
        webView.getSettings().setUseWideViewPort(true);                         // wide viewport 설정
        webView.getSettings().setLoadWithOverviewMode(true);                    // 컨텐츠가 웹뷰보다 클때 스크린크기에 맞추기
        webView.getSettings().setSupportZoom(false);                            // 줌설정
        webView.getSettings().setBuiltInZoomControls(true);                     // 줌아이콘
        webView.getSettings().setCacheMode(WebSettings.LOAD_NO_CACHE);          // 캐시모드 활성화
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
        webView.getSettings().setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        webView.getSettings().setDatabaseEnabled(true);
        webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
    }
}
