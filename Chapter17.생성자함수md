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

<br/><br/>

---

<br/>

## 📗 참고

-   자바스크립트 deep dive
