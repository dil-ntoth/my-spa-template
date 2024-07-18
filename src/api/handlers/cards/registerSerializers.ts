import JSONAPISerializer from 'json-api-serializer';

export default function register(serializer: JSONAPISerializer): void {
  serializer.register('card');
}
