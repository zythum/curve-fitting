import { fraction } from 'mathjs';
import {
  curveFitting,
  CurveFittingData,
  coefficientsToString,
  coefficientsToFunction,
  coefficientsToLaTeX
} from '../src';

// const x = [1, 2, 3, 4];
// const y = [2, 4, 6, 8];

const y = [1, 4, 9, 16];
const x = y.map((_, index) => index + 1);

const data: CurveFittingData = {
  x: x.map(num => fraction(num)),
  y: y.map(num => fraction(num)),
  degree: x.length,
}

const coefficients = curveFitting(data);

console.log(coefficientsToLaTeX(coefficients));
console.log(coefficientsToString(coefficients));

const fn = coefficientsToFunction(coefficients);
x.forEach(x => {
  const y = fn(x);
  console.log(`f(${x}) = ${fraction(y.toString()).toFraction()}`);
});