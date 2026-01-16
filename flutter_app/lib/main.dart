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

