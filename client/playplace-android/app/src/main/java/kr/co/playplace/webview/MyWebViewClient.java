package kr.co.playplace.webview;

import android.webkit.WebView;
import android.webkit.WebViewClient;

// MyWebViewClient : 웹뷰에서 일어나는 요청 처리
public class MyWebViewClient extends WebViewClient {
        // shouldOverrideUrlLoading : 리디렉션 요청을 WebView에서 처리하도록 함
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            view.loadUrl(url);
            return true;
        }
}
