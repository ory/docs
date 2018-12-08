---
id: index
title: Introduction
---

Whatever your system looks like, you probably have a concept of permissions which models who is allowed to do what ("access control").
ORY Keto provides you with battle-tested, best practice access control concepts.

This page will show the different concepts that have emerged as best practices and which are being used widely in software
today.

While ORY Keto is in "sandbox" mode, not all access control mechanisms are supported. We will shine light on them anyways.

Before we take a look at Access Control Policies in detail, let's get some of the basics figured out. Every app that
has users usually assigns permissions to these users ("Bob, Alice are allowed to write blog posts"). There are
various established practices for assigning one or more permissions to one or more users.

In the context of access control, you'll often encounter **users**, **identities** or **subjects**.
They usually include users, robots, cronjobs, services, ... .
