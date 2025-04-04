<?php
  require 'vendor/autoload.php';
  require_once 'app.php';

  error_reporting(E_ERROR | E_PARSE);

  $tunnelPort = getenv("TUNNEL_PORT");
if ($tunnelPort == "")
  $tunnelPort = "4000";

  $app = new App;
  // Configure Ory client to use tunnel port 4000
  $config = Ory\Client\Configuration::getDefaultConfiguration()->setHost(sprintf("http://localhost:%s", $tunnelPort));
  $app->ory = new Ory\Client\Api\FrontendApi(new GuzzleHttp\Client(), $config);
  // Pass tunnel URL to the App class for redirects
  $app->tunnelUrl = sprintf("http://localhost:%s", $tunnelPort);
  $router = new \Bramus\Router\Router();
  $router->before('GET', '/', $app->validateSession());
  $router->get('/', $app->printDashboard());
  $router->run();
?>
