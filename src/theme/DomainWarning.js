// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import React from "react"

const DomainWarning = ({ severity = "info" }) => (
  <div className={`admonition admonition-warning alert alert--${severity}`}>
    <div className="admonition-heading">
      <h5
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span className="admonition-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"
            ></path>
          </svg>
        </span>{" "}
        INFO
      </h5>
    </div>
    <div className="admonition-content">
      <p>
        Ory and your UI must be hosted on the same top level domain. You
        can't host Ory and your UI on separate top level domains:
      </p>
      <ul>
        <li>
          <code>ory.bar.com</code> and <code>app.bar.com</code> will work;
        </li>
        <li>
          <code>ory.bar.com</code> and <code>bar.com</code> will work;
        </li>
        <li>
          <code>ory.bar.com</code> and <code>not-bar.com</code> will not work.
        </li>
      </ul>
    </div>
  </div>
)

export default DomainWarning
