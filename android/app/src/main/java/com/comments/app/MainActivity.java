package com.comments.app;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Disable scrolling in the WebView
        WebView webView = (WebView) this.bridge.getWebView();
        webView.setVerticalScrollBarEnabled(true);
        webView.setHorizontalScrollBarEnabled(false);
        webView.setOnTouchListener((v, event) -> event.getAction() == 2); // Prevents scrolling by intercepting touch events
    }
}
