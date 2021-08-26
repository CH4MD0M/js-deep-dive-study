# 1. 일급 객체

### ✏️ 일급 객체의 조건

1. 무명의 리터럴로 생성할 수 있다.(런타임에 생성이 가능하다.)
2. 변수나 자료구조(객체, 배열 등)에 저장할 수 있다.
3. 함수의 매개변수에 전달할 수 있다.
4. 함수의 반환값으로 사용할 수 있다.

_📌 자바스크립트의 함수는 위의 조건을 만족하므로 **일급 객체**다._

<br/>

함수가 일급 객체라는 것은 함수를 객체와 동일하게 사용할 수 있다는 의미다.<br/>
객체는 값이므로 함수는 값과 동일하게 취급할 수 있다.

_📌 함수는 값을 사용할 수 있는 곳이라면 어디서든지 리터럴로 정의할 수 있으며 런타임에 함수 객체로 평가된다._

<br/><br/>

# 2. 함수 객체의 프로퍼티

```jsx
function add(number) {
    return number + number;
}

console.log(Object.getOwnPropertyDescriptors(add));
// {length: {…}, name: {…}, arguments: {…}, caller: {…}, prototype: {…}}

// __proto__는 add 함수의 프로퍼티가 아니다.
console.log(Object.getOwnPropertyDescriptor(add, "__proto__")); // undefined

// __proto__는 Object.prototype 객체의 접근자 프로퍼티다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, "__proto__"));
// {enumerable: false, configurable: true, get: ƒ, set: ƒ}
```

arguments, caller,length, name, prototype 프로퍼티는 모두 함수 객체의 **데이터 프로퍼티**다. (일반 객체에는 없는 함수 객체 고유의 프로퍼티다.)

**\_\_proto\_\_ 프로퍼티**는 함수 객체 고유의 프로퍼티가 아닌 **Object.prototype 객체**의 프로퍼티를 **상속받은** 것이다.

_📌 Object.prototype 객체의 프로퍼티는 모든 객체가 상속받아 사용할 수 있다._<br/>
Object.prototype 객체의 \_\_proto\_\_접근자 프로퍼티는 모든 객체가 사용할 수 있다.

<br/>

### 2.1 arguments 프로퍼티

함수 객테의 arguments 프로퍼티 값은 arguments 객체다.

### ✏️ arguments 객체

-   **arguments 객체**는 함수 호출 시 전달된 **인수(argument)** 들의 정보를 담고 있는 순회 가능한(iterable) **유사 배열 객체**이며, 함수 내부에서 지역변수처럼 사용된다.(함수 외부에서 참조할 수 없다.)

<br/>

### 2.2 caller 프로퍼티

-   **비표준 프로퍼티**

### 2.3 length 프로퍼티

-   함수를 정의할 때 선언한 **매개변수의 개수**를 가리킨다.

### 2.4 name 프로퍼티

-   함수의 이름을 나타낸다.

ES5와 ES6에서 동작을 달리한다.
익명 함수 표현식의 경우 ES5에서 name 프로퍼티 값은 **빈 문자열**이지만, ES6에서는 **함수 객체를 가리키는 식별자**를 값으로 갖는다.

<br/>

### 2.5 \_\_proto\_\_ 접근자 프로퍼티

모든 객체는 [[Prototype]]이라는 내부 슬롯을 갖는다.
[[Prototype]] 내부 슬롯은 객체지향 프로그래밍의 상속을 구현하는 프로토타입 객체를 가리킨다.

<br/>

**\_\_proto\_\_프로퍼티**는 [[Prototype]] 내부 슬롯이 가리키는 프로토타입 객체에 접근하기 위해 사용하는 **접근자 프로퍼티**다.

[[Prototype]] 내부 슬롯에는 직접 접근할 수 없으며 **proto** 접근자 프로퍼티를 통해 **간접적으로** 프로토타입 객체에 접근할 수 있다.

<br/>

### 2.6 prototype 프로퍼티

생성자 함수로 호출할 수 있는 함수(**constructor**)만이 소유하는 프로퍼티다.
**non-constructor**는 **prototype 프로퍼티**가 없다.

<br/><br/>

---

<br/>

## 📗 참고

-   자바스크립트 deep dive
