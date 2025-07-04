# ADR 001: Begin using Architectural Decision Records (ADR) and store them in the repository

- **Date created**: 04/02/2025
- **Driver**: Alex Foxleigh (Foxy)

## Status

![proposed]

## Context

Adopting ADRs (Architectural Decision Records) to store technical decisions and
the reasoning behind them in the repository will help to:

- Document decisions
- Provide a reference for developers to refer to at a later date
- Provide a way to track the evolution of the project

## Advice

ADR's are useful for documenting decisions and the reasoning behind them. They
they are a useful tool for devlopers to refer to. They should be kept up to
date and should be reviewed regularly. They should be stored in the repository
so that they are easily accessible and can be updated as the project evolves.

Here is an article on ADR's:

https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions.html

This document itself is an example of an ADR

### Format

ADRs should be written in Markdown and stored in the `docs/architectural-decisions`
folder in the repository.

All ADR's should follow the following format:

#### **Title**

A short descriptive title for the ADR in the form of a decision statement, e.g.
"Use a centralized issue tracker for defect management". The title should
include the following elements:

- The key words "ADR" and a three digit integer, e.g. "ADR 001", "ADR 002", etc.
- A short descriptive title, preferably using the imperative mood, e.g. "Use a
  centralized issue tracker for defect management".
- A key decision word, e.g. "Use", "Don't Use", "Start Using", "Stop Using",
  "Replace", "Create", "Remove", "Deprecate", "Migrate", "Make consistent", etc.

The title should not include the status of the decision, e.g. "Accepted",
"Rejected", "Deprecated", etc.

#### **Dates**

The date that the ADR was created should be under a "Date created" header.
The date that the ADR was last updated should be under a "Date last updated" header.

#### **Drivers**

The people or teams that are driving the decision, e.g. "Product Management",
"Architecture Team". This is important because it helps to identify who is
responsible for the decision at a later date.

#### **Status**

The current status of the ADR, e.g. "Proposed", "Accepted", "Superceded",
"Rejected", "Deprecated".

If the ADR has been Superceded, Rejected, or Deprecated, the ADR should include
a refrerence to the ADR that supercedes, rejects, or deprecates it where appropriate.

e.g.

![superceded] by [ADR 002](./adr-002-use-next-js.md)

#### **Context**

The problem that the ADR is trying to solve and the forces that are driving the decision.

#### **Decision**

The decision that was made. Note: The decision is not the same as the status of
the ADR. The decision is the outcome of the ADR, e.g. "Use a centralized issue
tracker for defect management". The decision can still be rejected or
superceded even after it has been accepted.

#### **Consequences**

The positive and negative consequences of the decision. This section should be
used to help determine if the decision should be accepted or rejected.

## Discussions

- Alex Foxleigh - This is the place to discuss the ADR. Please keep the discussion
  on topic and try to avoid repeating the same points. Please put your name next to
  any points you make.

## Decision

Start adopting ADR's immediately and store the records in the
`docs/architectural-decisions` folder in the repository.

## Consequences

- There will be single source of truth for ADRs
- There will be an audit trail for decisions and the reasons behind them
- There will be a slightly increased overhead for developers to create and update
  ADRs
- There is a risk that ADRs will not be kept up to date

[proposed]: https://img.shields.io/badge/Proposed-yellow?style=for-the-badge
[accepted]: https://img.shields.io/badge/Accepted-green?style=for-the-badge
[superceded]: https://img.shields.io/badge/Superceded-orange?style=for-the-badge
[rejected]: https://img.shields.io/badge/Rejected-red?style=for-the-badge
[deprecated]: https://img.shields.io/badge/Deprecated-grey?style=for-the-badge
