# Holochain Client - JavaScript

[![Project](https://img.shields.io/badge/Project-Holochain-blue.svg?style=flat-square)](http://holochain.org/)
[![Forum](https://img.shields.io/badge/Forum-forum%2eholochain%2enet-blue.svg?style=flat-square)](https://forum.holochain.org)
![CI](https://github.com/holochain/holochain-client-js/actions/workflows/test.yml/badge.svg?branch=main)

[![Twitter Follow](https://img.shields.io/twitter/follow/holochain.svg?style=social&label=Follow)](https://twitter.com/holochain)
License: [![License: CAL 1.0](https://img.shields.io/badge/License-CAL%201.0-blue.svg)](https://github.com/holochain/cryptographic-autonomy-license)

A Nodejs client for the Holochain Conductor API

> Holochain's Conductor API is under active development. This client package tracks that development fairly closely but sometimes gets behind.

## Installation

To install from NPM, run
```bash
npm install --save-exact @holochain/client
```

> This code is still under alpha development and npm releases are pre-releases with `dev` tags meaning they will not use full semantic versioning, and you may wish to lock to an exact version of the library for that reason, as shown in the above command.

## Sample usage

### Use AdminWebsocket
```typescript
  const admin = await AdminWebsocket.connect(`ws://localhost:8000`, TIMEOUT)
  await admin.generateAgentPubKey()
```

### Use AppWebsocket
```typescript
  const signalCb = (signal: AppSignal) => {
    // impl...
    resolve()
  }

  const TIMEOUT = 12000
  // default timeout is set to 12000
  const client = await AppWebsocket.connect(`ws://localhost:${appPort}`, 12000, signalCb)

  // default timeout set here (30000) will overwrite the defaultTimeout(12000) set above
  await client.callZome({
   cap: null,
   cell_id,
   zome_name: "test_zome",
   fn_name: 'test_emitter_fn',
   provenance: fakeAgentPubKey('TODO'),
   payload: null,
  }, 30000)
```

## API Reference

See [docs/API.md](docs/API.md)


# Holochain Compatibility

This version of `@holochain/client` is currently working with
- `holochain/holochain` at tag [holochain-0.0.121](https://github.com/holochain/holochain/tree/holochain-0.0.121)
- hdk version [0.0.117 from crates.io](https://crates.io/crates/hdk/0.0.117)

If updating this code, please make changes to the git `rev/sha` above.  (You can get this from `hn-introspect` after updating the holonix-hash)

## Running tests

You need a version (`stable` toolchain) of Rust available.

You need `holochain` and `hc` on your path, best to get them from nix with `nix-shell`.

To perform the pre-requisite DNA compilation steps, and run the Nodejs test, run:
```bash
nix-shell
./run-test.sh
```

## Contribute
Holochain is an open source project.  We welcome all sorts of participation and are actively working on increasing surface area to accept it.  Please see our [contribution guidelines](/CONTRIBUTING.md) for our general practices and protocols on participating in the community, as well as specific expectations around things like code formatting, testing practices, continuous integration, etc.

* Connect with us on our [forum](https://forum.holochain.org)

## License
 [![License: CAL 1.0](https://img.shields.io/badge/License-CAL%201.0-blue.svg)](https://github.com/holochain/cryptographic-autonomy-license)

Copyright (C) 2020-2021, Holochain Foundation

This program is free software: you can redistribute it and/or modify it under the terms of the license
provided in the LICENSE file (CAL-1.0).  This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
PURPOSE.
