자바스크립트는 명령형, 함수형, 프로토타입 기반, 객체지향 프로그래밍을 지원하는 **멀티 패러다임 프로그래밍 언어**이다.

자바스크립트는 클래스 기반 객체지향 프로그래밍 언어보다 효율적이며 더 강력한 객체지향 프로그래밍 능력을 지니고 있는 **프로토타입 기반의 객체지향 프로그래밍 언어**다.

자바스크립트는 객체 기반의 프로그래밍 언어이며 자바스크립트를 이루고 있는 거의 "모든 것"이 객체다.

📌 _원시 타입(primitive type)의 값을 제외한 나머지 값들은 모두 객체다._

<br/><br/>

# 1. 객체지향 프로그래밍

여러 개의 독립적 단위, 즉 **객체(object)의 집합**으로 프로그램을 표현하려는 프로그래밍 패러다임을 말한다.

객체지향 프로그래밍은 실세계의 실체를 인식하는 철학적 사고를 프로그래밍에 접목하려는 시도에서 시작한다.
실체는 측징이나 성질을 나타내는 **속성(attribute/property)** 을 가지고 있고, 이를 통해 실체를 인식하거나 구별할 수 있다.

다양한 속성 중에서 프로그램에 필요한 속성만 간추려 내어 표현하는 것을 **추상화(abstraction)** 라한다.

객체지향 프로그래밍은 객체의 **상태(state)** 를 나타내는 데이터와 상태 데이터를 조작할 수 있는 **동작(behavior)** 을 하나의 논리적인 단위로 묶어 생각한다.
객체의 상태 데이터를 **프로퍼티(property)**, 동작을 **메서드(method)** 라 부른다.

<br/>

---

### 📢 정리

-   속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료구조를 **객체**라 한다.
-   **객체지향 프로그래밍**은 독립적인 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임이다.

<br/><br/>

# 2. 상속과 프로토타입

### ✏️ 상속

**상속**은 객체지향 프로그래밍의 핵심 개념으로, 어떤 객체의 **프로퍼티** 또는 **메서드**를 다른 객체가 상속받아 그대로 사용할 수 있는 것을 말한다.

자바스크립트는 **프로토타입을 기반**으로 상속을 구현하여 불필요한 중복을 제거한다. (코드의 재사용)

```jsx
function Person(birthYear) {
    this.birthYear = birthYear;
    this.calcAge = function () {
        return 2021 - this.birthYear;
    };
}

const kim = new Person(27);
const park = new Person(25);

console.log(kim.calcAge === park.calcAge); // false

console.log(kim.calcAge()); // 1994
console.log(park.calcAge()); // 1996
```

-   Person 생성자 함수는 인스턴스를 생성할 때마다 calcAge 메서드를 중복 생성하고 모든 인스턴스가 중복 소유한다.
-   인스턴스가 동일한 메서드를 중복 소유하는 것은 메모리를 낭비하게 되고 퍼포먼스에도 악영향을 준다.

<br/>

📌 _자바스크립트는 프로토타입을 기반으로 상속을 구현한다._

```jsx
function Person(birthYear) {
    this.birthYear = birthYear;
}

Person.prototype.calcAge = function () {
    return 2020 - this.birthYear;
};

const kim = new Person(27);
const park = new Person(25);

console.log(kim.calcAge === park.calcAge); // true

console.log(kim.calcAge()); // 1994
console.log(park.calcAge()); // 1996
```

-   Person 생성자 함수가 생성한 모든 **인스턴스**는 자신의 상위(부모) 객체 역할을 하는 **Person.prototype**의 <u>모든 프로퍼티와 메서드를 상속받는다</u>.

<br/><br/>

# 3. 프로토타입 객체

📌 _자바스크립트의 객체는 자신의 부모 역할을 하는 객체와 연결되어 있다._

<br/>

**프로토타입 객체(또는 줄여서 프로토타입)** 는 **상위(부모) 객체의 역할**을 하는 객체로서 다른 객체에 공유 프로퍼티(메서드 포함)를 제공한다. 프로토타입을 상속받은 **하위(자식) 객체**는 상위(부모) 객체의 프로퍼티 또느 메서드를 상속받아 사용할 수 있다.

**프로토타입 객체(또는 줄여서 프로토타입)** 는 객체지향 프로그래밍의 근간을 이루는 객체 간 **상속(inheritance)** 을 구현하기 위해 사용된다.

<br/>

📌 _모든 객체는 **[[Prototype]]** 이라는 내부 슬롯을 가지며, 이 내부 슬롯의 값은 **프로토타입의 참조**다._

📌 _**[[Prototype]]** 에 저장되는 프로토타입은 객체 생성 방식에 의해 결정되다.<br/>
즉, 객체가 생성될 때 **객체 생성 방식에 따라** 프로토타입이 결정되고 [[Prototype]]에 저장된다._

-   **객체 리터럴**에 의해 생성된 객체의 프로토타입은 **Object.prototype**이고
-   **생성자 함수**에 의해 생성된 객체의 프로토타입은 **생성자 함수의 prototype에 바인딩되어 있는 객체**다.

<br/>

<p align=center>
<img width="70%" src="https://user-images.githubusercontent.com/54847910/131351289-7a4c239e-341a-46f6-a261-cb6cae1102a9.png" >
</p>

📌 _모든 객체는 하나의 **프로토타입**을 갖는다. 그리고 모든 프로토타입은 **생성자 함수**와 연결되어 있다._

[[Prototype]] 내부 슬롯에는 직접 접근할 수 없지만, 위 그림처럼 **proto** 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 자신의 **[[Prototype]] 내부 슬롯이 가리키는 프로토타입**에 간접적으로 접근할 수 있다.

프로토타입은 자신의 constructor 프로퍼티를 통해 생성자 함수에 접근할 수 있고, 생성자 함수는 자신의 **prototype 프로퍼티**를 통해 프로토타입에 접근할 수 있다.

<br/>

---

### 📢 정리

-   자바스크립트는 프로토타입을 기반으로 상속을 구현한다.
-   모든 객체는 **[[Prototype]]** 이라는 내부 슬롯을 가지며, **[[Prototype]]** 에 저장되는 프로토타입은 객체 생성 방식에 의해 결정된다.(객체 리터럴 생성 방식 또는 생성자 함수 생성 방식)
-   **[[Prototype]]** 의 값은 **프로토타입 객체**이며 **\_\_proto\_\_ 접근자 프로퍼티**에 의해 간접적으로 접근할 수 있다.

<br/>

## 3.1 \_\_proto\_\_ 접근자 프로퍼티

📌 _모든 객체는 **\_\_proto\_\_접근자 프로퍼티**를 통해 자신의 **프로토타입**, 즉 **[[Prototype]] 내부 슬롯**에 간접적으로 접근할 수 있다._

<br/>

### \_\_proto\_\_ 는 접근자 프로퍼티다.

[[Prototype]] 내부슬롯에는 직접 접근할 수 없으며 \_\_proto\_\_ 접근자 프로퍼티를 통해 간접적으로 **[[Prototype]] 내부슬롯의 값**, 즉 **프로토타입**에 접근할 수 있다.

### ✏️접근자 프로퍼티

접근자 프로퍼티는 자체적으로 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수, 즉 [[Get]], [[Set]] 프로퍼티 어트리뷰트로 구성된 프로퍼티다.

<br/>

📌 _\_\_proto\_\_는 getter/setter 함수라고 부르는 접근자 함수를 통해 [[Prototype]] 내부 슬롯의 값, 즉 프로토타입을 취득하거나 할당한다._

<br/>

### \_\_proto\_\_ 접근자 프로퍼티는 상속을 통해 사용된다.

📌 _\_\_proto\_\_ 접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아니라 **Object.prototype의 프로퍼티**다._

모든 객체는 상속을 통해 Object.prototype.\_\_proto\_\_ 접근자 프로퍼티를 사용할 수 있다.

```jsx
const person = { name: 'Kim' };

console.log(person.hasOwnProperty('__proto__'); // false

console.log({}.__proto__ === Object.prototype); // true
```

<br/>

### \_\_proto\_\_ 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유

아무런 체크 없이 무조건적으로 프로토타입을 교체할 수 없도록 \_\_proto\_\_ 접근자 프로퍼티를 통해 프로토타입에 접근하교 교체하도록 구현되어 있다.

-   순환 참조하는 프로토타입 체인이 만들어지면 프로토타입 체인 종점이 존재하지 않기 때문에 무한루프에 빠질 수 있기 때문이다.

<br/>

📌 _**프로토타입 체인**은 **단방향 링크드 리스트**로 구현되어야 한다._

-   프로퍼티 검색 방향이 한쪽 방향으로만 흘러가야 한다.

<br/>

### \_\_proto\_\_ 접근자 프로퍼티를 코드 내에서 사용하는 것은 권장하지 않는다.

모든 객체가 \_\_proto\_\_ 접근자 프로퍼티를 사용할 수 있는 것은 아니기 때문이다.

-   직접 상속을 통해 Object.prototype을 상속받지 않는 객체를 생성할 수도 있기 때문이다.

```jsx
const obj = Object.create(null);
// obj는 프로토타입 체인의 종점이다. 따라서 Object.__proto__를 상속받을 수 없다.
```

<br/>

## 3.2 함수 객체의 prototype 프로퍼티

함수 객체만이 소유하는 **prototype 프로퍼티**는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.

일반 함수(함수 선언문, 함수 표현식)도 prototype 프로퍼티를 소유하지만 객체를 생성하지 않는 일반 함수의

prototype 프로퍼티는 아무런 의미가 없다.

<br/>

📌 _모든 객체가 가지고 있는 \_\_proto\_\_ 접근자 프로퍼티와 함수 객체만이 가지고 있는 prototype 프로퍼티는 동일한 프로토타입을 가리킨다._

| 구분                          |    소유     |        값         |  사용 주체  | 사용 목적                                                                        |
| :---------------------------- | :---------: | :---------------: | :---------: | :------------------------------------------------------------------------------- |
| **proto** <br>접근자 프로퍼티 |  모든 객체  | 프로토타입의 참조 |  모든 객체  | 객체가 자신의 프로토타입에 접근 또는 교체하기 <br>위해 사용                      |
| prototype <br>프로퍼티        | constructor | 프로토타입의 참조 | 생성자 함수 | 생성자 함수가 자신이 생성할 객체(인스턴스)의 <br>프로토타입을 할당하기 위해 사용 |

```jsx
function Person(name) {
    this.name = name;
}

const chamdom = new Person("Roh");

console.log(Person.prototype === me.**proto**); // true

```

<p align=center>
<img width="70%" src="https://user-images.githubusercontent.com/54847910/131351413-75b2a00b-8995-4e75-8d76-d1f2c190439f.png" >
</p>

## 3.3 프로토타입의 constructor 프로퍼티와 생성자 함수

📌 _모든 프로토타입은 constructor 프로퍼티를 갖는다._

constructor 프로퍼티는 prototype 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킨다. 이 연결은 생성자 함수가 생성될 때(함수 객체가 생성될 때) 이뤄진다.

```jsx
function Person(name) {
    this.name = name;
}

const chamdom = new Person("Roh");

console.log(Person.constructor === Person); // true
```

-   chamdom 객체에는 constructor 프로퍼티가 없지만 chamdom 객체의 프로토타입인 Person.prototype에는 constructor가 있다. (상속 받아 사용할 수 있다.)
<p align=center>
<img width="70%" src="https://user-images.githubusercontent.com/54847910/131351538-dbc9a83e-c191-4db5-bc2a-8282c7e52a82.png" >
</p>

📌 _(생성자 함수의 prototype 프로퍼티의) **constructor 프로퍼티**는 인스턴스를 생성한 **생성자 함수(자기자신)** 을 가리킨다._

```jsx
function Person(name) {
    this.name = name;
}

const man = new Person("kim");

console.log(Person.prototype.constructor === Person); // true
console.log(man.__proto__.constructor === Person); // true
console.log(man.constructor === Person); // true
```

<br/><br/>

# 4. 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

**리터럴 표기법**에 의해 객체 생성 방식과 같이 명시적으로 new 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하지 않는 객체 생성 방식이 있는데, <br/>
리터럴 표기법에 의해 생성된 객체의 경우 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수가 반드시 객체를 생성한 생성자 함수라고 단정할 수는 없다.

```jsx
// obj 객체는 객체 리터럴로 생성했다.
const obj = {};

// 하지만 obj 객체의 생성자 함수는 Object 생성자 함수다.
console.log(obj.constructor === Object); // true
```

<br/>

**Object 생성자 함수 호출**과 **객체 리터럴**의 평가는 추상 연산 **OrdinaryObjectCreate**를 호출하여 빈 객체를 생성하는 점에서 동일하나 new.target의 확인이나 프로퍼티를 추가하는 처리 등 세부 내용은 다르다.

📌 **_객체 리터럴에 의해 생성된 객체는 Object 생성자 함수가 생성한 객체가 아니다._**

<br/>

리터럴 표기법에 의해 생성된 객체도 상속을 위해 프로토타입이 필요하다. <br/>
따라서, 리터럴 표기법에 의해 생성된 객체도 **가상적인 생성자 함수**를 갖는다. 프로토타입은 생성자 함수와 더불어 생성되며 prototype, constructor 프로퍼티에 의해 연결되어 있기 때문이다.

📌 **_프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍(pair)으로 존재한다._**

<br/>

➡️ 리터럴 표기법에 의해 생성된 객체는 생서자 함수에 의해 생성된 개체는 아니다. 하지만, 큰 틀에서 생각해 보면 리터럴 표기법으로 생성한 객체도 생성자 함수로 생성한 객체와 본질적인 면에서 큰 차이는 없다.

➡️ 따라서 프로토타입의 constructor 프로퍼티를 통해 연결되어 있는 생성자 함수를 리터럴 표기법으로 생성한 생성자 함수로 생각해도 크게 무리는 없다.

<br/>

| 리터럴 표기법      | 생성자 함수 | 프로토타입         |
| :----------------- | :---------- | :----------------- |
| 객체 리터럴        | Object      | Object.prototype   |
| 함수 리터럴        | Function    | Function.prototype |
| 배열 리터럴        | Array       | Array.prototype    |
| 정규 표현식 리터럴 | RegExp      | RegExp.prototype   |

<br/><br/>

# 5. 프로토타입의 생성 시점

📌 _**프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성된다.**_

-   프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재하기 때문이다.

<br/>

생성자 함수는 **사용자 정의 생성자 함수**와 **빌트인 생성자 함수**로 구분할 수 있다. 아래는 두 생성자 함수의 프로토타입 생성 시점에 대한 설명이다.

## 5.1 사용자 정의 생성자 함수와 프로토타입 생성 시점

사용자 정의 생성자 함수는 자신이 평가되어 **함수 객체로 생성되는 시점(런타임 이전)** 에 프로토타입도 더불어 생성되며, 생성된 프로토타입의 프로토타입은 언제나 **Object.prototype**이다.

-   함수 선언문은 자바스크립트 엔진에 의해 **런타임 이전**에 평가된다.
-   프로토타입도 객체이고 모든 객체는 프로토타입을 가지므로 프로토타입도 자신의 프로토타입을 갖는다.

## 5.2 빌트인 생성자 함수와 프로토타입 생성 시점

빌트인 생성자 함수는 **전역 객체가 생성되는 시점**에 생성된다. 생성된 프로토타입은 빌트인 생성자 함수의 prototype 프로퍼티에 바인딩된다.

<br/>

---

### 📢 정리

-   객체가 생성되기 이전에 생성자 함수와 프로토타입은 이미 객체화되어 존재한다.
-   이후 생성자 함수 또는 리터럴 표기법으로 객체를 생성하면 프로토타입은 생성된 객체의 [[Prototype]] 내부 슬롯에 할당된다.
-   이로써 생성된 객체는 프로토타입을 상속받는다.

<br/><br/>

# 6. 객체 생성 방식과 프로토타입의 결정

객체 생성 방법(객체 리터럴, object 생성자 함수, 생성자 함수 등)마다 세부적인 객체 생성 방식의 차이는 있지만
**추상연산자 OrdinaryObjectCreate**에 의해 생성된다는 공통점이 있다.

📌 _프로토타입은 **추상연산자 OrdinaryObjectCreate** 에 전달되는 인수에 의해 결정된다. 이 인수는 객체가 생성되는 시점에 객체 생성 방식에 의해 결정된다._

<br/>

## 6.1 객체 리터럴에 의해 생성된 객체의 프로토타입

자바스크립트 엔진은 객체 리터럴을 평가하여 객체를 생성할 때 추상 연산 OrdinaryObjectCreate를 호출한다.<br/>
이때 추상 연산 OrdinaryObjectCreate에 전달되는 프로토타입은 **Object.prototype**이다.<br/>

📌 _**객체 리터럴**에 의해 생성되는 객체의 **프로토 타입**은 **Object.prototype**이다._

<br/>

```jsx
const obj = { x: 1 };
```

<p align=center>
<img width="70%" src="https://user-images.githubusercontent.com/54847910/131679610-90fc2bd4-9480-4e43-9b09-9c5655baab6f.png"></p>

## 6.2 Object 생성자 함수에 의해 생성된 객체의 프로토타입

Object 생성자 함수를 인수 없이 호출하면 빈 객체가 생성된다.<br/>
Object 생성자 함수를 호출하면 OrdinaryObjectCreate가 호출된다.<br/>
이때 추상 연산 OrdinaryObjectCreate에 전달되는 프로토타입은 **Object.prototype**이다.<br/>

📌 _**Object 생성자 함수**에 의해 생성되는 객체의 **프로토타입**은 **Object.prototype**이다._

<br/>

```jsx
const obj = new Object();
obj.x = 1;
```

<p align=center>
<img width="70%" src="https://user-images.githubusercontent.com/54847910/131679376-906d6106-db60-4478-be95-776d2934688e.png" ></p>

➡️ **객체리터럴**과 **Object 생성자 함수**에 의한 객체 생성 방식의 차이는 프로퍼티를 추가하는 방식에 있다.

-   **객체 리터럴 방식**은 객체 리터럴 내부에 프로퍼티를 추가하지만,
-   **Object 생성자 함수 방식**은 일단 빈 객체를 생성한 이후 프로퍼티를 추가해야 한다.

## 6.3 생성자 함수에 의해 생성된 객체의 프로토타입

new 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하면 OrdinaryObjectCreate가 호출된다.<br/>
이때 추상 연산 OrdinaryObjectCreate에 전달되는 프로토타입은 **생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체**다.

📌 _생성자 함수에 의해 생성되는 객체의 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체다._

```jsx
function Person(name) {
    this.name = name;
}

const chamdom = new Person("Roh");
```

<br/><br/>

# 7. 프로토타입 체인

자바스크립트는 객체의 프로퍼티(메서드 포함)에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면
[[Prototype]] 내부 슬롯의 참조를 따라 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순착작으로 검색한다.<br/>
이를 **프로토타입 체인**이라 한다.

<br/>

```jsx
function Person(name) {
    this.name = name;
}

Person.prototype.sayHello = function () {
    console.log(`Hi My name is ${this.name}`);
};

const chamdom = new Person("Roh");
```

-   chamdom 객체는 Person.prototype뿐만 아니라 Object.prototype도 상속 받는다.

```jsx
Object.getPrototypeOf(chamdom) === Person.prototype; // true
```

-   Person.prototype의 프로토타입은 Object.prototype이다.

<br/>

프로토타입 체인의 최상위에 위치하는 객체는 언제나 **Object.prototype**이다.<br/>
Object.prototype을 프로토타입 **체인의 종점(end of prototype chain)** 이라 한다.<br/>
Object.prototype의 프로토타입([[Prototype]] 내부 슬롯 값)은 **null**이다.

<br/>

📌 _**프로토타입 체인**은 상속과 프로퍼티 검색을 위한 메커니즘이다._

📌 _**스코프 체인**은 식별자 검색을 위한 메커니즘이다._

-   프로퍼티가 아닌 식별자는 스코프 체인에서 검색한다.

<br/>

```jsx
chamdom.hasOwnProperty("name");
```

1. 스코프 체인에서 chamdom 식별자를 찾는다.
2. chamdom 객체의 프로토타입 체인에서 hasOwnProperty 메서드를 검색한다.

📌 _**스코프 체인**과 **프로토타입 체인**은 서로 연관없이 별도로 동작하는 것이 아니라 서로 협력하여 식별자와 프로퍼티를 검색하는 데 사용된다._
