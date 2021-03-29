---
id: configuring
title: Configuring Ory services
---

Ory services share the same configuration system. This page documents the
details and edge cases that apply to all Ory services.

To find out more about configuring the individual services head to their
corresponding sections.

## Setting configuration values via environmental variables and flags

### Booleans

Boolean values are parsed using
[strconv.ParseBool](https://golang.org/pkg/strconv/#ParseBool).

### Numbers

Parsing for all numeric types is done using
[strconv.ParseFloat](https://golang.org/pkg/strconv/#ParseFloat).

### String/Numeric arrays

Configuration keys that require arrays expect comma separated lists as defined
by the [csv package](https://golang.org/pkg/encoding/csv/). Numeric arrays will
firstly be parsed to string arrays. Every item is then parsed to a number as
described above.

The whole csv string might be enclosed by square brackets.
