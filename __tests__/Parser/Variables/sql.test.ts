import { Parser } from '../../../src';

const fields = {
  '1': {
    id: '1',
    type: 'number',
  },
  '2': {
    id: '2',
    type: 'number',
  },
  '3': {
    id: '3',
    type: 'text',
  },
  '4': {
    id: '4',
    type: 'date',
  },
};

const values = {
  1: 100,
  2: 500,
  3: 'stringCol',
  4: 'dateCol',
};

describe('variables to sql', () => {
  test('num', () => {
    const parser = new Parser('{1}', fields);
    expect(parser.toSqlWithVariables(false, values)).toBe(`COALESCE(100, 0)`);
  });
  test('text', () => {
    const parser = new Parser('{3}', fields);
    expect(parser.toSqlWithVariables(false, values)).toBe(
      `COALESCE("stringCol", '')`,
    );
  });
  test('date', () => {
    const parser = new Parser('{4}', fields);
    expect(parser.toSqlWithVariables(false, values)).toBe(
      `COALESCE("dateCol", NULL)`,
    );
  });
  test('isempty number field skips coalesce default', () => {
    const parser = new Parser('ISEMPTY({1})', fields);
    expect(parser.toSqlWithVariables(false, values)).toBe(
      "((100) IS NULL OR (100)::TEXT = '' OR (100)::TEXT = '{}')",
    );
  });
  test('arithmetic still coalesces empty number to 0', () => {
    const parser = new Parser('{1}+1', fields);
    expect(parser.toSqlWithVariables(false, values)).toBe(
      `ROUND((COALESCE(100, 0) + 1)::NUMERIC, 10)`,
    );
  });
});

describe('variables errors', () => {
  test('return error if we write no valid variable', () => {
    const parser = new Parser('{Поле 1}', fields);
    expect(() => parser.toSqlWithVariables()).toThrow();
  });
});
