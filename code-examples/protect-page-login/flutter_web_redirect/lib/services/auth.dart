// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import 'dart:convert';

import 'package:dio/dio.dart';

class AuthService {
  final Dio _dio;
  Map<String, dynamic> _identity = {};

  AuthService(this._dio);

  Future<bool> isAuthenticated() async {
    return _dio.get('/sessions/whoami').then((value) {
      if (value.statusCode == 200) {
        _identity = value.data;
        return true;
      }
      return false;
    });
  }

  get identity => _identity;
}
