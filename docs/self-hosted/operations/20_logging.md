---
id: logging
title: Logs and audit trails
---

Log output is sent to stdout/stderr. There is no option to change the log destination. You should use bash pipes instead, for
example:

```sh
hydra serve all >log.txt 2>&1
```

Log configuration happens via environment variables `LOG_LEVEL`, `LOG_FORMAT`, `LOG_LEAK_SENSITIVE_VALUES` or the configuration
file:

```yaml title="path/to/config.yml"
log:
  level: info
  format: text
  leak_sensitive_values: false
```

The `level` configuration key supports the following values:

- `panic`: highest level of severity. This event is so rare that it's, with almost absolute certainty, unlikely for you to
  encounter ever.
- `fatal`: the program is unable to continue execution and ended with a fatal state. Can happen when the configuration is invalid,
  for example.
- `error`: used for errors that should be noted.
- `warning`: non-critical entries that deserve eyes.
- `info`: general operational entries about what's going on inside the application.
- `debug`: usually only enabled when debugging. Very verbose logging. If `json` is the log format, the JSON will be prettified for
  better readability.
- `trace`: designates finer-grained informational events than debug. Includes call traces of errors and log calls.

The `format` configuration key supports `text` and `json`:

```sh
time=2020-05-20T11:57:09+02:00 level=info msg=An example log message. audience=application service_name=foo service_version=bar
```

```sh
{"audience":"application","level":"info","msg":"An example log message.","service_name":"foo","service_version":"bar","time":"2020-05-20T11:56:57+02:00"}
```

The `leak_sensitive_values` configuration key should always be set to `false`. If set to `true`, sensitive data such as Personally
Identifiable Information (PII), secrets, tokens, and others will be leaked to the logs. This is only useful for debugging on
development environments or with a very narrow scope. If set to `true` you must ensure that the output isn't stored or cached
anywhere.

## Traces

If `LOG_LEVEL=trace`, traces will be included for log calls and errors:

```json
{
  "audience": "application",
  "error": {
    "message": "example error",
    "trace": "\ngithub.com/ory/x/logrusx.TestErrorTrace.func1\n\t/Users/foobar/go/src/github.com/ory/x/logrusx/logrus_test.go:52\nnet/http.HandlerFunc.ServeHTTP\n\t/usr/local/Cellar/go/1.14.2_1/libexec/src/net/http/server.go:2012\nnet/http.serverHandler.ServeHTTP\n\t/usr/local/Cellar/go/1.14.2_1/libexec/src/net/http/server.go:2807\nnet/http.(*conn).serve\n\t/usr/local/Cellar/go/1.14.2_1/libexec/src/net/http/server.go:1895\nruntime.goexit\n\t/usr/local/Cellar/go/1.14.2_1/libexec/src/runtime/asm_amd64.s:1373"
  },
  "file": "/Users/user/go/src/github.com/ory/x/logrusx/logrus_test.go:52",
  "func": "github.com/ory/x/logrusx.TestErrorTrace.func1",
  "level": "error",
  "msg": "I am an example error",
  "service_name": "foo",
  "service_version": "bar",
  "time": "2020-05-20T12:13:53+02:00"
}
```

## Log fields

Ory provides as much context as possible for each log operation.

### HTTP request context

We include vital HTTP request info whenever possible:

- Important HTTP `headers`. Headers `Authorization` and `Cookie` are redacted per default and we do include defacto standards such
  as `X-Request-ID`, `X-Forwarded-For`, ...
- HTTP `method` (`POST`, `GET`, ...);
- HTTP `scheme` (`https` or `http`);
- HTTP `remote` IP Address;
- HTTP `host`;
- HTTP request path;
- request query (redacted per default);

```sh
time=2020-05-20T12:20:10+02:00 level=info msg=I am an example log audience=application http_request=map[headers:map[accept-encoding:gzip user-agent:Go-http-client/1.1] host:127.0.0.1:52286 method:GET path:/foo/bar query:Value is sensitive and has been redacted. To see the value set config key "log.leak_sensitive_values = true" or environment variable "LOG_LEAK_SENSITIVE_VALUES=true". remote:127.0.0.1:52287 scheme:http] service_name=foo service_version=bar
```

```sh
{
  "audience": "application",
  "http_request": {
    "headers": {
      "accept-encoding": "gzip",
      "user-agent": "Go-http-client/1.1"
    },
    "host": "127.0.0.1:52267",
    "method": "GET",
    "path": "/foo/bar",
    "query": "Value is sensitive and has been redacted. To see the value set config key \"log.leak_sensitive_values = true\" or environment variable \"LOG_LEAK_SENSITIVE_VALUES=true\".",
    "remote": "127.0.0.1:52268",
    "scheme": "http"
  },
  "level": "info",
  "msg": "I am an example log",
  "service_name": "foo",
  "service_version": "bar",
  "time": "2020-05-20T12:17:04+02:00"
}
```
