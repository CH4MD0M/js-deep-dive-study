# 24.1 렉시컬 스코프

자바스크립트 엔진은 함수를 어디서 호출했는지가 아니라 **함수를 어디에 정의했는지에 따라** 상위 스코프를 결정한다.

스코프의 실체는 실행 컨텍스트의 렉시컬 환경이다. 렉시컬 환경의 OuterLexicalEnvironmentReference를 통해 상위 렉시컬 환경과 연결되다. 이것이 **스코프 체인**이다.

"함수의 상위 스코프를 결정한다"는 것은 "렉시컬 환경(Lexical Environment)의 외부 렉시컬 환경에 대한 참조(Outer Lexical Environment Reference)에 저장할 참조값을 결정한다."는 것과 같다.

**외부 렉시컬 환경에 대한 참조**에 저장할 참조값(상위 스코프에 대한 참조)은 **함수가 정의된 위치**에 의해 결정된다.

<br/><br/>

# 2. 함수 객체의 내부 슬롯 [[Envieonment]]

함수는 자신의 **내부 슬롯 [[Envieonment]]** 에 자신의 **정의 된 환경(상위 스코프의 참조)** 을 저장한다.

함수 객체의 내부 슬롯 **[[Envieonment]]에 저장된 현재 실행 중인 실행 컨텍스트의 렉시컬 환경의 참조가 바로 상위 스코프다.**

```jsx
const x = 1;

function foo() {
    const x = 10;

    // 함수의 호출 위치와 상위 스코프는 아무런 관계가 없다.
    bar();
}

function bar() {
    console.log(x);
}

foo(); // 1
bar(); // 1
```

<br/><br/>

# 3. 클로저와 렉시컬 환경

### ✏️ 클로저(Closure)

외부 함수보다 중첩 함수가 더 오래 유지되는 경우 중첩 함수는 이미 생명 주기가 종료한 외부 함수의 변수를 참조할 수 있다. 이 중첩 함수를 **클로저**라 한다.

```jsx
const x = 1;

// ①
function outer() {
    const x = 10;
    const inner = function () {
        console.log(x);
    }; // ②
    return inner;
}

const innerFunc = outer(); // ③
innerFunc(); // ④ 10
```

## 3.1 전역 함수 객체의 상위 스코프 결정

outer 함수가 평가되어 함수 객체를 생성할때 형재 실행 중인 실랭 컨텍스트의 렉시컬 환경, 즉 전역 렉시컬 환경을 outer 함수 객체의 [[Environment]] 내부 슬롯에 상위 스코프로서 저장한다.

<p align="center">
<img width="100%" src="https://user-images.githubusercontent.com/54847910/133428275-abb85c0e-e6b9-41ea-99f6-c9a77a74bac0.png">
</p>

## 3.2 중첩 함수의 상위 스코프 결정

outer 함수를 호출하면 outer 함수 렉시컬 환경이 생성되고 외부 렉시컬 환경에 대한 참조(Outer LexicalEnvironment Reference)에 outer 함수 객체의 [[Environment]] 내부 슬롯에 저장된 전역 렉시컬 환경을 할당한다.

그리고 중첩 함수 inner가 평가된다.

중첩 함수 inner는 자신의 [[Environment]] 내부 슬롯에 현재 실행 중인 실행 컨텍스트의 렉시컬 환경, 즉 outer 함수의 렉시컬 환경을 상위 스코프로서 저장한다.

<p align="center">
<img width="100%" src="https://user-images.githubusercontent.com/54847910/133428329-5f4148f3-1b35-4778-ba1e-2dd4009ceb7c.png">
</p>

## 3.3 전역 함수 객체 종료

outer 함수의 실행이 종료되면 inner 함수를 반환하면서 outer 함수의 생명 주기가 종료된다.

outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택(execution context stack)에서 제거되지만 , outer 함수의 렉시컬 환경(Lexical Environment)까지 소멸하는 것은 아니다.

-   outer 함수의 렉시컬 환경은 inner 함수의 [[Environment]] 내부 슬롯에 의해 참조되고 있고 inner 함수는 전역 변수 innerFunc에 의해 참조되고 있으므로 가비지 컬렉션의 대상이 되지 않기 때문이다.

📌 _**가비지 컬렉터(GC; Garbage Collector)** 는 누군가가 참조하고 있는 메모리 공간을 함부로 해제하지 않는다._

<p align="center">
<img width="100%" src="https://user-images.githubusercontent.com/54847910/133428382-aab9d92e-7287-4138-8e59-cf2ef6855051.png">
</p>

## 3.4 중첩 함수 호출

outer 함수가 반환한 inner 함수를 호출하면 inner 함수의 실행 컨텍스트가 생성되고 실행 컨텍스트 스택에 푸시된다.

그리고 inner 함수 렉시컬 환경의 외부 렉시컬 환경에 대한 참조(OuterLexicalEnvironment Reference)에 inner 함수 객체의 [[Environment]] 내부 슬롯에 저장된 전역 렉시컬 환경을 할당한다.

중첩 함수 inner가 외부 함수 outer보다 더 오래 생존했다.

외부 함수보다 더 오래 생존한 중첩 함수는 **외부 함수의 생존 여부와 상관없이** **자신의 상위 스코프를 기억한다.** <br/> 이처럼 중첩 함수 inner의 내부에서는 상위 스코프를 참조할 수 있으므로 상위 스코프의 **식별자를 참조**할 수 있고 **식별자의 값을 변경**할 수도 있다.

<p align="center">
<img width="100%" src="https://user-images.githubusercontent.com/54847910/133428449-a017712d-22de-415f-95c9-49118f04538a.png">
</p>

<br/>

### ✏️ 클로저가 발생하지 않는 경우

-   상위 스코프의 어떤 식별자도 참조하지 않는 경우 대부분의 모던 브라우저는 최적화를 통해 상위 스코프를 기억하지 않는다.
-   클로저 이기는 하지만 외부 함수의 외부로 중첩 함수가 반환되지 않는 경우, 중첩 함수가 외부 함수보다 생명주기가 짧기 때문에 생명 주기가 종료된 외부 함수의 식별자를 참조할 수 있다는 클로저의 본질에 부합하지 않는다.

<br/>

클로저는 중첩 함수가 상위 스코프의 식별자를 참조하고 있고 중첩 함수가 외부 함수보다 더 오래 유지되는 경우에 한정하는 것이 일반적이다.

대부분의 모던 브러우저는 최적화를 통해 상위 스코프의 식별자 중에서 **클로저가 참조하고 있는 식별자만**을 기억한다.

클로저에 의해 참조되는 상위 스코프의 변수를 **자유 변수(free variable)** 이라고 한다.

<br/><br/>

# 4. 클로저의 활용

📌 _**클로저는 상태를 안전하게 변경하고 유지하기 위해 사용한다.**_

상태가 의도치 않게 변경되지 않도록 상태를 안전하게 **은닉(information hiding)** 하고 특정 함수에게만 상태 변경을 허용하기 위해 사용한다.

<br/>

```jsx
const counter = (function () {
    let num = 0;

    return {
        increase() {
            return ++num;
        },
        decrease() {
            return num > 0 ? --num : 0;
        },
    };
})();

console.log(counter.increase()); // 1
console.log(counter.increase()); // 2
console.log(counter.decrease()); // 1
console.log(counter.decrease()); // 0
```

-   increase, decrease 메서드의 상위 스코프는 즉시 실행 함수 실행 컨텍스트의 렉시컬 환경이다.
-   increase, decrease 메서드가 어디서 호출되든 상관없이 increase, decrease 함수는 즉시 실행 함수의 스코프의 식별자를 참조할 수 있다.

<br/>

```jsx
// 생성자 함수
const Counter = (function () {
    let num = 0;

    function Counter() {}

    Counter.prototype.increase = function () {
        return ++num;
    };
    Counter.prototype.decrease = function () {
        return num > 0 ? --num : 0;
    };

    return Counter;
})();

const counter = new Counter();

console.log(counter.increase()); // 1
console.log(counter.increase()); // 2
console.log(counter.decrease()); // 1
console.log(counter.decrease()); // 0
```

-   increase, decrease 메서드는 즉시 실행 함수 실행 컨텍스트의 렉시컬 환경을 기억하는 클로저다.
-   프로토타입을 통해 상속되는 프로토타입 메서드일지라도 즉시 실행 함수의 자유 변수 num을 참조할 수 있다.

<br/>

```jsx
// 함수형
function makeCounter(predicate) {
    let counter = 0;

    // 클로저를 반환
    return function () {
        counter = predicate(counter);
        return counter;
    };
}

// 보조 함수
function increase(num) {
    return ++num;
}
function decrease(num) {
    return --num;
}

const increaser = makeCounter(increase);
console.log(increaser()); // 1
console.log(increaser()); // 2
const decreaser = makeCounter(decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

-   makeCounter 함수가 반환하는 함수는 makeCounter 함수의 스코프에 속한 counter 변수를 기억하는 클로저다.
-   전역 변수 increaser와 decreaser에 할당된 함수는 각각 자신만의 독립된 렉시컬 환경을 갖기 때문에 자유 변수 counter를 공유하지 않는다. 따라서 렉시컬 환경을 공유하는 클로저를 만들어야 한다.

<br/>

```jsx
// 함수형 수정
const counter = (function () {
    let counter = 0;

    return function (predicate) {
        counter = predicate(counter);
        return counter;
    };
})();

// 보조 함수
function increase(num) {
    return ++num;
}
function decrease(num) {
    return --num;
}

console.log(counter(increase)); // 1
console.log(counter(increase)); // 2
console.log(counter(decrease)); // 1
console.log(counter(decrease)); // 0
```

<br/><br/>

# 5. 캡슐화와 정보 은닉

**캡슐화(encapsulation)** 는 객체의 상태를 나타내는 **프로퍼티**와 프로퍼티를 참조하고 조작할 수 있는 동작인 **메서드**를 하나로 묶는 것을 말한다.

캡슐화는 객체의 특정 프로퍼티나 메서드를 감출 목적으로 사용하기도 하는데 이를 **정보 은닉(information hiding)** 이라 한다.

정보 은닉은 외부에 공개할 필요가 없는 구현의 일부를 외부에 공개되지 않도록 감추어 적절치 못한 접근으로부터 객체의 상태가 변경되는 것을 방지해 정보를 보호하고, 객체 간의 결합도를 낮추는 효과가 있다.

<br/>

📌 _**자바스크립트는 public, private, protected 같은 접근 제한자를 제공하지 않는다.**_

-   기본적으로 자바스크립트 객체의 모든 프로퍼티와 메서드는 public이다.

<br/>

```jsx
const Person = (function () {
    let _age = 0;

    function Person(name, age) {
        this.name = name;
        _age = age;
    }

    // 프로토타입 메서드
    Person.prototype.sayHi = function () {
        console.log(`Hi! My name is ${this.name}. I am ${_age}.`);
    };

    return Person;
})();

const me = new Person("Roh", 20);
me.sayHi(); // Hi! My name is Roh. I am 20
console.log(me.name); // Roh
console.log(me._age); // undefined

const you = new Person("Kim", 30);
you.sayHi(); // Hi! My name is Kim. I am 30
console.log(you.name); // Kim
console.log(you._age); // undefined
```

-   프로토타입 메서드는 생성자 함수의 지역 변수를 참조할 수 없기 때문에 즉시 실행 함수로 감싸서 하나의 함수안으로 모은다.

Person.prototype.sayHi 메서드는 즉시 실행 함수가 종료된 이후 호출된다. Person 생성자 함수와 sayHi 메서드는 이미 종료되어 소멸한 즉시 실행 함수의 지역 변수 \_age를 참조할 수 있는 **클로저**다.

<br/>

**위 코드는 아래와 같은 오류가 발생한다.**

```jsx
const me = new Person("Roh", 20);
me.sayHi(); // Hi! My name is Roh. I am 20

const you = new Person("Kim", 30);
you.sayHi(); // Hi! My name is Kim. I am 30

me.sayHi(); // Hi! My name is Roh. I am 30
```

Person.prototype.sayHi 메서드는 단 한 번 생성되는 클로저이기 때문에 발생하는 현상이다.

-   Person.prototype.sayHi 메서드는 자신의 상위 스코프인 즉시 실행 함수의 실행 컨텍스트의 렉시컬 환경의 참조를 [[Environment]]에 저장하여 기억한다. 따라서 어떤 인스턴스로 Person.prototype.sayHi 메서드를 호출하더라도 하나의 동일한 상위 스코프를 사용하게 된다.
-   이러한 이유로 \_age 변수의 상태가 유지되지 않는다.

<br/>

---

### 📢 정리

-   자바스크립트는 정보 은닉을 완전하게 지원하지 않는다.
-   **인스턴스 메서드**를 사용한다면 자유 변수를 통해 private를 흉내 낼 수는 있지만, **프로토타입 메서드**를 사용하면 이마저도 불가능해진다.
-   ES6의 Symbol, WeakMap을 사용하여 private한 프로퍼티를 흉내 내기도 했으나 근본적인 해결책이 되지 않는다.

<br/><br/>

# 6. 자주 발생하는 실수

```jsx
var funcs = [];

for (var i = 0; i < 3; i++) {
    funcs[i] = function () {
        return i;
    };
}

for (var j = 0; j < funcs.length; j++) {
    console.log(funcs[j]()); // 3 3 3
}
```

-   for 문의 변수 선언문에서 var 키워드로 선언한 i 변수는 블록 레벨 스코프가 아닌 함수 레벨 스코프를 갖기 때문에 **전역 변수**다.

<br/>

```jsx
var funcs = [];

for (var i = 0; i < 3; i++) {
    funcs[i] = (function (id) {
        return function () {
            return id;
        };
    })(i);
}

for (var j = 0; j < funcs.length; j++) {
    console.log(funcs[j]()); // 0 1 2
}
```

<br/>

📌 _ES6의 let 키워드를 사용하면 이 같은 번거로움을 해결할 수 있다._

```jsx
var funcs = [];

for (let i = 0; i < 3; i++) {
    funcs[i] = function () {
        return i;
    };
}

for (let i = 0; i < funcs.length; i++) {
    console.log(funcs[i]()); // 0 1 2
}
```

-   for 문의 변수 선언문에서 let 키워드로 선언한 변수를 사용하면 for 문의 코드 블록이 반복 실행될 때마다 for 문 코드 블록의 새로운 렉시컬 환경이 생성된다.

<br/>

**let이나 const 키워드**를 사용하는 반복문은 코드 블록을 반복 실행할 때마다 새로운 렉시컬 환경을 생성하여 반복할 당시의 상태를 마치 **스냅숏**을 찍는 것처럼 저장한다.

단, 이는 반복문의 코드 블록 내부에서 **함수를 정의할 때** 의미가 있다. 반복문의 코드 블록 내부에 함수 정의가 없는 반복문이 생성하는 새로운 렉시컬 환경은 반복 이후, 아무도 참조하지 않기 때문에 **가비지 컬렉션(GC; Garbage Collection)** 의 대상이 된다.

<br/><br/>

---

<br/>

## 📗 참고

-   자바스크립트 deep dive
