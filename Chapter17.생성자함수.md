# 1. object 생성자 함수

```jsx
const person = new Object();

person.name = "Kim";
person.sayHello = function () {
    console.log("Hi! My name is  " + this.name);
};

console.log(person); // {name:"Kim", sayHello:f}
person.sayHello(); // Hi! My name is Kim
```

**생성자 함수(constructor)** 란 **new 연산자**와 함께 호출하여 **객체(인스턴스)** 를 생성하는 함수를 말한다.

생성자 함수에 의해 생성된 객체를 **인스턴스**라 한다.

📌 _**반드시 Object 생성자 함수를 사용해 빈 객체를 생성해야 하는 것은 아니다.**_

<br/><br/>

# 2. 생성자 함수

## 2.1 객체 리터럴에 의한 객체 생성 방식의 문제점

객체 리터럴에 의한 객체 생성 방식은 **단 하나의 객체만** 생성한다.<br/>
➡️ 따라서 동일한 프로퍼티를 갖는 객체를 여러 개 생성해야 하는 경우 매번 같은 프로퍼티를 기술해야 해서 **비효율적**이다.

<br/>

## 2.2 생성자 함수의 의한 객체 생성 방식의 장점

```jsx
// 생성자 함수
function Person(age) {
    this.age = age;
    this.getBirthYear = function () {
        return 2021 - this.age; // 만 나이를 입력한다고 가정
    };
}

// 인스턴스 생성
const dom = new Peroson(20);
const roh = new Peroson(25);

console.log(dom.getBirthYear()); // 2001
console.log(roh.getBirthYear()); // 1996
```

클래스처럼 생성자 함수를 사용하여 프로퍼티 구조가 동일한 객체 여러 개를 간편하게 생성할 수 있다.

자바와 같은 클래스 기반 객체지향 언어의 생성자와 다르게 **형식이 정해져 있지 않고**
일반 함수와 동일하게 생성자 함수를 정의하고 **new 연산자**와 함께 호출하면 해당 함수는 생성자 함수로 동작한다.

📌 _new 연산자와 함께 호출하지 않으면 일반 함수처럼 동작한다._

<br/>

## 2.3 생성자 함수의 인스턴스 생성 과정

### ✏️ 생성자 함수의 역할

프로퍼티 구조가 동일한 인스턴스를 생성하기 위한 템플릿(클래스)으로서 동작하여
1️⃣ **인스턴스를 생성**하는 것과 2️⃣ **생성된 인스턴스를 초기화**(인스턴스 프로퍼티 추가 및 초기값 할당) 하는 것이다.

생성자 함수 내부에는 인스턴스를 생성하고 반환하는 코드가 없는데, 이는 자바스크립트 엔진이 암묵적인 처리를 통해 인스턴스를 생성하고 반환한다.

<br/>

### 1. 인스턴스 생성과 this 바인딩

암묵적으로 **빈 객체(인스턴스)** 가 생성되고 **this에 바인딩**된다.<br/>
→ 생성자 함수 내부에서의 this가 생성될 인스턴스를 가리키는 이유다.

이 처리는 함수 몸체의 코드가 한 줄씩 실행되는 **런타임 이전**에 실행된다.

```jsx
function Person(age) {
    // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.

    this.age = age;
    this.getBirthYear = function () {
        return 2021 - this.age;
    };
}
```

<br/>

### 2. 인스턴스 초기화

인스턴스에 **프로퍼티**나 **메서드**를 추가하고 생성자 함수가 **인수로 전달받은 초기값**을 인스턴스 프로퍼티에 할당하여 초기화하거나 고정값을 할당한다.

```jsx
function Person(age) {
    // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.

    // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
    this.age = age;
    this.getBirthYear = function () {
        return 2021 - this.age;
    };
}
```

<br/>

### 3. 인스턴스 반환

생성자 함수의 내부 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 **암묵적으로** 반환된다.

```jsx
function Person(age) {
    // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.

    // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
    this.age = age;
    this.getBirthYear = function () {
        return 2021 - this.age;
    };

    // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
}
```

📌 _**명시적으로 다른 객체를 반환하면** this가 반환되지 못하고 return 문에 명시한 객체가 반환된다._

📌 _**명시적으로 원시 값을 반환하면** 원시 값 반환은 무시되고 암묵적으로 this가 반환된다._

<br/>

## 2.4 내부 메서드 [[Call]]과 [[Construct]]

함수는 객체이므로 **일반 객체(ordinary object)** 와 동일하게 동작할 수 있다.<br/>
→ 함수 객체는 일반 객체가 가지고 있는 내부 슬롯과 내부 메서드를 모두 가지고 있기 때문이다.

<br/>

📌 _일반 객체는 호출할 수 없지만 함수는 호출할 수 있다._

-   함수 객체는 함수로서 동작하기 위해 함수 객체만을 위한 [[Environment]], [[FormalParameters]] 등의 내부 슬롯과 [[Call]], [[Construct]] 같은 내부 메서드를 추가로 가지고 있다.
-   함수가 **일반 함수로서 호출되면** **[[Call]]** 이 호출되고 new 연산자와 함께 **생성자 함수로서 호출되면 [[Construct]]** 가 호출된다.

<br/>

내부 메서드 [[Call]]을 갖는 함수 객체를 **callable**이라 하며,<br/>
내부 메서드 [[Construct]]를 갖는 함수 객체를 **constructor**,<br/>
내부 메서드 [[Construct]]를 갖지 않는 함수 객체를 **non-constructor**라고 부른다.

📌 _**callable**은 호출할 수 있는 객체(함수)를 말하며, **constructor**는 생성자 함수로서 호출할 수 있는 함수,<br/>
**non-constructor**는 생성자 함수로서 호출할 수 없는 함수를 의미한다._

📌 _함수객체는 **constructor**일 수도 있고 **non-constructor**일 수도 있다._

<br/>

## 2.5 constructor와 non-constructor의 구분

자바스크립트 엔진은 함수 정의를 평가하여 함수 객체를 생성할 때 **함수 정의 방식에 따라** 함수를 **constructor**와 **non-constructor**로 구분한다.

-   **constructor:** 함수 선언문, 함수 표현식, 클래스
-   **non-constructor:** 메서드(ES6 메서드 축약 표현), 화살표 함수

📌 _함수가 어디에 할당되어 있는 지에 따라 메서드인지를 판단하는 것이 아니라 **함수 정의 방식에 따라 constructor**와 **non-constructor**를 구분한다._

```jsx
// ////////////////////////////////////////////////////////
// constructor
// 함수 선언문
function foo() {}

// 함수 표현식
const bar = function() {}

// 프로퍼티에 할당 된 함수는 메서드로 인정하지 않는다.
const baz = function() {
		x: function() {}
};

new foo();
new bar();
new baz.x();

// ////////////////////////////////////////////////////////
// non-constructor
// 화살표 함수
const arrow = () => {};

new arrow(); // TypeError: arrow is not a constructor

// ES6의 메서드 축약 표현만 메서드로 인정한다.
const obj = {
		x() {}
};

new obj.x(); // TypeError: obj.x is not a constructor
```

<br/>

## 2.6 new 연산자

**new 연산자**와 함께 함수를 호출하면 해당 함수는 생성자 함수로 동작한다.

함수 객체의 내부 메서드 **[[Call]]**이 호출되는 것이 아니라 **[[Constructor]]**가 호출된다.

**new 연산자**와 함께 호출되는 함수는 non-constructor가 아닌 **constructor**이어야 한다.

<br/>

## 2.7 new.target

함수 내부에서 **new.target**을 사용하면 **new 연산자**와 함께 생성자 함수로서 호출되었는지 확인할 수 있다.

📌 _new 연산자와 함께 **생성자 함수로서 호출되면** 함수 내부의 new.target은 **함수 자신**을 가리킨다.<br/>
new 연산자 없이 **함수로서 호출된** 함수 내부의 new.target은 **undefined**다._

```jsx
function Person(age) {
    if (!new.target) {
        return new Person(age);
    }

    this.age = age;
    this.getBirthYear = function () {
        return 2021 - this.age;
    };
}

// new 연산자 없이 생성자 함수를 호출하여도 new.target을 통해 생성자 함수로서 호출된다.
const kim = Person(25);
```

➡️ Object와 Function 생성자 함수는 new 연산자 없이 호출해도 new 연산자와 함께 호출했을 때와 동일하게 동작한다.

➡️ String, Number, Boolean 생성자 함수는 new 연산자와 함께 호출했을 때 String, Number, Boolean 객체를 생성하여 반환하지만 new 연산자 없이 호출하면 문자열, 숫자, 불리언 값을 반환한다.

<br/><br/>

---

<br/>

## 📗 참고

-   자바스크립트 deep dive
