import { MathType, fraction, equal, add, pow, multiply, isFraction } from 'mathjs';

export function coefficientsToString(factors: MathType[]): string {
  const pattern = factors.reduce((result, factor, index) => {
    if (equal(factor, 0)) {
      return result;
    }
    const v = equal(factor, 1) ? '' : `(${isFraction(factor) ? factor.toFraction() : factor.toString()})`;
    const x = index === 0 ? '' : index === 1 ? 'x' : `x^${index}`;
    const suffix = result ? ` + ${result}` : '';

    return `${v}${x}${suffix}`;
  }, '');
  return `f(x) = ${pattern}`;
}

export function coefficientsToLaTeX(factors: MathType[]): string {
  const pattern = factors.reduce((result, factor, index) => {
    if (equal(factor, 0)) {
      return result;
    }
    const f = isFraction(factor) ? factor : fraction(factor.toString());
    const v = f.toLatex();
    const x = index === 0 ? '' : index === 1 ? 'x' : `x^${index}`;
    const suffix = `${result.length === 0 || result[0] === '-' ? '' : '+'}${result}`;

    return `${v}${x}${suffix}`;
  }, '');
  return `f(x) = ${pattern}`;
}

export function coefficientsToMarkdown(factors: MathType[]): string {
  return `$$ ${coefficientsToLaTeX(factors)} $$`;
}

export function coefficientsToFunction(factors: MathType[]): (value: MathType) => MathType {
  return value => {
    let v = fraction(value.toString());
    let result: MathType = fraction(0);
    for (let i = 0; i < factors.length; i++) {
      result = add(result, multiply(factors[i], pow(v, i)));
    }
    return result;
  }
}