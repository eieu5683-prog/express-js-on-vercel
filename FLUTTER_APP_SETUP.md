# Flutter 앱 설정 가이드

나랏돈네비 웹사이트를 Flutter 웹뷰 앱으로 래핑하는 가이드입니다.

## 프로젝트 구조

Flutter 프로젝트는 별도 디렉토리에서 생성해야 합니다:

```bash
# Flutter 프로젝트 생성 (별도 디렉토리)
flutter create narat_don_navi_app
cd narat_don_navi_app
```

## 1. 필수 라이브러리 설치

### pubspec.yaml

```yaml
name: narat_don_navi_app
description: 나랏돈네비 모바일 앱
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  webview_flutter: ^4.4.2  # 웹뷰 엔진
  url_launcher: ^6.2.1      # 토스/은행 앱 실행용

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0

flutter:
  uses-material-design: true
```

### 패키지 설치

```bash
flutter pub get
```

## 2. 플랫폼별 권한 설정

### Android (android/app/src/main/AndroidManifest.xml)

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET"/>
    
    <!-- 외부 앱 실행 권한 (결제 앱 실행용) -->
    <queries>
        <!-- 토스페이먼츠 -->
        <package android:name="com.tmoney.vending" />
        
        <!-- 은행 앱들 -->
        <package android:name="com.kbstar.liivbank" />
        <package android:name="com.nh.cashcard.app" />
        <package android:name="com.shinhancard.smartshinhan" />
        <package android:name="com.wooricard.smartapp" />
        
        <!-- 딥링크 스킴 -->
        <intent>
            <action android:name="android.intent.action.VIEW" />
            <data android:scheme="tossapp" />
        </intent>
        <intent>
            <action android:name="android.intent.action.VIEW" />
            <data android:scheme="supertoss" />
        </intent>
        <intent>
            <action android:name="android.intent.action.VIEW" />
            <data android:scheme="kakaotalk" />
        </intent>
    </queries>

    <application
        android:label="나랏돈네비"
        android:name="${applicationName}"
        android:icon="@mipmap/ic_launcher">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:launchMode="singleTop"
            android:theme="@style/LaunchTheme"
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|smallestScreenSize|locale|layoutDirection|fontScale|screenLayout|density|uiMode"
            android:hardwareAccelerated="true"
            android:windowSoftInputMode="adjustResize">
            <meta-data
              android:name="io.flutter.embedding.android.NormalTheme"
              android:resource="@style/NormalTheme"
              />
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>
                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
        <meta-data
            android:name="flutterEmbedding"
            android:value="2" />
    </application>
</manifest>
```

### iOS (ios/Runner/Info.plist)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <!-- 앱 간 전환 허용 (결제 앱 실행용) -->
    <key>LSApplicationQueriesSchemes</key>
    <array>
        <string>tossapp</string>
        <string>supertoss</string>
        <string>kakaotalk</string>
        <string>shinhan-sr-ansimclick</string>
        <string>kb-acp</string>
        <string>nhappvardansimhuan</string>
        <string>hdcardappcardansimhuan</string>
        <string>shinhan-sr-ansimclick</string>
        <string>lottemembers</string>
        <string>lotteappcard</string>
    </array>
    
    <!-- 네트워크 보안 설정 -->
    <key>NSAppTransportSecurity</key>
    <dict>
        <key>NSAllowsArbitraryLoads</key>
        <true/>
    </dict>
    
    <!-- 기타 설정 -->
    <key>CFBundleDevelopmentRegion</key>
    <string>$(DEVELOPMENT_LANGUAGE)</string>
    <key>CFBundleDisplayName</key>
    <string>나랏돈네비</string>
    <key>CFBundleExecutable</key>
    <string>$(EXECUTABLE_NAME)</string>
    <key>CFBundleIdentifier</key>
    <string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
    <key>CFBundleInfoDictionaryVersion</key>
    <string>6.0</string>
    <key>CFBundleName</key>
    <string>나랏돈네비</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleShortVersionString</key>
    <string>$(FLUTTER_BUILD_NAME)</string>
    <key>CFBundleSignature</key>
    <string>????</string>
    <key>CFBundleVersion</key>
    <string>$(FLUTTER_BUILD_NUMBER)</string>
    <key>LSRequiresIPhoneOS</key>
    <true/>
    <key>UILaunchStoryboardName</key>
    <string>LaunchScreen</string>
    <key>UIMainStoryboardFile</key>
    <string>Main</string>
    <key>UISupportedInterfaceOrientations</key>
    <array>
        <string>UIInterfaceOrientationPortrait</string>
        <string>UIInterfaceOrientationLandscapeLeft</string>
        <string>UIInterfaceOrientationLandscapeRight</string>
    </array>
    <key>UISupportedInterfaceOrientations~ipad</key>
    <array>
        <string>UIInterfaceOrientationPortrait</string>
        <string>UIInterfaceOrientationPortraitUpsideDown</string>
        <string>UIInterfaceOrientationLandscapeLeft</string>
        <string>UIInterfaceOrientationLandscapeRight</string>
    </array>
    <key>UIViewControllerBasedStatusBarAppearance</key>
    <false/>
    <key>CADisableMinimumFrameDurationOnPhone</key>
    <true/>
    <key>UIApplicationSupportsIndirectInputEvents</key>
    <true/>
</dict>
</plist>
```

## 3. 메인 소스 코드

### lib/main.dart

```dart
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:url_launcher/url_launcher.dart';
import 'dart:io';

void main() => runApp(const MaterialApp(
  title: '나랏돈네비',
  home: NaratNaviApp(),
  debugShowCheckedModeBanner: false,
));

class NaratNaviApp extends StatefulWidget {
  const NaratNaviApp({super.key});

  @override
  State<NaratNaviApp> createState() => _NaratNaviAppState();
}

class _NaratNaviAppState extends State<NaratNaviApp> {
  late final WebViewController _controller;
  bool _isLoading = true;
  String _currentUrl = '';

  @override
  void initState() {
    super.initState();

    // 웹뷰 컨트롤러 초기화
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0x00000000))
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageStarted: (String url) {
            setState(() {
              _isLoading = true;
              _currentUrl = url;
            });
          },
          onPageFinished: (String url) {
            setState(() {
              _isLoading = false;
            });
          },
          onNavigationRequest: (NavigationRequest request) async {
            // 결제 딥링크(토스 등) 처리 로직
            final uri = Uri.parse(request.url);
            
            // HTTP/HTTPS가 아닌 스킴 (딥링크) 처리
            if (!uri.scheme.startsWith('http')) {
              if (await canLaunchUrl(uri)) {
                await launchUrl(
                  uri,
                  mode: LaunchMode.externalApplication,
                );
                return NavigationDecision.prevent;
              } else {
                // 앱이 설치되지 않은 경우 처리
                if (mounted) {
                  _showAppNotInstalledDialog(uri.scheme);
                }
                return NavigationDecision.prevent;
              }
            }
            
            return NavigationDecision.navigate;
          },
          onWebResourceError: (WebResourceError error) {
            print('WebView Error: ${error.description}');
            if (mounted) {
              _showErrorDialog(error.description);
            }
          },
        ),
      )
      // 배포된 Vercel 웹사이트 주소 입력
      ..loadRequest(Uri.parse('https://narat-don-navi.vercel.app'));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // 안드로이드 물리 뒤로가기 버튼 제어
      body: PopScope(
        canPop: false,
        onPopInvoked: (didPop) async {
          if (didPop) return;
          
          if (await _controller.canGoBack()) {
            _controller.goBack();
          } else {
            // 더 이상 뒤로갈 페이지가 없으면 앱 종료 안내
            if (mounted) {
              _showExitDialog(context);
            }
          }
        },
        child: SafeArea(
          child: Stack(
            children: [
              WebViewWidget(controller: _controller),
              // 로딩 인디케이터
              if (_isLoading)
                const Center(
                  child: CircularProgressIndicator(),
                ),
            ],
          ),
        ),
      ),
    );
  }

  void _showExitDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('앱 종료'),
        content: const Text('나랏돈네비를 종료하시겠습니까?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('취소'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              exit(0);
            },
            child: const Text('종료'),
          ),
        ],
      ),
    );
  }

  void _showAppNotInstalledDialog(String scheme) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('앱 설치 필요'),
        content: Text('결제를 진행하려면 해당 앱이 필요합니다.\n($scheme)'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('확인'),
          ),
        ],
      ),
    );
  }

  void _showErrorDialog(String error) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('오류 발생'),
        content: Text('페이지를 불러오는 중 오류가 발생했습니다.\n\n$error'),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              _controller.reload();
            },
            child: const Text('다시 시도'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('확인'),
          ),
        ],
      ),
    );
  }
}
```

## 4. 빌드 및 실행

### 개발 모드 실행

```bash
# Android
flutter run

# iOS (macOS 필요)
flutter run -d ios
```

### 프로덕션 빌드

```bash
# Android APK
flutter build apk --release

# Android App Bundle (Play Store용)
flutter build appbundle --release

# iOS (macOS 필요)
flutter build ios --release
```

## 5. 웹사이트 URL 설정

`lib/main.dart` 파일에서 웹사이트 URL을 변경하세요:

```dart
// 개발 환경
..loadRequest(Uri.parse('http://localhost:3000'));

// 프로덕션 환경
..loadRequest(Uri.parse('https://narat-don-navi.vercel.app'));
```

또는 환경 변수로 관리:

```dart
const String webUrl = String.fromEnvironment(
  'WEB_URL',
  defaultValue: 'https://narat-don-navi.vercel.app',
);
```

## 6. 테스트

### 결제 플로우 테스트

1. 앱 실행
2. 웹사이트에서 결제 버튼 클릭
3. 토스페이먼츠 결제창 열림 확인
4. 결제 앱으로 전환 확인
5. 결제 완료 후 웹뷰로 복귀 확인

### 딥링크 테스트

```bash
# Android
adb shell am start -a android.intent.action.VIEW -d "tossapp://"

# iOS (시뮬레이터)
xcrun simctl openurl booted "tossapp://"
```

## 7. 문제 해결

### 결제 앱이 실행되지 않을 때

1. **AndroidManifest.xml 확인**
   - `<queries>` 태그가 올바르게 설정되었는지 확인
   - 패키지 이름이 정확한지 확인

2. **Info.plist 확인**
   - `LSApplicationQueriesSchemes`에 스킴이 등록되었는지 확인

3. **앱 설치 확인**
   - 테스트 기기에 결제 앱이 설치되어 있는지 확인

### 웹뷰가 로드되지 않을 때

1. **인터넷 권한 확인**
   - AndroidManifest.xml에 `INTERNET` 권한이 있는지 확인

2. **HTTPS 설정 확인**
   - iOS의 경우 `NSAppTransportSecurity` 설정 확인

3. **URL 확인**
   - 웹사이트 URL이 올바른지 확인
   - CORS 설정 확인

## 8. 배포

### Google Play Store

1. `flutter build appbundle --release`
2. Google Play Console에 업로드
3. 서명 키 설정 (처음 배포 시)

### Apple App Store

1. `flutter build ios --release`
2. Xcode에서 아카이브 생성
3. App Store Connect에 업로드

## 참고 자료

- [webview_flutter 패키지](https://pub.dev/packages/webview_flutter)
- [url_launcher 패키지](https://pub.dev/packages/url_launcher)
- [Flutter 공식 문서](https://flutter.dev/docs)

