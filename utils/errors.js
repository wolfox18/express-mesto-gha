import { constants } from 'http2';

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = constants.HTTP_STATUS_BAD_REQUEST;
  }
}

export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = constants.HTTP_STATUS_UNAUTHORIZED;
  }
}

export class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = constants.HTTP_STATUS_FORBIDDEN;
  }
}

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = constants.HTTP_STATUS_NOT_FOUND;
  }
}

export class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = constants.HTTP_STATUS_CONFLICT;
  }
}
