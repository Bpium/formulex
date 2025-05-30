import {
  LITERAL_NODE_TYPE,
  NUMBER_NODE_TYPE,
} from '../../../../constants/nodeTypes';
import { VariableFunction } from '../types';

import { textFunctionsToJsMap } from './js';
import { textFunctionsToSqlMap } from './sql';
import { ValidTextFunctionsNames } from './types';

export const textFunctions: Record<ValidTextFunctionsNames, VariableFunction> =
  {
    CONCAT: [
      {
        args: [
          {
            type: [LITERAL_NODE_TYPE, NUMBER_NODE_TYPE],
            many: true,
          },
        ],
        returnType: [LITERAL_NODE_TYPE],
        jsFn: textFunctionsToJsMap.CONCAT,
        sqlFn: textFunctionsToSqlMap.CONCAT,
      },
    ],
    JOIN: [
      {
        args: [
          {
            type: [LITERAL_NODE_TYPE],
          },
          {
            type: [LITERAL_NODE_TYPE, NUMBER_NODE_TYPE],
            many: true,
          },
        ],
        returnType: [LITERAL_NODE_TYPE],
        jsFn: textFunctionsToJsMap.JOIN,
        sqlFn: textFunctionsToSqlMap.JOIN,
        specialWorkWithNull: true,
      },
    ],
    TRIM: [
      {
        args: [
          {
            type: [LITERAL_NODE_TYPE],
          },
          {
            type: [LITERAL_NODE_TYPE],
          },
          {
            type: [LITERAL_NODE_TYPE],
          },
        ],
        returnType: [LITERAL_NODE_TYPE],
        jsFn: textFunctionsToJsMap.TRIM,
        // trim(both 'xyz' from 'yxTomxx')
        sqlFn: textFunctionsToSqlMap.TRIM,
        jsSafeFn: textFunctionsToJsMap.SAFE_TRIM,
        sqlSafeFn: textFunctionsToSqlMap.SAFE_TRIM,
      },
    ],
    SEARCH: [
      {
        args: [
          {
            type: [LITERAL_NODE_TYPE],
          },
          {
            type: [LITERAL_NODE_TYPE],
          },
        ],
        returnType: [NUMBER_NODE_TYPE],
        jsFn: textFunctionsToJsMap.SEARCH,
        // position(substring in string)
        sqlFn: textFunctionsToSqlMap.SEARCH,
      },
    ],
    REPLACE: [
      {
        args: [
          {
            type: [LITERAL_NODE_TYPE],
          },
          {
            type: [LITERAL_NODE_TYPE],
          },
          {
            type: [LITERAL_NODE_TYPE],
          },
        ],
        returnType: [LITERAL_NODE_TYPE],
        jsFn: textFunctionsToJsMap.REPLACE,
        sqlFn: textFunctionsToSqlMap.REPLACE,
      },
    ],
    LOWER: [
      {
        args: [
          {
            type: [LITERAL_NODE_TYPE],
          },
        ],
        returnType: [LITERAL_NODE_TYPE],
        jsFn: textFunctionsToJsMap.LOWER,
        sqlFn: textFunctionsToSqlMap.LOWER,
      },
    ],
    UPPER: [
      {
        args: [
          {
            type: [LITERAL_NODE_TYPE],
          },
        ],
        returnType: [LITERAL_NODE_TYPE],
        jsFn: textFunctionsToJsMap.UPPER,
        sqlFn: textFunctionsToSqlMap.UPPER,
      },
    ],
    REPEAT: [
      {
        args: [
          {
            type: [LITERAL_NODE_TYPE],
          },
          {
            type: [NUMBER_NODE_TYPE],
          },
        ],
        returnType: [LITERAL_NODE_TYPE],
        jsFn: textFunctionsToJsMap.REPEAT,
        sqlFn: textFunctionsToSqlMap.REPEAT,
      },
    ],
    SUBSTRING: [
      {
        args: [
          {
            type: [LITERAL_NODE_TYPE],
          },
          {
            type: [NUMBER_NODE_TYPE],
          },
          {
            type: [NUMBER_NODE_TYPE],
          },
        ],
        returnType: [LITERAL_NODE_TYPE],
        jsFn: textFunctionsToJsMap.SUBSTRING,
        // substring('Thomas' from 2 for 3)
        sqlFn: textFunctionsToSqlMap.SUBSTRING,
      },
    ],
    LEFT: [
      {
        args: [
          {
            type: [LITERAL_NODE_TYPE],
          },
          {
            type: [NUMBER_NODE_TYPE],
          },
        ],
        returnType: [LITERAL_NODE_TYPE],
        jsFn: textFunctionsToJsMap.LEFT,
        sqlFn: textFunctionsToSqlMap.LEFT,
      },
    ],
    RIGHT: [
      {
        args: [
          {
            type: [LITERAL_NODE_TYPE],
          },
          {
            type: [NUMBER_NODE_TYPE],
          },
        ],
        returnType: [LITERAL_NODE_TYPE],
        jsFn: textFunctionsToJsMap.RIGHT,
        sqlFn: textFunctionsToSqlMap.RIGHT,
      },
    ],
    LEN: [
      {
        args: [
          {
            type: [LITERAL_NODE_TYPE],
          },
        ],
        returnType: [NUMBER_NODE_TYPE],
        jsFn: textFunctionsToJsMap.LEN,
        sqlFn: textFunctionsToSqlMap.LEN,
      },
    ],
    TO_STRING: [
      {
        args: [
          {
            type: [],
          },
        ],
        returnType: [LITERAL_NODE_TYPE],
        jsFn: textFunctionsToJsMap.TO_STRING,
        sqlFn: textFunctionsToSqlMap.TO_STRING,
      },
    ],
  };
