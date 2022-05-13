# Example Flutter Web Application

An example flutter web application integrating with Ory.

## Getting Started

This project is a starting point for a Flutter application.

A few resources to get you started if this is your first Flutter project:

- [Lab: Write your first Flutter app](https://flutter.dev/docs/get-started/codelab)
- [Cookbook: Useful Flutter samples](https://flutter.dev/docs/cookbook)

For help getting started with Flutter, view our [online documentation](https://flutter.dev/docs), which offers tutorials, samples,
guidance on mobile development, and a full API reference.

## Run your Flutter Web App

```shell-session
flutter run -d web-server --web-port 4005
```

```mdx-code-block
import SdkEnvVar from '@site/src/components/SdkEnvVar'

<SdkEnvVar />
```

Start the Ory Cli proxy on [http://localhost:3005](http://localhost:3005) and set the proxied application to
[http://localhost:4005](http://localhost:4005).

```shell-session
ory proxy --port 3005 http://localhost:4005
```

Open the browser on [http://localhost:3005](http://localhost:3005) you should now see the Ory managed Login page.

## Release Build

With the `flutter` cli we can build a release version of our App by running the command below:

```shell-session
flutter build web
```

We then need an HTTP server to serve the files, we will use [dhttpd](https://pub.dev/packages/dhttpd).

```shell-session
dhttpd --host localhost --port 4005 --path build/web
```

See here for more information on [Flutter Web in Production](https://docs.flutter.dev/deployment/web)
