class CustomNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statudsCode = 404;

    this.name = "NotFoundError";
  }
}
