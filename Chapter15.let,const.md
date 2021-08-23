# 1. var 키워드로 선언한 변수의 문제점

ES5까지 변수를 선언할 수 있는 유일한 방법은 **var 키워드**를 사용하는 것이었다.

<br/>

## 1.1 변수 중복 선언 허용

var 키워드로 선언한 변수는 중복 선언이 가능하다.

var 키워드로 선언한 변수를 중복 선언하면 초기화문 유무에 따라 다르게 동작한다.

-   초기화문이 있는 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다.
-   초기화문이 없는 변수 선언문은 무시된다.

<br/>

## 1.2 함수 레벨 스코프

var 키워드로 선언한 변수는 **함수의 코드 블록만**을 **지역 스코프**로 처리한다.

-   함수 레벨 스코프(function-level scope)를 따른다.

함수 외부에서 var 키워드로 선언한 변수는 **코드 블록 내에서 선언해도** 모두 **전역 변수**가 된다.

<br/>

## 1.3 변수 호이스팅

**var 키워드로 선언한 변수**는 변수 호이스팅에 의해 **변수 선언문 이전에 참조할 수 있다.**

단, 할당문 이전에 변수를 참조하면 undefined를 반환한다.

```jsx
console.log(foo); // undefined

foo = 123;
console.log(foo); // 123

var foo;
```

<br/><br/>

# 2. let 키워드

## 2.1 변수 중복 선언 금지

let 키워드로 이름이 같은 변수를 중복 선언하면 SyntaxError가 발생한다.

```jsx
let foo = 123;
let foo = 456; // SyntaxError: Identifier 'foo' has already been declared
```

<br/>

## 2.2 블록 레벨 스코프

let 키워드로 선언한 변수는 모든 코드 블록을 지역 스코프로 인정하는 **블록 레벨 스코프**를 따른다.

```jsx
let foo = 1;

{
    let foo = 2;
    let bar = 3;
}

console.log(foo); // 1
console.log(bar); // ReferenceError: bar is not defined
```

<br/>

## 2.3 변수 호이스팅

<br/>

<p align=center>
<img width="70%" src="https://user-images.githubusercontent.com/54847910/130327144-5dc15ff2-2116-4abe-9a7a-e31a265a3005.png" >
</p>

<br/>

var 키워드로 선언한 변수는 런타임 이전에 자바스크립트 엔진에 의해 **암묵적으로 "선언 단계"와 "초기화 단계
가 한번에 진행된다.**

<br/>

<p align=center>
<img width="70%" src="https://user-images.githubusercontent.com/54847910/130327424-2ed7a8f0-fcd8-49cf-9506-7613d5be8318.png" >
</p>

**let 키워드로 선언한 변수는 "선언 단계"와 "초기화 단계"가 분리되어 진행된다.**

-   **선언 단계**는 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 먼저 실행되지만
-   **초기화 단계**는 변수 선언문에 도달했을 때 실행된다.

스코프의 시작 지점부터 초기화 지점까지 변수를 참조할 수 없는 구간을 **일시적 사각지대**라고 부른다.

<br/><br/>

# 3. const 키워드

## 3.1 선언과 초기화

const 키워드로 선언한 변수는 반드시 선언과 동시에 초기화해야 한다.

const 키워드는 let 키워드와 같이 블록 레벨 스코프를 가지며, 변수호이스팅이 발생하지 않는 것처럼 동작한다.

```jsx
{
    console.log(foo);
    // ReferenceError: Cannot access 'foo' before initialization

    const foo = 1;
    console.log(foo); // 1
}

// 블록 레벨 스코프를 갖는다.
console.log(foo); // ReferenceError: foo is not defined
```

<br/>

## 3.2 재할당 금지

const 키워드로 선언한 변수는 재할당이 금지된다.

```jsx
const foo = 1;
foo = 2; // TypeError: Assignment to constant variable.
```

<br/>

## 3.3 상수

const 키워드로 선언된 변수에 원시 값을 할당한 경우 **원시 값**은 **변경할 수 없는 값(immutable value)**이고
const 키워드에 의해 **재할당이 금지되므로** 할당된 값을 변경할 수 있는 방법은 없다.

<br/>

## 3.4 const 키워드와 객체

const 키워드로 선언된 변수에 **객체를 할당한 경우** 값을 변경할 수 있다.

-   **변경 가능한 값**인 **객체**는 재할당 없이도 직접 변경이 가능하기 때문이다.

```jsx
const person = {
    name: "Roh",
};

person.name = "Kim";

console.log(person.name); // "Kim"
```

<br/><br/>

# 4. var vs. let vs. const

-   ES6를 사용한다면 var 키워드는 사용하지 않는다.
-   재할당이 필요한 경우에 한정해 let 키워드를 사용한다.<br/>
    **이때 변수의 스코프는 최대한 좁게 만든다.**
-   변경이 발생하지 않고 읽기 전용으로 사용하는 원시 값과 객체에는 **const 키워드**를 사용한다.

<br/><br/>

---

<br/>

## 📗 참고

-   자바스크립트 deep dive
