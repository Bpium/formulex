import {
  BOOLEAN_NODE_TYPE,
  LITERAL_NODE_TYPE,
  NUMBER_NODE_TYPE,
} from '../../../constants/nodeTypes';
import { ValidBinOperatorsNames, IOperator } from './types';

// TODO: write tests
// null in returnType means all types are valid, but types should be equal
// array in operand type means all types in array are valid in any combination
export const allBinOperators: Record<ValidBinOperatorsNames, IOperator[]> = {
  PLUS: [
    {
      operandType: NUMBER_NODE_TYPE,
      returnType: NUMBER_NODE_TYPE,
      jsFn: (left, right) => `${left} + ${right}`,
      sqlFn: (left, right) => `${left} + ${right}`,
    },
    {
      operandType: LITERAL_NODE_TYPE,
      returnType: LITERAL_NODE_TYPE,
      jsFn: (left, right) => `${left} + ${right}`,
      sqlFn: (left, right) => `CONCAT(${left}, ${right})`,
    },
    {
      operandType: [LITERAL_NODE_TYPE, NUMBER_NODE_TYPE],
      returnType: LITERAL_NODE_TYPE,
      jsFn: (left, right) => `String(${left}) + String(${right})`,
      sqlFn: (left, right) =>
        `CONCAT(${left}::varchar(255), ${right}::varchar(255))`,
    },
  ],
  MINUS: [
    {
      operandType: NUMBER_NODE_TYPE,
      returnType: NUMBER_NODE_TYPE,
      jsFn: (left, right) => `${left} - ${right}`,
      sqlFn: (left, right) => `${left} - ${right}`,
    },
  ],
  MULTIPLY: [
    {
      operandType: NUMBER_NODE_TYPE,
      returnType: NUMBER_NODE_TYPE,
      jsFn: (left, right) => `${left} * ${right}`,
      sqlFn: (left, right) => `${left} * ${right}`,
    },
  ],
  DIVISION: [
    {
      operandType: NUMBER_NODE_TYPE,
      returnType: NUMBER_NODE_TYPE,
      jsFn: (left, right) => `${left} / ${right}`,
      sqlFn: (left, right) => `${left} / ${right}`,
    },
  ],
  REMAINDER: [
    {
      operandType: NUMBER_NODE_TYPE,
      returnType: NUMBER_NODE_TYPE,
      jsFn: (left, right) => `${left} % ${right}`,
      sqlFn: (left, right) => `${left} % ${right}`,
    },
  ],
  POWER: [
    {
      operandType: NUMBER_NODE_TYPE,
      returnType: NUMBER_NODE_TYPE,
      jsFn: (left, right) => `${left} ^ ${right}`,
      sqlFn: (left, right) => `${left} ^ ${right}`,
    },
  ],
  EQUAL: [
    {
      operandType: null,
      returnType: BOOLEAN_NODE_TYPE,
      jsFn: (left, right) => `${left} == ${right}`,
      sqlFn: (left, right) => `${left} = ${right}`,
    },
  ],
  NOT_EQUAL: [
    {
      operandType: null,
      returnType: BOOLEAN_NODE_TYPE,
      jsFn: (left, right) => `${left} != ${right}`,
      sqlFn: (left, right) => `${left} != ${right}`,
    },
  ],
  GREATER: [
    {
      operandType: null,
      returnType: BOOLEAN_NODE_TYPE,
      jsFn: (left, right) => `${left} > ${right}`,
      sqlFn: (left, right) => `${left} > ${right}`,
    },
  ],
  GREATER_OR_EQUAL: [
    {
      operandType: null,
      returnType: BOOLEAN_NODE_TYPE,
      jsFn: (left, right) => `${left} >= ${right}`,
      sqlFn: (left, right) => `${left} >= ${right}`,
    },
  ],
  LESS: [
    {
      operandType: null,
      returnType: BOOLEAN_NODE_TYPE,
      jsFn: (left, right) => `${left} < ${right}`,
      sqlFn: (left, right) => `${left} < ${right}`,
    },
  ],
  LESS_OR_EQUAL: [
    {
      operandType: null,
      returnType: BOOLEAN_NODE_TYPE,
      jsFn: (left, right) => `${left} <= ${right}`,
      sqlFn: (left, right) => `${left} <= ${right}`,
    },
  ],
  AND: [
    {
      operandType: BOOLEAN_NODE_TYPE,
      returnType: BOOLEAN_NODE_TYPE,
      jsFn: (left, right) => `${left} && ${right}`,
      sqlFn: (left, right) => `WHERE ${left} AND ${right}`,
    },
  ],
  OR: [
    {
      operandType: BOOLEAN_NODE_TYPE,
      returnType: BOOLEAN_NODE_TYPE,
      jsFn: (left, right) => `${left} || ${right}`,
      sqlFn: (left, right) => `WHERE ${left} OR ${right}`,
    },
  ],
};
