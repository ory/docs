---
title: Kubernetes
---

# Kubernetes

The OSS edition uses an embedded SQLite database, so it cannot scale horizontally — a multi-replica Deployment backed by a shared
volume will corrupt under concurrent writes. Run the OSS image as a single replica or move to the
[Commercial edition](../../index.md#editions) for Postgres, MySQL, or CockroachDB.

| Edition    | Image                          | Backends                       | Replicas              |
| ---------- | ------------------------------ | ------------------------------ | --------------------- |
| OSS        | `oryd/talos:latest`            | SQLite (embedded)              | 1 (single-node only)  |
| Commercial | `oryd/talos-commercial:latest` | PostgreSQL, MySQL, CockroachDB | Horizontally scalable |

## Deployment (Commercial, scalable)

The manifest below uses the commercial image and a SQL backend stored as `dsn` in a Kubernetes `Secret`. Adjust `replicas` to your
traffic profile.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: talos
spec:
  replicas: 3
  selector:
    matchLabels:
      app: talos
  template:
    metadata:
      labels:
        app: talos
    spec:
      initContainers:
        - name: migrate
          image: oryd/talos-commercial:latest
          command: ["talos", "migrate", "up"]
          env:
            - name: TALOS_DB_DSN
              valueFrom:
                secretKeyRef:
                  name: talos-secrets
                  key: dsn
      containers:
        - name: talos
          image: oryd/talos-commercial:latest
          args: ["serve", "--config", "/etc/talos/config.yaml"]
          ports:
            - containerPort: 4420
              name: http
            - containerPort: 4422
              name: metrics
          livenessProbe:
            httpGet:
              path: /health/alive
              port: http
            initialDelaySeconds: 5
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /health/ready
              port: http
            initialDelaySeconds: 5
            periodSeconds: 10
          env:
            - name: TALOS_DB_DSN
              valueFrom:
                secretKeyRef:
                  name: talos-secrets
                  key: dsn
            - name: TALOS_SECRETS_DEFAULT_CURRENT
              valueFrom:
                secretKeyRef:
                  name: talos-secrets
                  key: hmac-secret
            - name: TALOS_CREDENTIALS_ISSUER
              value: "https://api.example.com"
          volumeMounts:
            - name: config
              mountPath: /etc/talos
      volumes:
        - name: config
          configMap:
            name: talos-config
```

## Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: talos
spec:
  selector:
    app: talos
  ports:
    - name: http
      port: 4420
    - name: metrics
      port: 4422
```

## Horizontal Pod Autoscaler

Scale based on CPU or request rate:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: talos
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: talos
  minReplicas: 3
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```
