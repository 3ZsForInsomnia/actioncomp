# ramdux

Functional programming inspired Redux helper functions

## What this is intended to do

This library is intended to provide paramaterized higher order
functions and composable helper functions with semantic names based
on the common patterns in reducers, thunks, and selectors that they
aim to replace. The goal is to enable developers to write cleaner,
more "semantically dense" code.

## What this library contains

There are a few different types of functions in this library.

1. Property updating functions
These functions are to replace common patterns associated with
updating state in your reducers. The primary example is `updateProp`
which helps you automatically set a given property in `state` using
whatever was contained in the payload.

1. Higher order thunks
This library contains higher order functions to encourage the use
of a variety of patterns in thunks, such as `conditionalThunk`,
for creating thunks that only dispatch an action if the given predicate
returns true. These thunks are useful for extracting logic from your
reducers and components, such as dispatching multiple actions together
or ensuring that the payload is valid before it reaches the reducer.

1. List operations
This library contains a lightweight implementation of some basic,
immutable list operations. These are useful when a reducer contains
a state property that is a list, either for acting on the list or
creating selectors that should only return part of the list.

## What this library assumes

Some of the functionality provided in this library might seem
trivial, or can be handled by other libraries that provide lenses
or guarantee immutable list operations. This is simply meant to
be a lightweight, "only what you need for Redux" implementation.

Further, the thunks provided expect a particular approach to using
thunks, that I refer to as `action composition`. This is an approach
that involves considering actions as equivalent to functions that act
on or around the state contained within Redux. As such, thunks are
used to provide dynamically composable behaviors and as a mechanism
to reduce (pun not intended) the responsibilities of your reducers
and components.

An use case example of action composition at work would be to create
aggregate thunks for dispatching multiple associated actions together.
This way, each action a reducer sees can specify a change to a single
property on state, resulting in much simpler reducer behaviors in your
switch cases or reducer object maps. A more specific example would be
to validate an action's payload, such as for a video player, such that
the reducer would never receive an action to update the current seek time
to `-1` or other illegal values. For values greater than 0 and below
the current video's play length, the action to update the seek time would
be fired normally.

As these thunks do not care if the actions they dispatch are other thunks,
you can chain/compose their use for a great deal of reusable behaviors.

While action composition was the inspiration for the thunks provided,
action composition is *not* a requirement for using this library or
the thunks provided by it.

## Make suggestions and pull requests

This library is very much a work in progress, and improvements, new
behaviors and better testing is very much welcome. The only expectation
is that all functionality provided be relevant to common Redux patterns
or to encourage approaches to Redux and thunks such as action composition.

I hope this library helps!
