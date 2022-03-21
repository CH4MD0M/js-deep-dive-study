# var 키워드로 선언한 변수의 문제점

ES5까지 변수를 선언할 수 있는 유일한 방법은 var 키워드를 사용하는 것이었다.

### 변수 중복 선언 허용

var 키워드로 선언한 변수는 중복 선언이 가능하다.

```jsx
var x = 1;
var y = 1;

var x = 100;
var y;

console.log(x); // 100
console.log(y); // 1
```

<br>

### 함수 레벨 스코프

**`var`** 키워드로 선언한 변수는 **함수 레벨 스코프(Function-Level Scope)** 를 따른다. 함수 외부에서 var 키워드로 선언한 변수는 코드 블록 내에서 선언해도 모두 전역 변수가 된다.

```jsx
var i = 10;

for (var i = 0; i < 5; i++) {
    console.log(i); // 0 1 2 3 4
}

console.log(i); // 5
```

<br>

### 변수 호이스팅

var 키워드로 선언한 변수는 변수 호이스팅에 의해 변수 선언문 이전에 참조할 수 있다.<br>
단, 할당문 이전에 변수를 참조하면 undefined를 반환한다.

```jsx
console.log(foo); // undefined

foo = 123;

console.log(foo); // 123

var foo;
```

<br><br>

# let 키워드

var 키워드의 단점을 보완하기 위해 ES6에서는 **`let`** 과 **`const`** 를 도입했다.

### 변수 중복 선언 금지

let 키워드로 이름이 같은 변수를 중복 선언하면 **`SyntaxError`** 가 발생한다.

```jsx
let foo = 123;
let foo = 456; // SyntaxError: Identifier 'foo' has already been declared
```

<br>

### 블록 레벨 스코프

let 키워드로 선언한 변수는 모든 코드 블록을 지역 스코프로 인정하는 **블록 레벨 스코프(Block-Level Scope)** 를 따른다.

```jsx
let foo = 1; // 전역 변수

{
    let foo = 2; // 지역 변수
    let bar = 3; // 지역 변수
}

console.log(foo); // 1
console.log(bar); // ReferenceError: bar is not defined
```

<br>

### 변수 호이스팅

var 키워드로 선언한 변수는 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 **`선언 단계`** 와 **`초기화 단계`** 가 한번에 진행된다.

<div align="center"><img width="300" src=""/></div>

let 키워드로 선언한 변수는 **`선언 단계`** 와 **`초기화 단계`** 가 분리되어 진행된다.

**선언 단계**는 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 먼저 실행되지만, **초기화 단계**는 변수 선언문에 도달했을 때 실행된다.

스코프의 시작 지점부터 초기화 지점까지 변수를 참조할 수 없는 구간을 **일시적 사각지대(Temporal Dead Zone, TDZ)** 라고 부른다.

```jsx
console.log(foo); // ReferenceError: foo is not defined

var foo;
console.log(foo); // undefined

foo = 1;
console.log(foo); // 1
```

<div align="center"><img width="300" src=""/></div>

<br>

### 전역 객체와 let

var 키워드로 선언한 **`전역 변수`** 와 **`전역 함수`**, 그리고 **선언하지 않은 변수에 값을 할당한** **`암묵적 전역`** 은 전역 객체 **`window`** 의 프로퍼티가 된다.

**_let 키워드로 선언한 변수는 전역 객체의 프로퍼티가 아니다._** (window.foo와 같이 접근할 수 없다.)

<br><br>

# const 키워드

**const** 키워드는 **상수(constant)** 를 선언하기 위해 사용한다.

### 선언과 초기화

const 키워드로 선언한 변수는 반드시 선언과 동시에 초기화해야 한다.

const 키워드는 let 키워드와 같이 **`블록 레벨 스코프`** 를 가지며, 변수호이스팅이 발생하지 않는 것처럼 동작한다.

```jsx
{
    // 변수 호이스팅이 발생하지 않는 것처러 동작한다.
    console.log(foo);
    // ReferenceError: Cannot access 'foo' before initialization

    const foo = 1;
    console.log(foo); // 1
}

// 블록 레벨 스코프를 갖는다.
console.log(foo); // ReferenceError: foo is not defined
```

<br>

### 재할당 금지

const 키워드로 선언한 변수는 재할당이 금지된다.

```jsx
const foo = 1;
foo = 2; // TypeError: Assignment to constant variable.
```

<br>

### 상수

const 키워드로 선언된 변수에 **`원시 값`** 을 할당한 경우 원시 값은 **변경할 수 없는 값(immutable value)** 이고, const 키워드에 의해 재할당이 금지되므로 할당된 값을 변경할 수 있는 방법은 없다.

<br>

### const 키워드와 객체

const 키워드로 선언된 변수에 **`객체`** 를 할당한 경우 값을 변경할 수 있다. **변경 가능한 값(mutable value)** 인 객체는 재할당 없이도 직접 변경이 가능하기 때문이다.

const 키워드는 재할당을 금지할 뿐 **`불변`** 을 의미하지 않는다.

```jsx
const person = {
    name: "Roh",
};

person.name = "Kim";

console.log(person.name); // "Kim"
```

<br><br>

# var vs. let vs. const

-   ES6를 사용한다면 var 키워드는 사용하지 않는다.
-   재할당이 필요한 경우에 한정해 let 키워드를 사용한다. 이때 변수의 스코프는 최대한 좁게 만든다.
-   변경이 발생하지 않고 읽기 전용으로 사용하는 원시 값과 객체에는 const 키워드를 사용한다.
