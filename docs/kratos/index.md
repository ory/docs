---
id: index
title: Introduction
---

ORY Kratos is the first and only cloud native Identity and User Management system in the world. The days where you would implement a User Login for the 10th time are finally over! ORY Hive includes

- **user login and registration** using a variety of configurable authentication mechanisms: **Username/Email + Password**, **Social Sign In** ("Sign in with GitHub, Google, ..."), Passwordless and others.
- **multi-factor authentication** supporting a wide range of protocols such as [Google Authenticator](https://en.wikipedia.org/wiki/Google_Authenticator) (formalized as [RFC 6238](https://tools.ietf.org/html/rfc6238) and [IETF RFC 4226](https://tools.ietf.org/html/rfc4226)).
- **account verification** and **account recovery** by several means: E-Mail, Recovery Codes, ...
- **storing user information** in a way that does not enforce *our* data model on *you*, but allows you to define what data certain users may store using [JSON Schema](https://json-schema.org/). If you have more than one identity type no problem - every identity can have its own JSON Schema - even versioned!
- **headless UI** - instead of learning our custom (and probably not that great) template engine, just bring your own! ORY Hive is all APIs and you can write your UI in the language (JavaScript, Node, Java, PHP, ...) and framework (React, Vue, Angular, ...) you like! Check out our [reference UI implementation](https://github.com/ory/hive-selfservice-ui-node) - it's below 100 lines of code!
- **a workflow engine** to decide what happens after, for example, a user signs up (redirect somewhere? require activation before login? issue session right away?) as well as to notify other systems on certain actions (create a Stripe account after sign up, synchronize with newsletter, ...).
- ... and of course many more features that would blow the scope of this introduction.

## The Pillars of Identity

##