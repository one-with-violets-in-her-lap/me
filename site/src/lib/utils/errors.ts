export class HttpResponseError extends Error {
    constructor(
        readonly statusCode: number,
        detail?: string,
    ) {
        super(
            `Received an error respnose from server: ${statusCode}. More info: ${detail}`,
        )
    }
}

export class ContentClientError extends Error {}

export class Scene3dError extends Error {}

export class NotInitializedError extends Scene3dError {}
