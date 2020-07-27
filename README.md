Unofficial Hypothesis client
=================

[![npm version](https://img.shields.io/npm/v/unofficial-hypothesis.svg)][npm]
[![BSD licensed](https://img.shields.io/badge/license-BSD-blue.svg)][license]

[npm]: https://www.npmjs.com/package/unofficial-hypothesis
[license]: https://github.com/diegodlh/unofficial-hypothesis-client/blob/master/LICENSE

The unofficial Hypothesis client is a browser-based tool for making annotations on web
pages. It’s an unofficial client for the [Hypothesis web annotation service][service].
It’s used by the [unofficial Hypothesis browser extension][unofficial-ext],
and can also be embedded directly into web pages (not yet).

It is a fork of the [official Hypothesis client](https://github.com/hypothesis/client).

![Screenshot of the unofficial Hypothesis client](/images/screenshot.png?raw=true)

[service]: https://github.com/hypothesis/h
[unofficial-ext]: https://github.com/diegodlh/unofficial-hypothesis-extension/

Client configuration
-----------
The annotation client gets its configuration parameters from the sidebar-app iframe's
own document (provided by the h service or by the browser extension) and from the
parent document. Information about how to configure the client from the parent document
is available [here][parent-config], and full details about how the client configures 
itself [here][config-full].

This unofficial client implements configuration from the browser extension as well via 
the `fetchConfigExtension` method in [fetch-config][fetch-config]. Briefly,
configuration settings are retrieved by the sidebar from the extension, merged with the
other configuration sources, and consumed by the sidebar itself or relayed to the 
annotator component.

Some of the settings retrieved from the extension are supported by the official client 
and documented [here][parent-config]. Others are experimental features implemented by 
this unofficial client and documented below. They are disabled by default and can be 
configured via the sidebar-app iframe's own document and from the parent document as 
well.

[parent-config]: https://h.readthedocs.io/projects/client/en/latest/publishers/config/
[config-full]: https://gist.github.com/seanh/f2cf65bc70db0815da0582c7dbabdeb6
[fetch-config]: src/sidebar/util/fetch-config.js


##### adderToolbarFooter

`String`. Controls whether the name of the currently selected annotation group is shown
on the adder toolbar. (Default: `never`).

`always` - The group name is always shown.

`exceptPublic` - The group name is shown for groups other than “Public”.

`never` - The group name is not shown.


##### usePdfWhiteOverlay

`Boolean`. Controls whether the transparent text layer in PDF documents is rendered white
instead to aid selection. (Default: `false`).


##### transparentToolbarButtons

`Boolean`. Controls whether the annotator toolbar buttons are rendered transparent i
nstead of opaque. (Default: `false`).


##### enableExperimentalNewNoteButton

This setting is already supported by the official client and documented 
[here][enableExperimentalNewNoteButton]. This unnoficial client implements configuration
via the browser extension.


##### openSidebar

This setting is already supported by the official client and documented 
[here][openSideBar]. This unnoficial client implements configuration via the browser 
extension.

[enableExperimentalNewNoteButton]: https://h.readthedocs.io/projects/client/en/latest/publishers/config/#cmdoption-arg-enableexperimentalnewnotebutton
[openSideBar]: https://h.readthedocs.io/projects/client/en/latest/publishers/config/#cmdoption-arg-opensidebar

Development
-----------

See the official client [Development Guide][developers] for instructions on building,
testing and contributing to the client.

[developers]: https://h.readthedocs.io/projects/client/en/latest/developers/

License
-------

The unofficial Hypothesis client is released under the [2-Clause BSD License][bsd2c],
sometimes referred to as the "Simplified BSD License". Some third-party
components are included. They are subject to their own licenses. All of the
license information can be found in the included [LICENSE][license] file.

[bsd2c]: http://www.opensource.org/licenses/BSD-2-Clause
[license]: https://github.com/diegodlh/unofficial-hypothesis-client/blob/master/LICENSE
