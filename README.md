# PEAQ DID Resolver

This package provides methods to resolve a Decentralized Identifier (DID) from the `peaq` blockchain.

It supports the proposed [Decentralized Identifiers](https://w3c-ccg.github.io/did-spec/) spec
from the [W3C Credentials Community Group](https://w3c-ccg.github.io/).

It requires the [DID Resolver](https://github.com/decentralized-identity/did-resolver) library,
which is the primary interface for resolving DIDs.

## DID method

TBD

## DID Document

A minimal DID Document might contain the following information:

```json
{
  "@context": [
    "https://www.w3.org/ns/did/v1"
  ],
  "id": "did:peaq:5E1WsjiPHvPW5LdhL4h53TTc58YLGDpLeLi6jW8E6ypLeRtB",
  "controller": "did:peaq:5E1WsjiPHvPW5LdhL4h53TTc58YLGDpLeLi6jW8E6ypLeRtB",
  "authentication": [
    "did:peaq:5E1WsjiPHvPW5LdhL4h53TTc58YLGDpLeLi6jW8E6ypLeRtB#keys-1"
  ],
  "verificationMethod": [
    {
      "id": "did:peaq:5E1WsjiPHvPW5LdhL4h53TTc58YLGDpLeLi6jW8E6ypLeRtB#keys-1",
      "type": "Ed25519VerificationKey2020",
      "controller": "did:peaq:5E1WsjiPHvPW5LdhL4h53TTc58YLGDpLeLi6jW8E6ypLeRtB",
      "publicKeyMultibase": "z6Mkke5f4w4df5vLnW92jbxYy4Z3cayFD9XuegRS1TCnAB3x"
    }
  ],
  "service": []
}
```

## Resolving a DID document

The resolver presents a simple `resolver()` function that returns a ES6 Promise returning the DID document.

```typescript
import { Resolver } from 'did-resolver'
import { getResolver } from 'peaq-did-resolver'

// getResolver() accepts a DID Resolver server url
const peaqResolver = getResolver("wss://wsspc1-qa.agung.peaq.network")

const didResolver = new Resolver({
    ...peaqResolver
    //...you can flatten multiple resolver methods into the Resolver
})

didResolver.resolve("did:peaq:5E1WsjiPHvPW5LdhL4h53TTc58YLGDpLeLi6jW8E6ypLeRtB").then(doc => console.log(doc))

// You can also use ES7 async/await syntax
;(async () => {
    const doc = await didResolver.resolve("did:peaq:5E1WsjiPHvPW5LdhL4h53TTc58YLGDpLeLi6jW8E6ypLeRtB")
    console.log(doc)
})();
```
