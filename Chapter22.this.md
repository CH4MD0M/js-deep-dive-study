# 1. this 키워드

### ✏️ 객체

객체는 상태를 나타내는 **프로퍼티**와 동작을 나타내는 **메서드**를 하나의 논리적인 단위로 묶은 복합적인 자료구조다.

메서드가 자신이 속한 객체의 프로퍼티를 참조하려면 자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야 한다.

📌 _**객체 리터럴은 변수에 할당되기 직전에 평가된다.**_

-   메서드가 호출되는 시점에는 이미 객체 리터럴의 평가가 완료되어 객체가 생성되었고 식별자에 객체가 할당된 이후다.
-   따라서, 메서드 내부에서 객체 식별자를 참조할 수 있다.

<br/>

**this**는 **자신이 속한 객체** 또는 **자신이 생성할 인스턴스**를 가리키는 **자기 참조 변수**다.

this는 자바스크립트 엔진에 의해 암묵적으로 생성되며, 코드 어디서든 참조할 수 있다. 함수를 호출하면 **arguments 객체**와 **this**가 암묵적으로 함수 내부에 전달된다.

함수 내부에서 arguments 객체를 지역 변수처럼 사용할 수 있는 것처럼 this도 지역 변수처럼 사용할 수 있다.

📌 _**this 바인딩은 함수가 호출되는 방식에 따라 동적으로 결정된다.**_

<br/>

### ✏️ this binding

바인딩이란 식별자와 값을 연결하는 과정을 의미한다.

**this 바인딩**은 this와 this가 가리킬 객체를 바인딩하는 것이다.

<br/>

📌 _**객체 리터럴의 메서드 내부에서의 this는 메서드를 호출한 객체, 즉 circle을 가리킨다.**_

```jsx
// 객체 리터럴
const person = {
    birthYear: 1996,
    calcAge() {
        return 2021 - this.birthYear;
    },
};
console.log(person.calcAge()); // 25
```

📌 _**생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.**_

```jsx
// 생성자 함수
function Person(birthYear) {
    this.birthYear = birthYear;
}

Person.prototype.calcAge = function () {
    return 2021 - this.birthYear;
};

const kim = new Person(1996);
console.log(kim.birthYear()); // 25
```

<br/>

```jsx
// 전역
console.log(this); // window

// 일반 함수
function circle(radius) {
    console.log(this); // window
    return 2 * radius;
}
circle(2);

// 메서드
const person = {
    birthYear: 1996,
    calcAge() {
        return 2021 - this.birthYear;
    },
};
console.log(person.calcAge()); // 25

// 생성자 함수
function Person(birthYear) {
    this.birthYear = birthYear;
    console.log(this); // Person {birthYear: 1996}
}

const me = new Person(1996);
```

-   **전역**에서 this는 **전역 객체 window**를 가리킨다.
-   **일반 함수 내부**에서 this는 **전역 객체 window**를 카리킨다.
-   **메서드 내부**에서 this는 **메서드를 호출한 객체**를 가리킨다.
-   **생성자 함수 내부**에서 this는 생성자 함수가 **생성할 인스턴스**를 가리킨다.

this는 일반적으로 객체의 메서드 내부 또는 생성자 함수 내부에서만 의미가 있다.<br/>
따라서 strict mode가 적용된 일반 함수 내부의 this에는 **undefined**가 바인딩된다.<br/>
일반 함수 내부에서 this를 사용할 필요가 없기 때문이다.

<br/><br/>

# 2. 함수 호출 방식과 this 바인딩

**this 바인딩**은 **함수 호출방식**(**함수가 어떻게 호출되었는지**)에 따라 동적으로 결정된다.

<br/>

### ✏️렉시컬 스코프와 this 바인딩은 결정 시기가 다르다.

렉시컬 스코프(Lexical scope)는 함수 정의가 평가되어 **함수 객체가 생성되는 시점**에 상위 스코프를 결정하고, this 바인딩은 **함수 호출 시점**에 결정된다.

-   스코프는 함수를 어디에 정의했는지에 의해 결정되고,
-   this는 함수를 어떻게 호출하는지에 의해 결정된다.

<br/>

## 2.1 일반 함수 호출

```jsx
var value = 1;

const obj = {
    value: 100,
    foo() {
        console.log(`foo함수의 this = ${this}`); // {value: 100, foo: f}
        console.log(`foo함수의 this.value = ${this.value}`); // 100

        // 메서드 내에서 정의한 중첩 함수
        function bar() {
            console.log(`bar함수의 this = ${this}`); // window
            console.log(`bar함수의 this.value = ${this.value}`); // 1
        }
        bar();
    },
};

obj.foo();
```

**기본적으로 this에는 전역 객체가 바인딩된다.**

어떠한 함수라도 **일반 함수로 호출하면** 함수 내부의 this에는 **전역 객체**가 바인딩된다.

-   this는 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수이므로 객체를 생성하지 않는 **일반 함수에서 this는 의미가 없다.**
-   일반 함수로 호출된 모든 함수(중첩 함수, 콜백 함수 포함) 내부의 this에는 **전역 객체**가 바인딩된다.

<br/>

### ✏️ 명시적으로 this 바인딩하기

```jsx
// that을 사용한 명시적 바인딩
var value = 1;

const thatObj = {
    value: 100,
    foo() {
        const that = this;

        setTimeout(function () {
            console.log(that.value); // 100
        }, 100);
    },
};
thatObj.foo();
```

-   메서드 foo 내부에서의 this는 객체 thatObj를 가리킨다.

```jsx
// 화살표 함수를 사용한 명시적 바인딩
const arrowFuncObj = {
    value: 300,
    foo() {
        setTimeout(() => console.log(this.value), 300);
    },
};
```

-   화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다.

## 2.2 메서드 호출

📌 _메서드 내부의 this는 메서드를 소유한 객체가 아닌 **메서드를 호출한 객체**에 바인딩 된다._

메서드 내부의 this에는 **메서드를 호출한 객체**, 즉 메서드를 호출할 때 메서드 이름 앞의 마침표(.) 연산자 앞에 기술한 객체가 바인딩된다.

```jsx
const person = {
    name: "Roh",
    getName() {
        return this.name;
    },
};

console.log(person.getName()); // Roh
```

<br/>

📌 _**메서드는 객체에 포함된 것이 아니라 독립적으로 존재하는 별도의 객체다.**_

메서드는 프로퍼티에 바인딩된 함수다.

person 객체의 getName 프로퍼티가 가리키는 함수 객체는 person 객체에 포함된 것이 아니라 **독립적으로 존재**하는 별도의 객체다. **getName 프로퍼티가 함수 객체(getName 메서드)를 가리키고 있을 뿐이다.**

따라서 다른 객체의 프로퍼티에 할당하는 것으로 다른 객체의 메서드가 될 수 있고 일반 변수에 할당하여 일반 함수로 호출될 수도 있다.

```jsx
const anotherPerson = {
    name: "Kim",
};

// 다른 객체의 프로퍼티에 할당
anotherPerson.getName = person.getName;
console.log(anotherPerson.getName()); // Kim

// 일반 변수에 할당
const getName = person.getName;
console.log(getName()); // ''
```

<p align="center">
<img width="70%" src="https://user-images.githubusercontent.com/54847910/132521220-bd5ce4a1-5cb0-451d-b112-58cf09623a31.png">
</p>

<br/>

📌 _**프로토타입 메서드 내부에서 사용된 this도 일반 메서드와 마찬가지로 해당 메서드를 호출한 객체에 바인딩된다.**_

```jsx
function Person(name) {
    this.name = name;
}

Person.prototype.getName = function () {
    return this.name;
};

const me = new Person("Roh");
console.log(me.getName()); // Roh

Person.prototype.name = "Kim";
console.log(Person.prototype.getName()); // Kim
```

<p align="center">
<img width="70%" src="https://user-images.githubusercontent.com/54847910/132522400-0d1225f8-fac9-4fdd-ad6c-644c5a909dfe.png">
</p>

<br/>

## 2.3 생성자 함수 호출

📌 _생성자 함수 내부의 this에는 생성자 **함수가 생성할 인스턴스**가 바인딩된다._

```jsx
function Circle(radius) {
    this.radius = radius;
    this.getDiameter = function () {
        return 2 * this.radius;
    };
}

const circle1 = new Circle(5);
const circle2 = new Circle(10);

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```

## 2.4 apply/call/bind 메서드에 의한 간접 호출

**apply, call, bind 메서드**는 **Function.prototype의 메서드**다. 이 메서드들은 모든 함수가 상속받아 사용할 수 있다.

### ✏️ Function.prototype.apply, Function.prototype.call 메서드

**apply, call메서드**는 **this로 사용할 객체**와 **인수리스트**를 인수로 전달받아 함수를 호출한다.

-   두 메서드의 기능은 같지만 **apply 메서드**는 인수를 **배열**로 묶어서 전달하고 **call 메서드**는 인수를 쉼표로 구분한 **리스트 형식**으로 전달한다.

```jsx
// Function.prototype.apply Syntax
func.apply(thisArg, [argsArray])

// Function.prototype.call Syntax
func.call(thisArg[, arg1[, arg2[, ...]]])
```

<br/>

appy와 call 메서드의 본질적인 기능은 **함수를 호출하는 것**이다.

apply와 call 메서드는 함수를 호출하면서 첫 번째 인수로 전달한 특정 객체를 호출한 함수의 this로 바인딩한다.

```jsx
function getThisBinding() {
    console.log(this);
}

const thisArg = { a: 1 };

console.log(getThisBinding()); // window

console.log(getThisBinding.apply(thisArg)); // {a: 1}
console.log(getThisBinding.call(thisArg)); // {a: 1}
```

<br/>

### ✏️ apply, call 메서드로 인수 전달하기

```jsx
function getThisBinding() {
    console.log(arguments);
    console.log(this);
}

// this로 사용할 객체
const thisArg = { a: 1 };

getThisBinding.call(thisArg, 1, 2, 3);
// Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// {a: 1}

getThisBinding.apply(thisArg, [1, 2, 3]);
// Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// {a: 1}
```

<br/>

**apply와 call 메서드**는 arguments 객체와 같은 유사 배열 객체에 배열 메서드를 사용하는 경우에 사용된다.<br/> arguments 객체는 배열이 아니기 때문에 배열 메서드를 사용할 수 없지만 apply, call 메서드를 이용하면 사용 가능하다.

```jsx
function convertArgsToArray() {
    console.log(arguments);

    // Array.prototype.slice를 인수 없이 호출하면 배열의 복사본을 생성한다.
    const arr = Array.prototype.slice.call(arguments);
    // const arr = Array.prototype.slice.apply(arguments);
    console.log(arr);

    return arr;
}

convertArgsToArray(1, 2, 3); // [1, 2, 3]
```

<br/>

### ✏️ Function.prototype.bind 메서드

**bind 메서드**는 apply와 call 메서드와 달리 **함수를 호출하지 않고** this로 사용할 객체만 전달한다.

```jsx
// Function.prototype.bind Syntax
func.bind(thisArg[, arg1[, arg2[, ...]]])
```

```jsx
function getThisBinding() {
    return this;
}

const thisArg = { a: 1 };

console.log(getThisBinding.bind(thisArg)); // getThisBinding
console.log(getThisBinding.bind(thisArg)()); // { a: 1 }
```

<br/>

**bind 메서드**는 메서드의 this와 메서드 내부의 중첩 함수 또는 콜백 함수의 this가 불일치하는 문제를 해결하기 위해 사용된다.

```jsx
const person = {
    name: "Roh",
    foo(callback) {
        // bind 메서드로 callback 함수 내부의 this 바인딩을 전달
        setTimeout(callback.bind(this), 100);
    },
};

person.foo(function () {
    console.log(`Hi! My name is ${this.name}`); // Hi! My name is Roh
});
```

<br/>

---

### 📢 정리

<br/>

| 함수 호출 방식                                            | this 바인딩                                                           |
| :-------------------------------------------------------- | :-------------------------------------------------------------------- |
| 일반 함수 호출                                            | 전역 객체                                                             |
| 메서드 호출                                               | 메서드를 호출한 객체                                                  |
| 생성자 함수 호출                                          | 생성자 함수가 생성할 인스턴스                                         |
| Function.prototype.apply/call/bind 메서드에 의한간접 호출 | Function.prototype.apply/call/bind 메서드에 첫번째 인수로 전달한 객체 |

<br/><br/>

---

<br/>

## 📗 참고

-   자바스크립트 deep dive
