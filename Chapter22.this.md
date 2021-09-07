# 1. this 키워드

### ✏️ 객체

객체는 상태를 나타내는 **프로퍼티**와 \***\*동작을 나타내는 **메서드\*\*를 하나의 논리적인 단위로 묶은 복합적인 자료구조다.

메서드가 자신이 속한 객체의 프로퍼티를 참조하려면 자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야 한다.

📌 _객체 리터럴은 변수에 할당되기 직전에 평가된다._

-   메서드가 호출되는 시점에는 이미 객체 리터럴의 평가가 완료되어 객체가 생성되었고 식별자에 객체가 할당된 이후다.
-   따라서, 메서드 내부에서 객체 식별자를 참조할 수 있다.

<br/>

**this**는 **자신이 속한 객체** 또는 **자신이 생성할 인스턴스**를 가리키는 **자기 참조 변수**다.

this는 자바스크립트 엔진에 의해 암묵적으로 생성되며, 코드 어디서든 참조할 수 있다. 함수를 호출하면 **arguments 객체**와 **this**가 암묵적으로 함수 내부에 전달된다.

함수 내부에서 arguments 객체를 지역 변수처럼 사용할 수 있는 것처럼 this도 지역 변수처럼 사용할 수 있다.

📌 **_this 바인딩은 함수가 호출되는 방식에 따라 동적으로 결정된다._**

<br/>

### ✏️ this binding

바인딩이란 식별자와 값을 연결하는 과정을 의미한다.

**this 바인딩**은 this와 this가 가리킬 객체를 바인딩하는 것이다.

<br/>

📌 _객체 리터럴의 메서드 내부에서의 this는 메서드를 호출한 객체, 즉 circle을 가리킨다._

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

📌 _생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다._

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
