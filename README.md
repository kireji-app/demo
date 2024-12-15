<!--- © 2013 - 2024 Eric Augustinowicz and Kristina Soriano. All Rights Reserved. --->
# Kireji
Kireji is a social platform that uses arithmetic to bijectively map application state to URL in order to:

1. Remove the distinction between applications that author files and those that don't.
1. Remove the distinction between an application's state and the contents of a file the application is authoring.
1. Reduce the variety of file types down to one - the URL.
1. Provide applications with a single, 100% reliable source of truth about their state.
1. Automatically find the most efficient strategy for rendering changes to an open application's state.

The application's state is stored as an acyclic graph of coordinate-computing property-inheriting units called "parts" which are implemented here in javascript simply as classes.

Every class in the application is a part but there is a distinction between the hierarchy of part types (which is not the global configuration space) and the hierarchy of part instances (which is).

Parts pull together many notions into one simple structure, including the notions of
1. variables in algebra
1. grammar in linguistics
1. reusable components in user interface design
1. categorical databases
1. model-view-controller architecture
1. file type specification
1. file compression

The platform has surprising and interesting behavior. For example, if I create an image-editing application using kireji, then every possible state (including the images, the layers, their names, brush settings and window layout) was always available on the server. This is similar to websites that claim to list "every phone number," "every book in the Library of Babel," etc.

There is no way for users to upload any personal information to a Kireji application. Instead, there is already a permalink to every possible application state. This paradigm can be teased into facilitating peer-to-peer interactions that are surprisingly similar to other social platforms, given a large enough configuration space and a mature enough

If you would like to learn more, check out the [documentation which uses the library](https://ejaugust.github.io/).