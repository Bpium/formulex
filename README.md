# 🧠 Formulex (Formula + Expression + Exec)

**Formulex** is a lightweight and extensible library that parses user-defined formulas into SQL expressions or executable JavaScript functions — with built-in AST support.

Perfect for low-code platforms, dashboards, calculated fields, and dynamic logic engines.

> 🚧 This project is a work in progress. Expect bugs and frequent updates.

---

## 🚀 Features

- ✅ Convert formulas like `{Field 1} + {Field 2} * 2` into SQL
- ✅ Generate executable JavaScript functions from formulas
- ✅ Parse formulas into abstract syntax trees (AST)
- ✅ Support for custom field mappings and types
- ✅ Support for `dropdown` and `checkboxes` field types with id↔name mapping
- ✅ SQL result type casting (`castResultType`)
- ✅ Minimal dependencies (only [luxon](https://moment.github.io/luxon/) for date handling)

---

## 📦 Installation

```bash
npm install formulex
```

**Requirements:** Node.js `>= 22.11 < 23`

---

## 📗 Usage

### Basic example

```js
import { Parser } from 'formulex';

const fields = [
  { id: '1', name: 'Field 1', type: 'number' },
  { id: '2', name: 'Field 2', type: 'number' },
];

const expression = '{Field_1} + {Field_2} * 2';

const parser = new Parser(expression, fields);

const sql = parser.toSqlWithVariables();
// => (field_1 + (field_2 * 2))

const jsFormula = parser.toJs();
// => VARIABLES["1"] + (VARIABLES["2"] * 2)

const result = parser.runJs(jsFormula, { 1: 10, 2: 5 });
// => 20
```

### Dropdown / Checkboxes with CTE

For fields of type `dropdown` or `checkboxes`, you need to pass item metadata when casting the result type so that formulex can map ids to names and back.

```js
import { Parser } from 'formulex';

const fields = [
  { id: '1', name: 'Status', type: 'dropdown' },
];

const items = [
  { id: 'a1', name: 'Active' },
  { id: 'a2', name: 'Inactive' },
];

const parser = new Parser('{Status}', fields);

const sql = parser.toSqlWithVariables();

// Cast result to the correct type with item metadata
const castedSql = parser.castResultType(sql, 'sql', 'dropdown', [
  items.map(i => i.id),    // ids array
  items.map(i => i.name),  // names array
  'status_names',          // CTE alias for the lookup table
]);
// castedSql will reference the CTE table "status_names" for id↔name resolution
```

---

## 🛠 API

### `new Parser(expression, fields?, fieldAttribute?)`

Creates a new parser instance.

| Parameter | Type | Description |
|-----------|------|-------------|
| `expression` | `string` | Your input formula (e.g. `{Field 1} + 10`) |
| `fields` | `IField[]` | Optional array of fields with `id`, `name`, `type` |
| `fieldAttribute` | `keyof IField` | Defines how variables are resolved (`id`, `name`, etc.) |

---

### `parser.toSqlWithVariables(): string`

Converts the formula into a valid SQL expression string using field column names as variable references.

---

### `parser.toJs(): string`

Returns a JS-compatible string to be evaluated with `new Function`.
Variables are referenced as `VARIABLES["<id>"]`.

---

### `parser.runJs(js, values): unknown`

Executes a previously generated JS string with the given variable values.

| Parameter | Type | Description |
|-----------|------|-------------|
| `js` | `string` | Output of `toJs()` |
| `values` | `Record<string, unknown>` | Map of field id → value |

---

### `parser.castResultType(sql, mode, fieldType, validate?): string`

Wraps the SQL expression with a type-casting `CASE WHEN` block to ensure the result matches the target field type.

| Parameter | Type | Description |
|-----------|------|-------------|
| `sql` | `string` | SQL expression from `toSqlWithVariables()` |
| `mode` | `'sql' \| 'js'` | Execution mode |
| `fieldType` | `string` | Target field type (`number`, `text`, `date`, `boolean`, `dropdown`, `checkboxes`, etc.) |
| `validate` | `[ids, names, cteAlias]` | Required for `dropdown` / `checkboxes`: ids array, names array, and CTE table alias |

---

### `parser.getAst(): StatementsNode`

Returns the abstract syntax tree (AST) of the formula.

---

### `parser.walkAst(visitor): void`

Traverses all nodes of the AST in depth-first order and invokes the visitor callback on each node.

Useful for custom validation, metadata extraction, or modifying behavior.

Supported node types: `Number`, `Variable`, `BinaryExpression`, `CallExpression`, `UnaryExpression`, and more.

---

### `parser.getVariables(): string[]`

Returns all unique variable names (or ids, depending on `fieldAttribute`) used in the formula.

---

## 🧮 Supported Operators

| Type       | Operators                        | Example                        |
|------------|----------------------------------|--------------------------------|
| Arithmetic | `+`, `-`, `*`, `/`, `%`          | `{price} * {quantity} + 1`    |
| Comparison | `==`, `!=`, `>`, `<`, `>=`, `<=` | `{amount} > 100`              |
| Logical    | `AND`, `OR`, `NOT`               | `active == true AND score > 5` |
| Grouping   | Parentheses `( )`                | `(a + b) * c`                 |
| Variables  | `{Field Name}` or `{Field_Name}` | `{Total Price}`               |

---

## 🎯 Supported Field Types

| Field Type    | SQL Cast     | JS Cast   | Notes                                         |
|---------------|--------------|-----------|-----------------------------------------------|
| `number`      | `NUMERIC`    | `Number`  | Handles `true`/`false` → `1`/`0`             |
| `text`        | `TEXT`       | `String`  |                                               |
| `date`        | `TIMESTAMPTZ`| `DateTime`| Uses luxon for parsing                        |
| `boolean`     | `BOOLEAN`    | `Boolean` | `'false'`, `'0'`, `''` → `false`             |
| `progress`    | `NUMERIC`    | `Number`  | Mapped to `number`                            |
| `stars`       | `NUMERIC`    | `Number`  | Mapped to `number`                            |
| `switch`      | `BOOLEAN`    | `Boolean` | Mapped to `boolean`                           |
| `dropdown`    | `TEXT[]`     | `Array`   | Requires `[ids, names, cteAlias]` in `castResultType` |
| `checkboxes`  | `TEXT[]`     | `Array`   | Requires `[ids, names, cteAlias]` in `castResultType` |

---

## 🧩 Use Cases

- Dynamic calculated fields in dashboards or CRMs
- Low-code formula engines
- Report builders
- Pricing rules and financial modeling
- Serverless logic execution

---

## 📄 License

MIT
