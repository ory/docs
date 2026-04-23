import React from "react"
import CodeBlock from "@theme/CodeBlock"

type Product = "network" | "oel" | "oss"

interface DeploymentDatabaseProps {
  product: Product
}

export function DeploymentDatabase({ product }: DeploymentDatabaseProps) {
  const productLabel =
    product === "network"
      ? "Ory Network"
      : product === "oel"
        ? "Ory Enterprise License"
        : "Ory Open Source"

  return (
    <>
      <h2>Integrates with Kubernetes</h2>

      <p>
        Ory technology is cloud first and runs natively on Docker and Kubernetes
        and naturally supports Kubernetes Helm Charts. Head over to our{" "}
        <a href="https://k8s.ory.com/helm">Kubernetes Helm Chart Repository</a>{" "}
        for Charts and accompanying Documentation.
      </p>

      <h2>Data storage and persistence</h2>

      <p>
        All Ory projects support storing data in memory and in relational
        databases:
      </p>

      <ul>
        <li>PostgreSQL is fully supported.</li>
        <li>
          MySQL is fully supported. Some flavors like MariaDB and AWS Aurora may
          require additional setup.
        </li>
        <li>CockroachDB is fully supported.</li>
        <li>
          SQLite is supported (in-memory and persistent) but must not be used in
          a production deployment.
        </li>
      </ul>

      <h3>PostgreSQL</h3>

      <p>
        If configuration key <code>dsn</code> (Data Source Name) is prefixed
        with <code>postgres://</code>, then PostgreSQL will be used as storage
        backend. An example configuration would look like this:
      </p>

      <CodeBlock language="text">
        DSN=postgres://user:password@host:123/database
      </CodeBlock>

      <p>
        Parameters are configured by appending them to the DSN query. For
        example, to set the <code>sslmode</code> parameter, you would append it
        to the DSN query like this:
      </p>

      <CodeBlock language="text">
        DSN=postgres://user:password@host:123/database?sslmode=verify-full
      </CodeBlock>

      <h4>Supported parameters</h4>

      <ul>
        <li>
          <code>sslmode</code> (string): Whether or not to use SSL (default is{" "}
          <code>require</code>)
          <ul>
            <li>
              <code>disable</code> - No SSL
            </li>
            <li>
              <code>require</code> - Always SSL (skip verification)
            </li>
            <li>
              <code>verify-ca</code> - Always SSL (verify that the certificate
              presented by the server was signed by a trusted CA)
            </li>
            <li>
              <code>verify-full</code> - Always SSL (verify that the
              certification presented by the server was signed by a trusted CA
              and the server host name matches the one in the certificate). This
              is the recommended setting.
            </li>
          </ul>
        </li>
        <li>
          <code>application_name</code> (string): Set to your application name
          (.e.g. <code>ory_hydra</code>, <code>ory_kratos</code>). This
          identifier will show up in your database's metrics, allowing you to
          easily see which application performs which queries.
        </li>
        <li>
          <code>fallback_application_name</code> (string): An application_name
          to fall back to if one isn't provided.
        </li>
        <li>
          <code>search_path</code> (string): specifies the{" "}
          <a href="https://www.postgresql.org/docs/12/ddl-schemas.html">
            search path
          </a>
          , such as the schema.
        </li>
        <li>
          <code>sslcert</code> (string): TLS client certificate file location.
          The file must contain PEM encoded data.
        </li>
        <li>
          <code>sslkey</code> (string): TLS client certificate private key file
          location, matching <code>sslcert</code>. The file must contain PEM
          encoded data.
        </li>
        <li>
          <code>sslrootcert</code> (string): The location of the CA (root)
          certificate file. The file must contain PEM encoded data.
        </li>
      </ul>

      <h5>Standard pooling</h5>

      <ul>
        <li>
          <code>max_conns</code> (number): Sets the maximum number of open (in
          use+idle) connections to the database. If this number is too low,
          operations will be blocked waiting for a database connection. For the
          database server, connections might be expensive (e.g. PostgreSQL
          without an intermediary connection pool), quite cheap (e.g. MySQL), or
          very cheap (e.g. CockroachDB). For the client (Ory Software), database
          connections are always very cheap.
        </li>
        <li>
          <code>max_idle_conns</code> (number): The maximum number of{" "}
          <em>idle</em> (not currently in use) connections. Useful to lower
          resource consumption in your database if connections are expensive for
          the database server (primarily PostgreSQL without an intermediary
          connection pool such as <code>pgbouncer</code>).
        </li>
        <li>
          <code>max_conn_lifetime</code> (duration: for example "500ms", "5s",
          "30m", "1h"): Sets the time after which a connection will be closed,
          irrespective of how long it has been idle. This is useful for
          maintenance: most database systems will not close connections towards
          the client even if the database server is being drained (for example
          for a software upgrade). Instead, the server relies on the client to
          close the connection. In those scenarios, this value determines the
          drain time of your database nodes. Setting this too short will cause
          connections to be re-established very frequently, negatively impacting
          latency.
        </li>
        <li>
          <code>max_conn_idle_time</code> (duration: for example "500ms", "5s",
          "30m", "1h"): Database connections will be closed after idling for
          this duration. Potentially useful to reduce resource consumption on
          the database server (see <code>max_idle_conns</code>) after a traffic
          spike.
        </li>
        <li>
          <code>connect_timeout</code> (number): Maximum wait for connection, in
          seconds. Zero or not specified means wait indefinitely.
        </li>
      </ul>

      <h5>High-performance pooling</h5>

      <p>
        High-performance pooling is supported in Ory Enterprise License (OEL)
        images. Read more about it in the{" "}
        <a href="./oel/high-performance-pooling">high-performance pooling</a>{" "}
        documentation.
      </p>

      <h3>CockroachDB</h3>

      <p>
        If configuration key <code>dsn</code> (Data Source Name) is prefixed
        with <code>cockroach://</code>, then CockroachDB will be used as storage
        backend. CockroachDB supports the same parameters as PostgreSQL.
      </p>

      <p>An example configuration would look like this:</p>

      <CodeBlock language="text">
        DSN=cockroach://user:password@host:123/database?sslmode=verify-full&...
      </CodeBlock>

      <p>
        In CockroachDB, database connections consume little resources
        server-side. By contrast, establishing a new TLS connection to a cluster
        can take several hundred milliseconds in many scenarios. As a
        consequence, Ory recommends using{" "}
        <a href="#high-performance-pooling">high-performance pooling</a> and
        setting the minimum and maximum pool sizes equal, as well as disabling
        termination of idle connections (<code>pool_max_conn_idle_time=0</code>
        ).
      </p>

      <p>
        In this configuration, a fixed-size pool of database connections is
        available at all times, preventing connection storms during traffic
        spikes. This pool size should be oversized for normal use: you might see
        most connections seemingly idle in your database metrics. Because
        connections are virtually free to keep around for both client and
        server, this is not a concern. An excessively sized connection pool may
        overload your database during extreme traffic peaks, whereas an
        undersized pool will have requests waiting unnecessarily.
      </p>

      <p>
        We recommend setting{" "}
        <code>pool_max_conn_lifetime=30m&pool_max_conn_lifetime_jitter=5m</code>{" "}
        as a compromise between low drain times during CockroachDB upgrades and
        re-establishing connections more frequently than necessary.
      </p>

      <h3>MySQL</h3>

      <p>
        If configuration key <code>dsn</code> (Data Source Name) is prefixed
        with <code>mysql://</code>, then MySQL will be used as storage backend.
        An example configuration would look like this:
      </p>

      <CodeBlock language="text">
        DSN=mysql://user:password@tcp(host:123)/database?parseTime=true
      </CodeBlock>

      <h4>Supported parameters</h4>

      <p>The following DSN parameters are supported:</p>

      <ul>
        <li>
          <code>max_conns</code> (number): Sets the maximum number of open (in
          use+idle) connections to the database. If this number is too low,
          operations will be blocked waiting for a database connection. For the
          database server, connections might be expensive (e.g. PostgreSQL
          without an intermediary connection pool), quite cheap (e.g. MySQL), or
          very cheap (e.g. CockroachDB). For the client (Ory Software), database
          connections are always very cheap.
        </li>
        <li>
          <code>max_idle_conns</code> (number): The maximum number of{" "}
          <em>idle</em> (not currently in use) connections. Useful to lower
          resource consumption in your database if connections are expensive for
          the database server (primarily PostgreSQL without an intermediary
          connection pool such as <code>pgbouncer</code>).
        </li>
        <li>
          <code>max_conn_lifetime</code> (duration: for example "500ms", "5s",
          "30m", "1h"): Sets the time after which a connection will be closed,
          irrespective of how long it has been idle. This is useful for
          maintenance: most database systems will not close connections towards
          the client even if the database server is being drained (for example
          for a software upgrade). Instead, the server relies on the client to
          close the connection. In those scenarios, this value determines the
          drain time of your database nodes. Setting this too short will cause
          connections to be re-established very frequently, negatively impacting
          latency.
        </li>
        <li>
          <code>max_conn_idle_time</code> (duration: for example "500ms", "5s",
          "30m", "1h"): Database connections will be closed after idling for
          this duration. Potentially useful to reduce resource consumption on
          the database server (see <code>max_idle_conns</code>) after a traffic
          spike.
        </li>
        <li>
          <code>collation</code> (string): Sets the collation used for
          client-server interaction on connection. In contrast to charset,
          collation doesn't issue additional queries. If the specified collation
          is unavailable on the target server, the connection will fail.
        </li>
        <li>
          <code>loc</code> (string): Sets the location for time.Time values.
          Note that this sets the location for time.Time values but doesn't
          change MySQL's time_zone setting. For that set the time_zone DSN
          parameter. Please keep in mind, that param values must be
          url.QueryEscape'ed. Alternatively you can manually replace the / with
          %2F. For example US/Pacific would be loc=US%2FPacific.
        </li>
        <li>
          <code>maxAllowedPacket</code> (number): Max packet size allowed in
          bytes. The default value is 4 MiB and should be adjusted to match the
          server settings. maxAllowedPacket=0 can be used to automatically fetch
          the max_allowed_packet variable from server on every connection.
        </li>
        <li>
          <code>readTimeout</code> (duration): I/O read timeout. The value must
          be a decimal number with a unit suffix ("ms", "s", "m", "h"), such as
          "30s", "0.5m" or "1m30s".
        </li>
        <li>
          <code>timeout</code> (duration): Timeout for establishing connections,
          aka dial timeout. The value must be a decimal number with a unit
          suffix ("ms", "s", "m", "h"), such as "30s", "0.5m" or "1m30s".
        </li>
        <li>
          <code>tls</code> (bool / string): tls=true enables TLS / SSL encrypted
          connection to the server. Use skip-verify if you want to use a
          self-signed or invalid certificate (server side).
        </li>
        <li>
          <code>writeTimeout</code> (duration): I/O write timeout. The value
          must be a decimal number with a unit suffix ("ms", "s", "m", "h"),
          such as "30s", "0.5m" or "1m30s".
        </li>
      </ul>

      <p>To set such a parameter, append it to the DSN query, for example:</p>

      <CodeBlock language="text">
        DSN=mysql://user:password@tcp(host:123)/database?parseTime=true&writeTimeout=123s
      </CodeBlock>

      <h4>AWS Aurora / MySQL 8.0+ not completing migrations</h4>

      <p>If you encounter errors such as</p>

      <CodeBlock language="text">
        {`An error occurred while connecting to SQL: error executing migrations/sql/20210817181232000006_unique_credentials.mysql.up.sql, sql: ALTER TABLE \`identity_credential_identifiers\` MODIFY \`identity_credential_type_id\` char(36) NOT NULL;: Error 1832: Cannot change column 'identity_credential_type_id': used in a foreign key constraint 'identity_credential_identifiers_type_id_fk_idx'`}
      </CodeBlock>

      <p>
        set <code>sql_mode=TRADITIONAL</code> to resolve the issue.
      </p>

      <p>See also:</p>
      <ul>
        <li>
          <a href="https://github.com/ory/hydra/issues/3363">
            https://github.com/ory/hydra/issues/3363
          </a>
        </li>
        <li>
          <a href="https://github.com/ory/kratos/issues/2167">
            https://github.com/ory/kratos/issues/2167
          </a>
        </li>
      </ul>

      <h3>SQLite</h3>

      <p>
        If configuration key <code>dsn</code> (Data Source Name) is prefixed
        with <code>sqlite://</code>, then SQLite will be used as storage
        backend. SQLite is a great choice for development but has many drawbacks
        and should not be used in production.
      </p>

      <p>An example configuration would look like this:</p>

      <CodeBlock language="text">
        DSN=sqlite:///tmp/some-db.sqlite?_fk=true
      </CodeBlock>

      <p>The following DSN parameters are required:</p>

      <ul>
        <li>
          <code>_fk</code> (bool): Must be set to <code>true</code> (
          <code>?_fk=true</code>) for foreign keys to work.
        </li>
      </ul>

      <p>
        For a list of all supported query parameters, head over to{" "}
        <a href="https://github.com/mattn/go-sqlite3#connection-string">
          github.com/mattn/go-sqlite3
        </a>
        .
      </p>

      <h4>SQLite in-memory (ephemeral)</h4>

      <p>
        Storing data in-memory helps you get started quickly without worrying
        about setting up a database first. Keep in mind that all data is
        ephemeral and will be removed when the service is killed.
      </p>

      <p>
        Using in-memory storage is usually achieved by setting configuration key{" "}
        <code>DSN=memory</code>.
      </p>
    </>
  )
}
