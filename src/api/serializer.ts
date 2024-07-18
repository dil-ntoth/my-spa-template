import JSONAPISerializer from 'json-api-serializer';
import registerCardSerializers from './handlers/cards/registerSerializers';

export const serializer = new JSONAPISerializer({
  convertCase: 'snake_case',
  unconvertCase: 'camelCase',
});

registerCardSerializers(serializer);

export function deserialize(type: string, json: Record<string, any>): Record<string, any> | Record<string, any>[] {
  return serializer.deserialize(type, json);
}

export default serializer;
