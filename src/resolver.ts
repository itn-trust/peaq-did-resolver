import {
  DIDResolutionResult,
  DIDResolver,
  DIDDocument,
  DIDResolutionMetadata,
  DIDDocumentMetadata,
  ParsedDID,
} from "did-resolver"
import { peaqDidResolver } from "@peaq-network/did-resolver"

export function getResolver(url: string): Record<string, DIDResolver> {
  async function resolve(
    did: string,
    parsed: ParsedDID,
  ): Promise<DIDResolutionResult> {
    const resolver = new peaqDidResolver()
    let didDocument: DIDDocument | null = null
    let didDocumentMetadata: DIDDocumentMetadata = {}
    let didResolutionMetadata: DIDResolutionMetadata = {}

    try {
      const resolved = await resolver.resolve({
        baseUrl: url,
        name: parsed.did,
        address: parsed.id,
      })

      if (!resolved || !resolved.document) {
        return getResolutionError(
          "notFound",
          `No matching DID document found for requested DID.`,
        )
      }

      didDocument = {
        "@context": ["https://www.w3.org/ns/did/v1"],
        ...resolved.document,
      }
      didDocumentMetadata = { created: resolved.created }
    } catch (error) {
      return getResolutionError(
        "notFound",
        `DID must resolve to a valid https URL containing a JSON document: ${error}`,
      )
    }

    const docIdMatchesDid = didDocument?.id === did
    if (!docIdMatchesDid) {
      return getResolutionError(
        "notFound",
        "DID document id does not match requested DID.",
      )
    }

    const contentType =
      typeof didDocument?.["@context"] !== "undefined"
        ? "application/did+ld+json"
        : "application/did+json"

    return {
      didDocument,
      didDocumentMetadata,
      didResolutionMetadata: { ...didResolutionMetadata, contentType },
    }

    function getResolutionError(
      error: string,
      message: string,
    ): DIDResolutionResult {
      return {
        didResolutionMetadata: { error, message },
        didDocument: null,
        didDocumentMetadata: {},
      }
    }
  }

  return { peaq: resolve }
}
