// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

<?php

  class App {
      // save the session to display it on the dashboard
      private ?Ory\Client\Model\Session $session;
      public ?Ory\Client\Api\V0alpha2Api $ory;

      public function validateSession(){
          $cookies = "";
          // set the cookies on the ory client
          foreach ($_COOKIE as $key=>$value) {
              $cookies .= "$key=$value;";
          }

          try {
              // check if we have a session
              $session = $this->ory->toSession("", $cookies);
              if (! $session["active"]) throw new Exception('Session expired');
          } catch (Exception $e) {
              error_log('Exception when calling V0alpha2Api->toSession: '.$e->getMessage());
              // this will initialize a new login flow and Kratos will redirect the user to the login UI
              header("Location: /.ory/self-service/login/browser", true, 303);
              die();
          }
          $this->session = $session;
      }

      public function printDashboard(){
          echo '
<html lang="en">
<head>
    <title>Ory Network secured Go web app</title>
</head>
<body>
    <h1>Dashboard</h1>
    <hr />
    <h2>Your Session Data:</h2>
    <pre><code>', json_encode($this->session, JSON_PRETTY_PRINT), '</code></pre>
</body>
</html>
';
      }
  }
?>
