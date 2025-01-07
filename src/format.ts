import { MathType, fraction, equal, add, pow, multiply, isFraction } from 'mathjs';

/**
 * Coefficients to String
 * @param coefficients
 * @returns
 */
export function coefficientsToString(coefficients: MathType[]): string {
  const pattern = coefficients.reduce((result, coefficient, index) => {
    if (equal(coefficient, 0)) {
      return result;
    }
    const f = isFraction(coefficient) ? coefficient : fraction(coefficient.toString());
    const v = equal(f, 1) ? '' : `(${f.toFraction()})`;
    const x = index === 0 ? '' : index === 1 ? 'x' : `x^${index}`;
    const suffix = result ? ` + ${result}` : '';

    return `${v}${x}${suffix}`;
  }, '');
  return `f(x) = ${pattern}`;
}

/**
 * Coefficients to LaTeX
 * @param coefficients
 * @returns
 */
export function coefficientsToLaTeX(coefficients: MathType[]): string {
  const pattern = coefficients.reduce((result, coefficient, index) => {
    if (equal(coefficient, 0)) {
      return result;
    }
    const f = isFraction(coefficient) ? coefficient : fraction(coefficient.toString());
    const v = equal(f, 1) ? '' : f.toLatex();
    const x = index === 0 ? '' : index === 1 ? 'x' : `x^${index}`;
    const suffix = `${result.length === 0 || result[0] === '-' ? '' : '+'}${result}`;

    return `${v}${x}${suffix}`;
  }, '');
  return `f(x) = ${pattern}`;
}

/**
 * Coefficients to Markdown
 * @param coefficients
 * @returns
 */
export function coefficientsToMarkdown(coefficients: MathType[]): string {
  return `$$ ${coefficientsToLaTeX(coefficients)} $$`;
}

/**
 * Coefficients to Function
 * @param coefficients
 * @returns
 */
export function coefficientsToFunction(coefficients: MathType[]): (value: MathType) => MathType {
  return value => {
    let v = fraction(value.toString());
    let result: MathType = fraction(0);
    for (let i = 0; i < coefficients.length; i++) {
      result = add(result, multiply(coefficients[i], pow(v, i)));
    }
    return result;
  }
}