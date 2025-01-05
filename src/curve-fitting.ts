import { MathType, fraction, pow, add, multiply, matrix, det, divide } from 'mathjs';

function multiplyArray(a: MathType[], b: MathType[]): MathType {
  let result: MathType = fraction(0);
  for (let i = 0; i < a.length; i++) {
    result = add(result, multiply(a[i], b[i]));
  }
  return result;
}

export interface CurveFittingData {
  /** x values */
  x: MathType[];
  /** y values */
  y: MathType[];
  /** degree of a polynomial */
  degree: number;
}

/**
 * get curve fitting from discrete data with least squares method and Cramer's Rule.
 * @param data
 * @returns coefficients
 */
export function curveFitting(data: CurveFittingData) {

  const { x, y, degree } = data;

  if (x.length !== y.length) {
    throw new Error('different x, y length');
  }

  if (degree < 0) {
    throw new Error('invalid degree');
  }

  const fiArray: MathType[][] = [];
  for (let i = 0; i < degree; i++) {
    fiArray.push(x.map(num => pow(num, i)));
  }
  const m = matrix('dense');
  for (let i = 0; i < degree; i++) {
    for (let j = 0; j < degree; j++) {
      m.set([i, j], multiplyArray(fiArray[i], fiArray[j]));
    }
  }

  const v: MathType[] = [];
  for (let i = 0; i < degree; i++) {
    v[i] = multiplyArray(y, fiArray[i]);
  }

  const d = det(m);
  const dArray: MathType[] = [];

  for (let i = 0; i < degree; i++) {
    const dm = m.clone();
    for (let j = 0; j < degree; j++) {
      dm.set([i, j], v[j]);
    }
    dArray[i] = det(dm);
  }

  const coefficients =  dArray.map(dn => divide(dn, d));
  return coefficients;
}