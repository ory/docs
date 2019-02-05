/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const script = `(function () {
  document.querySelectorAll('.tabs .tabs-nav .nav-item a').forEach(function (t) {
    t.addEventListener("click", function (e) {
      e.preventDefault();

      t.closest('.tabs-nav').querySelectorAll('.nav-item a').forEach(function (i) {
        i.classList.remove('active');
      });

      t.closest('.tabs').querySelectorAll('.tab-content .tab-pane').forEach(function (i) {
        i.classList.remove('active');
      });

      t.classList.add('active');
      document.getElementById(t.href.split('#')[1]).classList.add('active');
      return false
    });
  });
})();`

// <link
//   href="https://fonts.googleapis.com/css?family=Rubik:300,400,500"
//   rel="stylesheet"
// />

class Footer extends React.Component {
  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="copyright">{this.props.config.copyright}</section>
        <div id="codefund" />
        <script src="https://codefund.io/properties/140/funder.js" async="async" />
        <script dangerouslySetInnerHTML={{ __html: script }} />
      </footer>
    );
  }
}

module.exports = Footer;
