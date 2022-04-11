# this 키워드

**`this`** 는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수다. this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.

this는 자바스크립트 엔진에 의해 암묵적으로 생성되며, 코드 어디서든 참조할 수 있다. 함수를 호출하면 arguments 객체와 this가 암묵적으로 함수 내부에 전달된다.

arguments 객체와 같이 this도 지역변수처럼 사용할 수 있다. **_this 바인딩은 함수가 호출되는 방식에 따라 동적으로 결정된다._**

<br>

> ✍🏻 **this 바인딩**
>
> 바인딩이란 식별자와 값을 연결하는 과정을 의미한다. this 바인딩은 this와 this가 가리킬 객체를 바인딩하는 것이다.

<br>

### 객체 리터럴과 this 예제

```jsx
// 객체 리터럴
const circle = {
    radius: 5,
    getDiameter() {
        // this는 메서드를 호출한 객체를 가리킨다.
        return 2 * this.radius;
    },
};
console.log(circle.getDiameter()); // 10
```

<br>

### 생성자 함수와 this 예제

```jsx
// 생성자 함수
function Circle(radius) {
    this.radius = radius;
}

Circle.prototype.getDiameter = function () {
    // this는 생성자 함수가 생성할 인스턴스를 가리킨다.
    return 2 * this.radius;
};

const circle = new Circle(5);
console.log(circle.getDiameter()); // 10
```

<br>

**_자바스크립트의 this는 함수가 호출되는 방식에 따라 this 바인딩이 동적으로 결정된다._**

```jsx
// 전역
console.log(this); // window

// 일반 함수
function square(number) {
    console.log(this); // window
    return number * number;
}
square(2);

// 메서드
const person = {
    name: "Roh",
    getName() {
        console.log(this); // {name: 'Roh', getName: f}
        return this.name;
    },
};
console.log(person.getName()); // Roh

// 생성자 함수
function Person(name) {
    this.name = name;
    console.log(this); // Person {name: 'Roh'}
}

const me = new Person("Roh");
```

<br>

this는 일반적으로 객체의 메서드 내부 또는 생성자 함수 내부에서만 의미가 있다. 따라서 **`strict mode`**가 적용된 일반 함수 내부의 this에는 undefined가 바인딩된다. 일반 함수 내부에서 this를 사용할 필요가 없기 때문이다.

<br><br>

# 함수 호출 방식과 this 바인딩

**_this 바인딩은 함수 호출방식(함수가 어떻게 호출되었는지)에 따라 동적으로 결정된다._**

<br>

> ✍🏻 **렉시컬 스코프와 this 바인딩은 결정 시기가 다르다.**
>
> 렉시컬 스코프(Lexical scope)는 함수 정의가 평가되어 **함수 객체가 생성되는 시점**에 상위 스코프를 결정하고, this 바인딩은 **함수 호출 시점**에 결정된다.
>
> -   **렉시컬 스코프**는 함수를 어디에 정의했는지에 의해 결정된다.
> -   **this 바인딩**은 함수를 어떻게 호출하는지에 의해 결정된다.

<br>

### 일반 함수 호출

**기본적으로 this에는 전역 객체가 바인딩된다.**

```jsx
var value = 1;

const obj = {
    value: 100,
    foo() {
        console.log("foo의 this: ", this); // window

        setTimeout(function () {
            console.log("callback 함수의 this: ", this); // window
            console.log("callback 함수의 this.value: ", this.value); // 1
        }, 100);
    },
};
```

**_일반 함수로 호출된 모든 함수(중첩 함수, 콜백 함수 포함) 내부의 this에는 전역 객체가 바인딩된다._**<br>하지만, this는 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수이므로 객체를 생성하지 않는 일반 함수에서 this는 의미가 없다.

<br>

### ☑️ that을 사용한 명시적 바인딩

```jsx
var value = 1;

const obj = {
    value: 100,
    foo() {
        // this 바인딩을 변수 that에 할당한다.
        const that = this;

        // 콜백 함수 내부에서 this 대신 that을 참조한다.
        setTimeout(function () {
            console.log(that.value); // 100
        }, 100);
    },
};

obj.foo();
```

### ☑️ apply/call/bind 메서드를 사용한 명시적 바인딩

```jsx
var value = 1;

const obj = {
    value: 100,
    foo() {
        // 콜백 함수에 명시적으로 this를 바인딩한다.
        setTimeout(
            function () {
                console.log(this.value); // 100
            }.bind(this),
            100
        );
    },
};
obj.foo();
```

### ☑️ 화살표 함수를 사용한 명시적 바인딩

```jsx
var value = 1;

const obj = {
    value: 100,
    // 화살표 함수 내부의 this는 상위 스코프의 this를 가리킨다.
    foo() {
        setTimeout(() => console.log(this.value), 100); // 100
    },
};

obj.foo();
```

<br>

### 메서드 호출

메서드 내부의 this에는 메서드를 호출한 객체(메서드를 호출할 때 메서드 이름 앞의 마침표(.) 연산자 앞에 기술한 객체)가 바인딩된다. 즉, **_메서드 내부의 this는 메서드를 소유한 객체가 아닌 메서드를 호출한 객체에 바인딩 된다._**

<br>

```jsx
const person = {
    name: "Roh",
    getName() {
        return this.name;
    },
};

console.log(person.getName()); // Roh
```

person 객체의 getName 프로퍼티가 가리키는 함수 객체는 person 객체에 포함된 것이 아니라 독립적으로 존재하는 별도의 객체다. getName 프로퍼티가 함수 객체(getName 메서드)를 가리키고 있을 뿐이다. 따라서 다른 객체의 프로퍼티에 할당하는 것으로 다른 객체의 메서드가 될 수 있고 일반 변수에 할당하여 일반 함수로 호출될 수도 있다.

```jsx
const anotherPerson = {
    name: "Kim",
};

//getName 메서드를 anotherPerson 객체의 메서드로 할당
anotherPerson.getName = person.getName;
console.log(anotherPerson.getName()); // Kim

// getName 메서드를 변수에 할당
const getName = person.getName;
console.log(getName()); // ''
```

<div align="center">
<img width="500" src="https://user-images.githubusercontent.com/54847910/162662909-d988c789-c41d-4389-82f7-8619f37a34c4.png">
</div>

<br>

프로토타입 메서드 내부에서 사용된 this도 일반 메서드와 마찬가지로 **해당 메서드를 호출한 객체**에 바인딩된다.

```jsx
function Person(name) {
    this.name = name;
}

Person.prototype.getName = function () {
    return this.name;
};

const me = new Person("Roh");

// getName 메서드를 호출한 객체는 me다.
console.log(me.getName()); // Roh

Person.prototype.name = "Kim";

// getName 메서드를 호출한 객체는 Person.prototype이다.
console.log(Person.prototype.getName()); // Kim
```

<div align="center">
<img width="500" src="https://user-images.githubusercontent.com/54847910/162662915-a34fdd27-aa48-4d40-b2fa-39b08cd8f2e2.png">
</div>

<br>

### 생성자 함수 호출

생성자 함수 내부의 this에는 생성자 함수가 생성할 인스턴스가 바인딩된다.

```jsx
function Circle(radius) {
    // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
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

<br>

### Function.prototype.apply / call 메서드

**`apply`**, **`call`**, **`bind`** 메서드는 **Function.prototype**의 메서드다. 따라서, 이 메서드들은 모든 함수가 상속받아 사용할 수 있다.

<br>

**`Function.prototype.apply`**, **`Function.prototype.call`** 메서드는 **this로 사용할 객체**와 **인수리스트**를 인수로 전달받아 함수를 호출한다.

두 메서드의 기능은 같지만 apply 메서드는 인수를 배열로 묶어서 전달하고 call 메서드는 인수를 쉼표로 구분한 리스트 형식으로 전달한다.

```jsx
/*
* this 바인딩과 인수 리스트 배열을 사용하여 함수를 호출한다.
* @param thisArg -> this로 사용할 객체
* @param argsArray -> 함수에게 전달할 인수 리스트 배열(또는 유사배열객체)
*/
func.apply(thisArg[, argsArray])

/*
* this 바인딩과 ,로 구분된 인수 리스트를 사용하여 함수를 호출한다.
* @parma thisArg -> this로 사용할 객체
* @param arg1, arg2, ... -> 함수에게 전달할 인수 리스트
*/
func.call(thisArg[, arg1[, arg2[, ...]]])
```

<br>

**_appy와 call 메서드의 본질적인 기능은 함수를 호출하는 것이다._** apply와 call 메서드는 함수를 호출하면서 첫 번째 인수로 전달한 특정 객체를 호출한 함수의 this로 바인딩한다.

apply와 call 메서드는 호출할 함수에 인수를 전달하는 방식만 다를뿐 동일하게 동작한다.

-   **apply 메서드**는 호출할 함수의 인수를 **배열로 전달**한다.
-   **call 메서드**는 호출할 함수의 인수를 **쉼표로 구분한 리스트 형식으로 전달**한다.

```jsx
function getThisBinding() {
    console.log(arguments);
    console.log(this);
}

// this로 사용할 객체
const thisArg = { a: 1 };

getThisBinding.apply(thisArg, [1, 2, 3]);
// Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// {a: 1}

getThisBinding.call(thisArg, 1, 2, 3);
// Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// {a: 1}
```

<br>

apply와 call 메서드는 arguments 객체와 같은 유사 배열 객체에 배열 메서드를 사용하는 경우에 사용된다.<br>
arguments 객체는 배열이 아니기 때문에 배열 메서드를 사용할 수 없지만 apply, call 메서드를 이용하면 사용 가능하다.

```jsx
function convertArgsToArray() {
    console.log(arguments);

    // Array.prototype.slice를 인수 없이 호출하면 배열의 복사본을 생성한다.
    const arr = Array.prototype.slice.call(arguments);
    // const arr = Array.prototype.slice.apply(arguments);
    console.log(arr);

    return arr;
}

convertArgsToArray(1, 2, 3);
// [Arguments] { '0': 1, '1': 2, '2': 3 }
// [1, 2, 3]
```

<br>

### Function.prototype.bind 메서드

**`bind`** 메서드는 apply와 call 메서드와 달리 **함수를 호출하지 않고 this로 사용할 객체만 전달**한다.

```jsx
function getThisBinding() {
    return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

console.log(getThisBinding.bind(thisArg)); // getThisBinding
// bind 메서드는 함수를 호출하지 않으므로 명시적으로 호출해야 한다.
console.log(getThisBinding.bind(thisArg)()); // { a: 1 }
```

<br>

bind 메서드는 메서드의 this와 메서드 내부의 중첩 함수 또는 콜백 함수의 this가 불일치하는 문제를 해결하기 위해 유용하게 사용된다.

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

<br><br>

# 정리

| 함수 호출 방식                                             | this 바인딩                                                            |
| ---------------------------------------------------------- | ---------------------------------------------------------------------- |
| 일반 함수 호출                                             | 전역 객체                                                              |
| 메서드 호출                                                | 메서드를 호출한 객체                                                   |
| 생성자 함수 호출                                           | 생성자 함수가 생성할 인스턴스                                          |
| Function.prototype.apply/call/bind 메서드에 의한 간접 호출 | Function.prototype.apply/call/bind 메서드에 첫 번째 인수로 전달한 객체 |
