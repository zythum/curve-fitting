# curve-fitting
> Get curve fitting from discrete data with least squares method and Cramer's Rule.

```ts
import { fraction } from 'mathjs';
import {
  curveFitting,
  CurveFittingData,
  coefficientsToString,
  coefficientsToFunction,
  coefficientsToLaTeX
} from '@zythum02/curve-fitting';

// const x = [1, 2, 3, 4];
// const y = [2, 4, 6, 8];

const y = [1, -4, 9, -16];
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
```

output:
```
f(x) = -\frac{28}{3}x^3+65x^2-\frac{404}{3}x+80
f(x) = (-28/3)x^3 + (65)x^2 + (-404/3)x + (80)
f(1) = 1
f(2) = -4
f(3) = 9
f(4) = -16
```