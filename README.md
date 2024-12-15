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

The platform has surprising and interesting behavior: information is seemingly provided by the user and uploaded, but the application is actually offline. There is already a permalink to anything the user could submit, so the user is not submitting data, but finding states that I've already encoded into the offline configuration space.

There is no way for users to upload any personal information to a Kireji application. The dat the user creates is stored in the addressbar as the URL's hash, a part of the URL that the browser does not submit to the server.

If you would like to learn more, check out the [documentation which uses the library](https://ejaugust.github.io/).