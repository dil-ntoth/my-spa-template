export interface Session {
  name: string;
  email: string;
  uid: string;
  locale: string;
  dateFormat: string;
  [k: string]: unknown;
}
