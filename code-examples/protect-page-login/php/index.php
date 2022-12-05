// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

<?php
  require 'vendor/autoload.php';
  require_once 'app.php';

  error_reporting(E_ERROR | E_PARSE);

  $proxyPort = getenv("PROXY_PORT");
  if ($proxyPort == "") $proxyPort = "4000";

  $app = new App;
  // register a new Ory client with the URL set to the Ory CLI Proxy
  // we can also read the URL from the env or a config file
  $config = Ory\Client\Configuration::getDefaultConfiguration()->setHost(sprintf("http://localhost:%s/.ory", $proxyPort));
  $app->ory = new Ory\Client\Api\FrontendApi(new GuzzleHttp\Client(), $config);

  $router = new \Bramus\Router\Router();
  $router->before('GET', '/', $app->validateSession());
  $router->get('/', $app->printDashboard());
  $router->run();
?>
