declare module 'big.js' {
  class Big {
    constructor(value: number | string | Big);
    static DP: number;
    static RM: number;
    static roundDown: number;
    abs(): Big;
    cmp(n: number | string | Big): number;
    div(n: number | string | Big): Big;
    eq(n: number | string | Big): boolean;
    gt(n: number | string | Big): boolean;
    gte(n: number | string | Big): boolean;
    lt(n: number | string | Big): boolean;
    lte(n: number | string | Big): boolean;
    minus(n: number | string | Big): Big;
    mod(n: number | string | Big): Big;
    plus(n: number | string | Big): Big;
    pow(n: number | Big): Big;
    round(dp?: number, rm?: number): Big;
    sqrt(): Big;
    times(n: number | string | Big): Big;
    toExponential(dp?: number): string;
    toFixed(dp?: number): string;
    toJSON(): string;
    toPrecision(sd?: number): string;
    toString(): string;
    valueOf(): string;
  }

  export = Big;
}

