# 나랏돈네비 Flutter 앱

나랏돈네비 웹사이트를 Flutter 웹뷰로 래핑한 모바일 앱입니다.

## 프로젝트 생성

이 디렉토리는 Flutter 프로젝트의 예시 파일을 포함하고 있습니다. 실제 Flutter 프로젝트를 생성하려면:

```bash
# Flutter 프로젝트 생성
flutter create narat_don_navi_app
cd narat_don_navi_app

# 이 디렉토리의 파일들을 복사
cp ../flutter_app/lib/main.dart lib/main.dart
cp ../flutter_app/pubspec.yaml pubspec.yaml
cp ../flutter_app/android/app/src/main/AndroidManifest.xml android/app/src/main/AndroidManifest.xml
cp ../flutter_app/ios/Runner/Info.plist ios/Runner/Info.plist
```

## 설치 및 실행

```bash
# 패키지 설치
flutter pub get

# Android 실행
flutter run

# iOS 실행 (macOS 필요)
flutter run -d ios
```

## 주요 기능

- 웹뷰를 통한 웹사이트 표시
- 토스페이먼츠 결제 딥링크 처리
- 안드로이드 뒤로가기 버튼 제어
- 로딩 인디케이터
- 에러 처리

## 웹사이트 URL 변경

`lib/main.dart` 파일에서 웹사이트 URL을 변경하세요:

```dart
..loadRequest(Uri.parse('https://narat-don-navi.vercel.app'));
```

## 빌드

```bash
# Android APK
flutter build apk --release

# Android App Bundle
flutter build appbundle --release

# iOS (macOS 필요)
flutter build ios --release
```

## 참고

자세한 설정 가이드는 `FLUTTER_APP_SETUP.md`를 참고하세요.

