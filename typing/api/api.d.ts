declare namespace API {
  export type HTTP = `http://${string}`
  export type HTTPS = `https://${string}`

  export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTION'
}