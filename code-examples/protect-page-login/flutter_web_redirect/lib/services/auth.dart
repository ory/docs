import 'package:universal_html/html.dart';

import 'package:dio/dio.dart';
import 'package:ory_client/ory_client.dart';

class AuthService {
  final FrontendApi _ory;
  Session? _identity;

  AuthService(Dio dio) : _ory = OryClient(dio: dio).getFrontendApi();

  Future<bool> isAuthenticated() async {
    return _ory
        .toSession()
        .then((resp) {
          if (resp.statusCode == 200) {
            _identity = resp.data;
            return true;
          }
          return false;
        })
        .catchError((error) {
          return false;
        });
  }

  Future logout() async {
    return _ory.createBrowserLogoutFlow().then((resp) {
      return _ory.updateLogoutFlow(token: resp.data!.logoutToken).then((resp) {
        window.location.reload();
      });
    });
  }

  get identity => _identity;
}
