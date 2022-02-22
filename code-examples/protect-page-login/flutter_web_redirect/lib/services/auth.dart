import 'package:dio/dio.dart';

class AuthService {
  final Dio _dio;

  AuthService(this._dio);

  Future<bool> isAuthenticated() async {
    return _dio.get('/sessions/whoami').then((value) => value.statusCode == 200);
  }

}
