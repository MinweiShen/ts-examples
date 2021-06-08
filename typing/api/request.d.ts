declare namespace API {
  export interface Request {
    readonly url: HTTP | HTTPS;
    readonly method: Method
  }
}