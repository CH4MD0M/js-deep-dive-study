# Math 프로퍼티

### Math.PI

원주율 PI 값을 반환한다.

```jsx
Math.PI; // 3.141592653589793
```

<br><br>

# Math 메서드

### Math.abs

`Math.abs` 메서드는 인수로 전달된 숫자의 절대값을 반환한다. 절대값은 반드시 0 또는 양수이어야 한다.

```jsx
Math.abs(-1); // -> 1
Math.abs("-1"); // -> 1
Math.abs(""); // -> 0
Math.abs([]); // -> 0
Math.abs(null); // -> 0
Math.abs(undefined); // -> NaN
Math.abs({}); // -> NaN
Math.abs("string"); // -> NaN
Math.abs(); // -> NaN
```

<br>

### Math.round

`Math.round`메서드는 인수로 전달된 숫자의 소수점 이하를 **반올림**한 정수를 반환한다.

```jsx
Math.round(1.4); // -> 1
Math.round(1.6); // -> 2
Math.round(-1.4); // -> -1
Math.round(-1.6); // -> -2
Math.round(1); // -> 1
Math.round(); // -> NaN
```

<br>

### Math.ceil

`Math.ceil` 메서드는 인수로 전달된 숫자의 소수점 이하를 **올림**한 정수를 반환한다.

```jsx
Math.ceil(1.4); // -> 2
Math.ceil(1.6); // -> 2
Math.ceil(-1.4); // -> -1
Math.ceil(-1.6); // -> -1
Math.ceil(1); // -> 1
Math.ceil(); // -> NaN
```

<br>

### Math.floor

`Math.floor` 메서드는 인수로 전달된 숫자의 소수점 이하를 **내림**한 정수를 반환한다. `Math.ceil`의 반대 개념이다.

```jsx
Math.floor(1.9); // -> 1
Math.floor(9.1); // -> 9
Math.floor(-1.9); // -> -2
Math.floor(-9.1); // -> -10
Math.floor(1); // -> 1
Math.floor(); // -> NaN
```

<br>

### Math.sqrt

`Math.sqrt` 메서드는 인수로 전달된 숫자의 **제곱근을 반환**한다.

```jsx
Math.sqrt(9); // -> 3
Math.sqrt(-9); // -> NaN
Math.sqrt(2); // -> 1.414213562373095
Math.sqrt(1); // -> 1
Math.sqrt(0); // -> 0
Math.sqrt(); // -> NaN
```

<br>

### Math.random

`Math.random` 메서드는 임의의 난수를 반환한다. 반환한 난수는 0에서 1미만의 실수다.

```jsx
Math.random();

const random = Math.floor(Math.random() * 10 + 1);
console.log(random);
```

<br>

### Math.pow

`Math.pow` 메서드는 첫 번째 인수를 밑(base)으로, 두 번째 인수를 지수(exponent)로 거듭제곱한 결과를 반환한다.

```jsx
Math.pow(2, 8); // -> 256
Math.pow(2, -1); // -> 0.5
Math.pow(2); // -> NaN
```

<br>

ES7에서 도입된 **지수 연산자**를 사용하면 가독성이 더 좋다.

```jsx
// ES7 지수 연산자
2 ** (2 ** 2); // -> 16
Math.pow(Math.pow(2, 2), 2); // -> 16
```

<br>

### Math.max

`Math.max` 메서드는 전달받은 인수 중에서 가장 큰 수를 반환한다. 인수가 전달되지 않으면 `-Infinity`를 반환한다.

```jsx
Math.max(1); // -> 1
Math.max(1, 2); // -> 2
Math.max(1, 2, 3); // -> 3
Math.max(); // -> -Infinity
```

<br>

배열을 인수로 전달받아 배열의 요소 중에서 최대값을 구하려면 `Function.prototype.apply` 메서드 또는 **스프레드 문법**을 사용해야 한다.

```jsx
// 배열 요소 중에서 최대값 취득
Math.max.apply(null, [1, 2, 3]); // -> 3

// ES6 스프레드 문법
Math.max(...[1, 2, 3]); // -> 3
```

<br>

### Math.min

`Math.min` 메서드는 전달받은 인수 중에서 가장 작은 수를 반환한다. 인수가 전달되지 않으면 `Infinity`를 반환한다.

```jsx
Math.min(1); // -> 1
Math.min(1, 2); // -> 1
Math.min(1, 2, 3); // -> 1
Math.min(); // -> Infinity
```

<br>

배열을 인수로 전달받아 배열의 요소 중에서 최소값을 구하려면 `Function.prototype.apply` 메서드 또는 **스프레드 문법**을 사용해야 한다.

```jsx
// 배열 요소 중에서 최소값 취득
Math.min.apply(null, [1, 2, 3]); // -> 1

// ES6 스프레드 문법
Math.min(...[1, 2, 3]); // -> 1
```
