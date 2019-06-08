# Ramdux

Functional programming inspired Redux helper functions

## What this is intended to do

This library is intended to provide parameterized higher order
functions and composable helper functions with semantic names based
on the common patterns in reducers, thunks, and selectors that they
aim to replace or enhance. The goal is to enable developers to write
cleaner, more "semantically dense" code, as well as encourage Action
Composition patterns, with the minimum amount of code necessary.

Note that this library is _not_ meant to be an all in one solution
to making Redux or good practices with it better or easier. I personally
have found this collection of helper and higher order functions to work
best when used with Redux Starter Kit, Ramda, and Typescript.

While this library is not quite fully tested and documented just yet,
the goal is to bring everything up to 100% test and documentation
coverage, reduce package size and CPU time, and better guarantee
immutability (_all_ functions return new values, but could be better
about how they handle inputs and temporary values).

## What this library contains

There are a few different types of functions in this library.

1. Property updating functions

    These functions are to replace common patterns associated with
updating state in your reducers. The primary example is `updateProp`
which helps you automatically set a given property in `state` using
whatever was contained in the payload. It also has basic

1. Higher order thunks

    This library contains higher order functions to encourage the use of
a variety of patterns based on thunks. One example is `conditionalThunk`,
which creates thunks that only dispatch an action if the given predicate
returns true. These thunks are useful for extracting logic from your
reducers and components, such as dispatching multiple actions together
or ensuring that the payload is valid before it reaches a reducer.

1. List operations

    This library contains a lightweight implementation of some basic
immutable list operations. These are useful when a reducer contains
a state property that is a list, either for acting on the list or
creating selectors that should only return part of the list.

1. A transformer

    Also included is a transformer function which can take plain JSON
as a configuration, and an input, and return a newly shaped object,
value or string. It provides a simple, lightweight way to completely
reshape an object, reshape objects in a list, or provide arguments
from a context to fill out template literals. It can also be
configured to handle all of this recursively. It is a great tool and
is used within this library itself, such as by the `aggregateThunk`
to divide up a given payload to provide subsections of a context
object to each dispatched action.

## Action Composition

Some of the functionality provided in this library might seem
trivial, or can be handled by other libraries that provide more
features or are more widely used. This is simply meant to be a
lightweight, "only what you need" style implementation for some of the
most common patterns in Redux.

Further, the thunks provided were created assuming a particular approach
to using Redux and thunks. I call this approach `action composition`.
This is an approach that considers actions as equivalent to functions,
with a narrower aim in that they act on or around state contained within
Redux. As such, thunks are used to provide dynamically composable
behaviors and as a mechanism to take on several of the responsibilities
of your reducers and components.

The simplest example of action composition at work would be as follows.
Let's say you create a thunk that dispatches multiple actions together.
And let's say you also create a thunk that runs a conditional against
an some value, and dispatches a specific action if the check against
the value passes. Action Composition occurs when the conditional thunk
dispatches the multiple-dispatch thunk.

This is possible because Redux thunks are, at the end of the day,
_functions_. This means we can compose thunks just like any other
functions, an increasingly popular pattern with the rise of React, in
frontend, and Functional Programming more generally.

This approach to actions let's us break down our state related logic
to whatever extent we want, and do so in a more flexible, reusable way
than doing so inside of our reducers or components. To lay out one
approach, you can leave state as it is but pull all logic not directly
associated with returning the new state object (setting/updating state)
out of your reducers. Instead, this logic can go into composable thunks.
In such a situation, reducer logic should (usually) only update one
state property per action, and handle instances where multiple state
properties change together using aggregate thunks.
Validation logic (such as to determine if a user is logged in or an
action's payload is valid) and other examples or combinations of logic
can all be handled like this in action composition.

This is beneficial as each action a reducer actually knows about
can now focus on how a single property in state changes, greatly
limiting the amount of work a reducing function or object map needs to
do. If Action Composition is used extensively, reducers simply become
a way to set/create/update state, and actions on reducers are now
simply a request to update state. Even better, all business logic is
handled in a "new" layer that can focus explicitly on translating
UI sourced dispatch events into business logic and requests for
changes in state. Lastly, this does not come at any cost to our
components, as they gain no knowledge of state, thunks, or how they work.

While action composition was the inspiration for the thunks provided,
action composition is *not* a requirement for using this library or
the thunks provided by it. Over time, use case and code examples will
be added to this library in other `readme.md` files to help users
understand what this pattern is and why it's great.

## Make suggestions and pull requests

This library is very much a work in progress, and improvements, new
behaviors and better testing is very much welcome. The only expectation
is that all functionality provided be relevant to common Redux patterns
or to encourage approaches to Redux and thunks such as action composition.

I hope this library helps!
