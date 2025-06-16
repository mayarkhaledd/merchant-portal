**Summary**

The following document contains guidelines about branch naming conventions \*\*
All branch names are prefixed with `prefix/`

## Versioning Branch

We can use `version/1.0` as an example of where **1.0** is the release number We
can also create a perp branch for building and testing before merging with main
branch, for example `prep/1.0` where **prep** is the release number.

## Story Branch

For story branches we can use `story/ene-111` where **ene** is the story we're
working on and the number is the story ticket number.

For example if we a have story ticket named `User Authentication` with ID
`56322` the branch name for this story should be
`story/user-authentication-56322`

## Feature Branch

For feature branches we can use `feature/ene-111` where **ene** is the story
we're working on and the number is the feature ticket number.

For example if we a have feature ticket named `Login - Contact Us` with ID
`56322` the branch name for this feature should be
`feature/login-contact-us-56322`

## Issue Branch

For story branches we can use `fix/ene-111` where **ene** is the issue we're
working on and the number is the ticket number.

Example branch name `fix/login-contact-us-32003` where 32003 is the ticket ID

## Enhancement Branch

For enhancement branches we can use `enhancement/ene` where **ene** is the
feature we're working on.
