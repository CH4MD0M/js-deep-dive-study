# 1. 함수의 구분

ES6 이전의 모든 함수(메서드 포함)는 **일반 함수로서** 호출할 수 있고 **생성자 함수로서**도 호출할 수 있다.

ES6 이전 모든 함수는 **callable**이면서 **constructor**이다.

ES6 이전의 메서드도 일반 함수로서 호출할 수있고 생성자 함수로서 호출할 수도 있다.

ES6 이전의 모든 함수는 사용목적에 따라 명확한 구분이 없으므로 호출 방식에 특별한 제약이 없고 생성자 함수로 호출되지 않아도 프로토타입 객체를 생성한다.

-   **constructor:** 함수 선언문, 함수 표현식, 클래스
-   **non-constructor:** 메서드(ES6 메서드 축약 표현), 화살표 함수

<br/><br/>

# 2. 메서드

ES6 사양에서 **메서드**는 **메서드 축약표현**으로 정의된 함수만을 의미한다.

```jsx
const obj = {
    x: 1,
    // foo는 메서드다.
    foo() {
        return this.x;
    },
    // bar에 바인딩된 함수는 메서드가 아닌 일반 함수다.
    bar: function () {
        return this.x;
    },
};

console.log(obj.foo()); // 1
console.log(obj.bar()); // 1
```

<br/>

ES6 메서드는 인스턴스를 생성할 수 없는 **non-constructor**다(생성자 함수로서 호출할 수 없다).

```jsx
new obj.foo(); // TypeError: obj.foo is not a constructor
new obj.bar(); // bar {}
```

<br/>

인스턴스를 생성할 수 없으므로 prototype 프로퍼티가 없고 프로토타입도 생성하지 않는다.

```jsx
obj.foo.hasOwnProperty("prototype"); // false
obj.bar.hasOwnProperty("prototype"); // true
```

<br/>

ES6 메서드는 자신을 바인딩한 객체를 가리키는 **내부 슬롯 [[HomeObject]]** 를 갖는다.

-   [[HomeObject]]를 사용하여 수퍼클래스의 메서드를 참조하는 **super키워드**를 사용할 수 있다.
-   ES6 메서드가 아닌 함수는 super 키워드를 사용할 수 없다. 내부 슬롯 [[HomeObject]]를 갖지 않기 때문이다.

```jsx
const base = {
    name: "Roh",
    sayhi() {
        return `Hi! ${this.name}`;
    },
};

const derived = {
    __proto__: base,
    // sayHi는 ES6메서드다. ES6 메서드는 내부슬롯[[HomeObject]]를 갖는다.
    // sayHi의 [[HomeObject]]는 derived.prototype을 가리키고
    // super는 sayHi의 [[HomeObject]]의 프로토타입인 base.prototype을 가리킨다.
    sayHi() {
        return `${super.sayHi()}. how are you doing?`;
    },
};
console.log(derived.sayHi()); // Hi! Roh. how are you doing?
```

<br/>

ES6 메서드는 본연의 기능(super)을 추가하고 의미적으로 맞지 않는 기능(constructor)은 제거했다.

📌 _**메서드를 정의할 때 프로퍼티 값으로 익명 함수 표현식을 할당하는 ES6 이전의 방식은 사용하지 않는 것이 좋다.**_

<br/><br/>

# 3. 화살표 함수

**화살표 함수**는 기존의 함수 정의 방식보다 표현이 간략할 뿐만 아니라 내부 동작도 기존의 함수보다 간략하다.

콜백 함수 내부에서 **this가 전역 객체를 가리키는 문제**를 해결하기 위한 대안으로 유용하다.

## 3.1 화살표 함수 정의

### 함수 정의

화살표 함수는 함수 선언문으로 정의할 수 없고 **함수 표현식**으로 정의해야 한다.

```jsx
const multiply = (x, y) => x * y;
multiply(2, 3); // 6
```

### 매개변수 선언

매개변수가 여러 개인 경우 소괄호 ( )안에 매개변수를 선언한다.

```jsx
const arrow = (x,y) => { ... };
```

매개변수가 한 개인 경우 소괄호 ( )를 생략할 수 있다.

```jsx
const arrow = x => { ... };
```

### 함수 몸체 정의

함수 몸체가 하나의 문으로 구성된다면 함수 몸체를 감싸는 중괄호 {}를 생략할 수 있다.

```jsx
const power = (x) => x ** 2;
power(2); // 4
```

객체리터럴을 반환하는 경우 객체 리터럴을 소괄호 ()로 감싸 주어야 한다.

```jsx
const create = (id, content) => ({ id, content });
create(1, "JavaScript");
```

## 3.2 화살표 함수와 일반 함수의 차이

1️⃣ **화살표 함수는 인스턴스를 생성할 수 없는 non-constructor다.**

-   인스턴스를 생성할 수 없으므로 prorotype 프로퍼티가 없고 프로토타입도 생성하지 않는다.

```jsx
const Foo = () => {};

new Foo(); // TypeError: Foo is not a constructor

Foo.hasOwnProperty("prototype"); // false
```

2️⃣ **중복된 매개변수 이름을 선언할 수 없다.**

-   일반 함수도 strict mode에서는 중복된 이름의 매개변수를 선언할 수 없다.

```jsx
// 일반 함수
function normal(a, a) {
    return a + a;
}
console.log(normal(1, 2)); // 4

// 화살표 함수
const arrow = (a, a) => a + a;
// SyntaxError: Duplicate parameter name not allowed in this context
```

3️⃣ **화살표 함수는 함수 자체의 this, arguments, super, new.target 바인딩을 갖지 않는다.**

-   화살표 함수 내부에서 this, arguments, super, new.target을 참조하면 **스코프 체인을 통해 가장 가까운 상위 함수 중에서 화살표 함수가 아닌 함수**의 this, arguments, super, new.target을 참조한다.

<br/>

## 3.3 this

화살표 함수의 this는 일반 함수의 this와 다르게 동작한다.

-   콜백 함수 내부의 this가 외부 함수의 this와 다르기 때문에 발생하는 문제를 해결하기 위해 의도적으로 설계된 것이다.

<br/>

```jsx
class Prefixer {
    constructor(prefix) {
        this.prefix = prefix;
    }

    add(arr) {
        return arr.map((item) => this.prefix + item);
    }
}

const prefixer = new Prefixer("-webkit-");
console.log(prefixer.add(["transition", "user-select"]));
// ['-webkit-transition', '-webkit-user-select']
```

화살표 함수는 함수 자체의 this 바인딩을 갖지 않는다. 따라서 화살표 함수 내부에서 this를 참조하면 **상위 스코프의 this**를 그대로 참조한다.

-   이를 **lexical this**라 한다.
-   렉시컬 스코프와 같이 화살표 함수의 this가 **함수가 정의된 위치에 의해 결정된다**는 것을 의미한다.

프로퍼티에 할당한 화살표 함수도 스코프 체인 상에서 가장 가까운 상위 함수 중에서 **화살표 함수가 아닌 함수의 this**를 참조한다.

화살표 함수는 함수 자체의 this 바인딩을 갖지 않기 때문에 call, apply, bind메서드를 사용해도 **화살표 함수 내부의 this를 교체할수 없다.**

-   화살표 함수가 call, apply, bind메서드를 호출할 수 없는 것이 아니라 this 바인딩을 갖지 않기 때문에 this를 교체할 수 없고 항상 상위 스코프의 this를 참조한다.

<br/>

### ✏️ 화살표 함수 사용 시 주의사항

**메서드(ES6 메서드가 아닌 일반적인 의미의 메서드)** 를 화살표 함수로 정의하는 것은 피해야 한다.

```jsx
const person = {
    name: "Roh",
    sayHi: () => console.log(`Hi, ${this.name}`),
    // this는 전역객체를 가리킨다.
};

person.sayHi(); // Hi
```

**프로토타입 객체의 프로퍼티**에 화살표 함수를 할당하는 경우도 동일한 문제가 발생한다.

```jsx
function Person(name) {
    this.name = name;
}

Person.prototype.sayHi = () => console.log(`Hi, ${this.name}`);
// this는 전역객체를 가리킨다.

const person = new Person("Roh");
person.sayHi(); // Hi
```

**프로퍼티를 동적 추가할 때**는 ES6 메서드 정의를 사용할 수 없으므로 일반 함수를 할당한다.

```jsx
function Person(name) {
    this.name = name;
}

Person.prototype.sayHi = function () {
    console.log(`Hi ${this.name}`);
};

const person = new Person("Roh");
person.sayHi(); // Hi Roh
```

**ES6 메서드**를 동적 추가하고 싶다면 **객체 리터럴**을 바인딩하고 프로토타입의 **constructor 프로퍼티**와 **생성자 함수** 간의 연결을 재설정한다.

```jsx
function Person(name) {
    this.name = name;
}

Person.prototype = {
    // constructor 프로퍼티와 생성자 함수 간의 연결을 재설정
    constructor: Person,
    sayHi() {
        console.log(`Hi, ${this.name}`);
    },
};

const person = new Person("Roh");
person.sayHi(); // Hi Roh
```

## 3.4 super

화살표 함수는 함수 자체의 super 바인딩을 갖지 않는다. 화살표 함수 내부에서 super를 참조하면 this와 마찬가지로 **상위 스코프의 super**를 참조한다

```jsx
class Base {
    constructor(name) {
        this.name = name;
    }

    sayHi() {
        return `Hi! ${this.name}`;
    }
}

class Derived extends Base {
    sayHi = () => `${super.sayHi()} how are you doing?`;
}

const derived = new Derived("Roh");
console.log(derived.sayHi());
// Hi! Roh how are you doing?
```

## 3.5 arguments

화살표 함수는 함수 자체의 arguments 바인딩을 갖지 않는다. 화살표 함수 내부에서 arguments를 참조하면 this와 마찬가지로 **상위 스코프의 arguments**를 참조한다

```jsx
(function () {
    // 화살표 함수 foo의 arguments는 상위 스코프인 즉시 실행 함수의 arguments를 가리킨다.
    const foo = () => console.log(arguments); // [Arguments] { '0': 1, '1': 2 }
    foo(3, 4);
})(1, 2);

// 화살표 함수 foo의 arguments는 상위 스코프인 전역의 arguments를 가리킨다.
// 전역에는 arguments 객체가 존재하지 않는다. arguments 객체는 함수 내부에서만 유효하다.
const foo = () => console.log(arguments);
foo(1, 2); // ReferenceError: arguments is not defined
```

상위 스코프의 arguments 객체를 참조할 수는 있지만 화살표 함수 자신에게 전달된 인수 목록을 확인할 수 없고 상위 함수에게 전달된 인수 목록을 참조하므로 그다지 도움이 되지 않는다.

📌 _화살표 함수로 가변 인자 함수를 구현해야 할 때는 반드시 **Rest 파라미터**를 사용해야한다._

<br/><br/>

---

<br/>

## 📗 참고

-   자바스크립트 deep dive
