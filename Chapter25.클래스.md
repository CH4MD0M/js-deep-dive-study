# 1. 클래스는 프로토타입의 문법적 설탕인가?

자바스크립트는 프로토타입 기반 객체지향 언어다. 프로토타입 기반 객체지향 언어는 클래스가 필요 없는(class free) 객체지향 프로그래밍 언어다.

ES6의 클래스가 기존의 프로토타입 기반 객체지향 모델을 폐지하고 새롭게 클래스 기반 객체지향 모델을 제공하는 것은 아니다. 클래스는 **함수**이며 기존 프로토타입 기반 패턴을 **클래스 기반 패턴처럼 사용할 수 있도록 하는** **문법적 설탕**이라고 볼 수도 있다.

<br/>

클래스는 생성자 함수보다 엄격하며 생성자 함수에서 제공하지 않는 기능도 제공한다.

-   클래스를 **new 연산자** 없이 호출하면 에러가 발생한다.
-   클래스는 상속을 지원하는 **extends**와 **super키워드**를 제공한다.
-   클래스는 호이스팅이 발생하지 않는 것처럼 동작한다.
-   클래스 내의 모든 코드에는 암묵적으로 **strict mode**가 지정되어 실행되며 strict mode를 해제할 수 없다.
-   클래스의 constructor, 프로토타입 메서드, 정적 메서드는 모두 프로퍼티 어트리뷰트 **[[Enumerable]]값**이 **false**다. (열거되지 않는다.)

<br/>

📌 _클래스를 프로토타입 기반 객체 생성 패턴의 단순한 문법적 설탕이라고 보기보다는 **새로운 객체 생성 메커니즘**으로 보는 것이 좀 더 합당하다._

<br/><br/>

# 2. 클래스 정의

클래스는 class 키워드를 사용하여 정의한다. 클래스 이름은 생성자 함수와 마찬가지로 파스칼 케이스를 사용하는 것이 일반적이다.

```jsx
// 클래스 선언문
class Person {}
```

일반적이지는 않지만 **표현식**으로 클래스를 정의할 수도 있다. 클래스를 표현식으로 정의할 수 있다는 것은 클래스가 **일급 객체**라는 것을 의미한다.

```jsx
// 익명 클래스 표현식
const Person = class MyClass {};

// 기명 클래스 표현식
const Person = class MyClass {};
```

<br/>

### ✏️ **일급 객체 특징**

-   무명의 리터럴로 생성할 수 있다(런타임에 생성이 가능하다).
-   변수나 자료구조(객체, 배열 등)에 저장할 수 있다.
-   함수의 매개변수에게 전달할 수 있다.
-   함수의 반환값으로 사용할 수 있다.

<br/>

클래스 몸체에는 0개 이상의 메서드만 정의할 수 있다. 클래스의 몸체에 정의할 수 있는 메서드는 **constructor**, **프로토타입 메서드**, **정적 메서드** 세 가지가 있다.

```jsx
class Person {
    // 생성자
    constructor(name) {
        this.name = name;
    }

    // 프로토타입 메서드
    sayHi() {
        console.log(`Hi! My name is ${this.name}`);
    }

    // 정적 메서드
    static sayHello() {
        console.log("Hello!");
    }
}

// 인스턴스 생성
const me = new Person("Roh");

// 인스턴스의 프로퍼티 참조
console.log(me.name); // Roh
// 프로토타입 메서드 호출
me.sayHi(); // Hi! My name is Roh
// 정적 메서드 호출
Person.sayHello(); // Hello!
```

<br/><br/>

# 3. 클래스 호이스팅

클래스는 **함수**로 평가된다.

클래스 선언문으로 정의한 클래스는 함수 선언문과 같이 **런타임 이전에 먼저 평가**되어 함수 객체를 생성한다. 이때 클래스가 평가되어 생성된 함수 객체는 생성자 함수로서 호출할 수 있는 **constructor**다.

```jsx
class Person {}
console.log(typeof Person); // function
```

<br/>

📌 _**클래스는 클래스 정의 이전에 참조할 수 없다.**_

```jsx
console.log(Person);
// ReferenceError: Cannot access 'Person' before initialization

class Person {}
```

<br/>

클래스는 let, const 키워드로 선언한 변수처럼 호이스팅된다.<br/>
클래스 선언문 이전에 **일시적 사각지대(Temporal Dead Zone)** 에 빠지기 때문에 호이스팅이 발생하지 않는 것처럼 동작한다.

```jsx
const Person = "";

{
    // 호이스팅이 발생하지 않는다면 ''이 출력되어야 한다.
    console.log(Person);
    // ReferenceError: Cannot access 'Person' before initialization

    class Person {}
}
```

<br/><br/>

# 4. 인스턴스 생성

클래스는 생성자 함수이며 **new 연산자**와 함께 호출되어 인스턴스를 생성한다.

```jsx
class Person {}

// 인스턴스 생성
const me = new Person();
console.log(me); // Person {}
```

함수는 new 연산자의 사용 여부에 따라 일반 함수 또는 생성자 함수로 호출되지만, 클래스는 인스턴스를 생성하는 것이 유일한 존재 이유이므로 반드시 **new 연산자**와 함께 호출해야 한다.

-   클래스를 new 연산자 없이 호출하면 타입 에러가 발생한다.

<br/><br/>

# 5. 메서드

클래스 몸체에는 0개 이상의 메서드만 정의할 수 있다. 클래스의 몸체에 정의할 수 있는 메서드는 **constructor**, **프로토타입 메서드**, **정적 메서드** 세 가지가 있다.

## 25.5.1 constructor

constructor는 인스턴스를 생성하고 초기화하기 위한 특수한 메서드다. constructor는 이름을 변경할 수 없다.

```jsx
class Person {
    // 생성자
    constructor(name) {
        // 인스턴스 생성 및 초기화
        this.name = name;
    }
}
```

<br/>

### 클래스의 내부

```jsx
console.dir(Person);
```

클래스도 함수 객체 고유의 프로퍼티를 모두 갖고 있다. 함수와 동일하게 **프로토타입과 연결**되어 있으며 자신의 **스코프 체인**을 구성한다.

prototype 프로퍼티가 가리키는 프로토타입 객체의 constructor 프로퍼티는 클래스 자신을 가리키고 있다.

-   클래스가 인스턴스를 생성하는 생성자 함수라는 것을 의미한다.
-   new 연산자와 함께 클래스를 호출하면 클래스는 인스턴스를 생성한다.

<br/>

### 클래스가 생성한 인스턴스의 내부

```jsx
const me = new Person("Roh");
console.log(me);
```

📌 **_constructor 내부의 this는 생성자 함수와 마찬가지로 클래스가 생성한 인스턴스를 가리킨다._**

-   생성자 함수와 마찬가지로 constructor 내부에서 this에 추가한 프로퍼티는 인스턴스 프로퍼티가 된다.

클래스가 평가되어 생성된 함수 객체나 클래스가 생성한 인스턴스 어디에도 constructor 메서드가 보이지 않는다.

-   클래스 몸체에 정의한 constructor가 단순한 메서드가 아니라는 것을 의미한다
-   constructor는 **메서드로 해석되는 것이 아니라** 클래스가 평가되어 생성한 **함수 객체 코드의 일부**가 된다. <br/>클래스 정의가 평가되면 constructor의 기술된 동작을 하는 함수 객체가 생성된다.

<br/>

### 클래스와 생성자 함수에서 constructor의 차이점

1. **2개 이상의 constructor를 포함하면 문법 에러가 발생한다.**

```jsx
class Person {
		constructor() {}
		constructor() {}
}
// SyntaxError: A class may only have one constructor
```

2. **constructor는 생략할 수 있다.**

```jsx
class Person {}
```

3. **constructor를 생략하면 빈 constructor가 암묵적으로 정의된다.**

```jsx
class Person {
    constructor() {}
}

const me = new Person();
console.log(me); // Person {}
```

4. **클래스 외부에서 인스턴스 프로퍼티의 초깃값을 전달하려면 다음과 같이 constructor에 매개변수를 선언하고 인스턴스를 생성할 때 초기값을 전달한다.**

```jsx
class Person {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }
}

const me = new Person("Roh", "Incheon");
console.log(me); // Person {name: 'Roh', address: "Incheon"}
```

<br/>

✔️ 생성자 함수의 **인스턴스 반환**과 같은 결과.

📌 _명시적으로 **다른 객체**를 반환하면 this가 반환되지 못하고 **return 문에 명시한 객체가 반환**된다._

```jsx
class Person {
    constructor(name) {
        this.name = name;

        // 명시적으로 객체를 반환하면 암묵적인 this 반환이 무시된다.
        return {};
    }
}

const me = new Person("Roh");
console.log(me); // {}
```

📌 _명시적으로 **원시 값**을 반환하면 원시 값 반환은 무시되고 암묵적으로 **this가 반환**된다._

```jsx
class Person {
    constructor(name) {
        this.name = name;

        // 명시적으로 원시 값을 반환하면 원시 값 반환은 무시되고 암묵적으로 this가 반환된다.
        return 100;
    }
}

const me = new Person("Roh");
console.log(me); // Person { name: Roh }
```

## 5.2 프로토타입 메서드

📌 _클래스 몸체에서 정의한 메서드는 클래스의 prototype 프로퍼티에 메서드를 추가하지 않아도 기본적으로 **프로토타입 메서드**가 된다._

```jsx
class Person {
    constructor(name) {
        this.name = name;
    }

    // 프로토타입 메서드
    sayHi() {
        console.log(`Hi! My name is ${this.name}`);
    }
}

const me = new Person("Roh");
me.sayHi(); // Hi! My name is Roh
```

<p align="center"><img width="60%" src="https://user-images.githubusercontent.com/54847910/134471658-c8c93015-69d6-4403-ae43-d764aae28943.png"></p>

클래스틑 생성자 함수와 같이 인스턴스를 생성하는 생성자 함수라고 볼 수 있다. 클래스는 생성자 함수와 마찬가지로 프로토타입 기반의 객체 생성 메커니즘이다.

## 5.3 정적 메서드

생성자 함수와 다르게 클래스에서는 메서드 앞에 **static 키워드**를 붙이면 **정적 메서드(클래스 메서드)** 가 된다.

```jsx
// 생성자 함수
function Person(name) {
    this.name = name;
}

// 정적 메서드
Person.sayHi = function () {
    console.log("Hi!");
};

Person.sayHi(); // Hi!
```

```jsx
// 클래스
class Person {
    constructor(name) {
        this.name = name;
    }

    // 정적 메서드
    static sayHi() {
        console.log("Hi");
    }
}

Person.sayHi(); // Hi!
```

<p align="center"><img width="60%" src="https://user-images.githubusercontent.com/54847910/134471787-554fa722-085c-41f8-a281-19c24530fd30.png"></p>

정적 메서드가 바인딩된 클래스는 인스턴스의 프로토타입 체인 상에 존재하지 않기 때문에 정적 메서드는 인스턴스로 호출할 수 없다.

## 5.4 정적 메서드와 프로토타입 메서드의 차이

1. 정적 메서드와 프로토타입 메서드는 자신이 속해 있는 **프로토타입 체인이 다르다.**
2. **정적 메서드**는 **클래스로 호출**하고 **프로토타입 메서드**는 **인스턴스로 호출**한다.
3. **정적 메서드**는 **인스턴스 프로퍼티**를 참조할 수 없지만, **프로토타입 메서드**는 **인스턴스 프로퍼티**를 참조할 수 있다.

📌 **_인스턴스 프로퍼티를 참조해야 한다면 정적메서드 대신 프로토타입 메서드를 사용해야 한다._**

```jsx
class Square {
    // 정적 메서드
    static area(width, height) {
        return width * height;
    }
}
console.log(Square.area(10, 10)); // 100
```

```jsx
class Square {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    // 프로토타입 메서드
    area() {
        return this.width * this.height;
    }
}

const square = new Square(10, 10);
console.log(square.area());
```

정적 메서드는 클래스로 호출해야 하므로 정적 메서드 내부의 this는 인스턴스가 아닌 클래스를 가리킨다. 즉, 프로토타입 메서드와 정적 메서드 내부의 this 바인딩이 다르다.

## 5.5 클래스에서 정의한 메서드의 특징

1. function 키워드를 생략한 메서드 축약 표현을 사용한다.
2. 객체 리터럴과는 다르게 클래스에 메서드를 정의할 때는 콤마(,)가 필요없다.
3. 암묵적으로 **strict mode**로 실행된다.
4. for ...in 문이나 Object.keys 메서드 등으로 **열거할 수 없다.**(constructor, 프로토타입 메서드, 정적 메서드는 모두 프로퍼티 어트리뷰트 **[[Enumerable]]값**이 **false**다.)
5. 내부 메서드 [[Constructor]]를 갖지 않는 non-constructor다. 따라서 new 연산자와 함께 호출할 수 없다.

<br/><br/>

# 6. 클래스의 인스턴스 생성 과정

### 1. 인스턴스 생성과 this 바인딩

new 연산자와 함꼐 클래스를 호출하면 constructor의 내부 코드가 실행되기에 앞서 암묵적으로 빈 객체가 생성된다.<br/> → **이 빈 객체가 바로 클래스가 생성한 인스턴스다.**

constructor 내부의 this는 클래스가 생성한 인스턴스를 가리킨다.

### 2. 인스턴스 초기화

constructor의 내부 코드가 실행되어 this에 바인딩되어 있는 인스턴스를 초기화한다.

this에 바인딩되어 있는 인스턴스에 프로퍼티를 추가하고 constructor가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티 값을 초기화한다.

constructor가 생략되었다면 이 과정도 생략된다.

### 3. 인스턴스 반환

클래스의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.

```jsx
class Person {
    // 생성자
    constructor(name) {
        // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.
        console.log(this); // Person {]}
        console.log(Object.getPrototypeOf(this) === Person.prototype); // true

        // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
        this.name = name;

        // 3. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
    }
}
```

<br/><br/>

# 7. 프로퍼티

## 7.1 인스턴스 프로퍼티

**인스턴스 프로퍼티**는 **constructor 내부**에서 정의해야 한다.

```jsx
class Person {
    constructor(name) {
        // 인스턴스 프로퍼티
        this.name = neame;
    }
}

const me = new Person("Roh");
console.log(me); // Person {name: "Roh"}
```

constructor 내부에서 this에 추가한 프로퍼티는 언제나 클래스가 생성한 인스턴스의 프로퍼티가 된다.

## 7.2 접근자 프로퍼티

**접근자 프로퍼티**는 자체적으로 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 **접근자 함수(getter, setter)** 로 구성된 프로퍼티다.

```jsx
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // getter 함수
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    // setter 함수
    set fullName(name) {
        [this.firstName, this.lastName] = name.split(" ");
    }
}

const me = new Person("Kihoon", "Roh");
console.log(`${me.firstName} ${me.lastName}`); // Kihoon Roh

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// setter 함수가 호출된다.
me.fullName = "Kihoon Noh";
console.log(me); // {firstName: "kihoon", lastName: "Noh"}

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다.
console.log(me.fullName); // kihoon Noh
```

**getter**는 이름 그대로 무언가를 취득할 때 사용하므로 **반드시 무언가를 반환해야 하고**, **setter**는 무언가를 프로퍼티에 할당해야 할 때 사용하므로 **반드시 매개변수가 있어야 한다. setter는 단 하나의 매개변수만 선언할 수 있다.**

**클래스의 메서드는 기본적으로 프로토타입 메서드가 된다.** 따라서 클래스의 **접근자 프로퍼티** 또한 인스턴스 프로퍼티가 아닌 **프로토타입 프로퍼티**가 된다.

## 7.3 클래스 필드 정의 제안

**클래스 필드(필드 또는 멤버)** 는 클래스 기반 객체지향 언어에서 클래스가 생성할 **인스턴스의 프로퍼티**를 가리키는 용어다.

클래스 몸체에서 클래스 필드를 정의하는 **클래스 필드 정의(Class field difinitions)제안**은 아직 ECMAScript의 정식 표준 사양으로 승급되지 않았다.

```jsx
class Person {
    // 클래스 필드 정의
    name = "Roh";
}

const me = new Person();
console.log(me); // Person {name: "Roh"}
```

📌 _**클래스 몸체에서 클래스 필드를 정의하는 경우 this에 클래스 필드를 바인딩해서는 안 된다.**_

-   this는 클래스의 constructor와 메서드 내에서만 유효하다.

```jsx
class Person {
		this.name = ''; // SyntaxError: Unexpected token '.'
}
```

📌 _**클래스 필드를 참조하는 경우 자바스크립트에서는 this를 반드시 사용해야 한다.(자바처럼 생략할 수 없음)**_

```jsx
class Person {
    // 클래스 필드
    name = "Roh";

    constructor() {
        console.log(name); // ReferenceError: name in not defined
    }
}

new Person();
```

📌 _**클래스 필드에 초기값을 할당하지 않으면 undefined를 갖는다.**_

```jsx
class Person {
    name;
}

const me = new Person();
console.log(me); // Person {name: undefined}
```

📌 _**클래스 필드를 통해 메서드를 정의할 수도 있다.**_

-   **클래스 필드에 함수를 할당하는 경우**, 이 함수는 모든 클래스 필드는 인스턴스 프로퍼티가 되기 때문에 프로토타입 메서드가 아닌 **인스턴스 메서드**가 된다.
-   **따라서 클래스 필드에 함수를 할당하는 것은 권장하지 않는다.**

<br/>

## 7.4 private 필드 정의 제안

자바스크립트는 접근 제한자를 지원하지 않는다. 따라서 **인스턴스 프로퍼티**는 인스턴스를 통해 클래스 외부에서 언제나 참조할 수 있다(언제나 public이다).

<br/>

**private 필드**를 정의하기 위해서는 선두에 **#** 을 붙여준다. **private 필드를 참조할 때**도 **#** 을 붙어주어야 한다.

**public 필드**는 **어디서든 참조**할 수 있지만, **private 필드**는 **클래스 내부에서만** 참조할 수 있다.

```jsx
class Person {
    // private 필드 정의
    #name = "";

    constructor(name) {
        // private 필드 참조
        this.#name = name;
    }
}

const me = new Person("Roh");

// private 필드 #name은 클래스 외부에서 참조할 수 없다.
console.log(me.#name);
// SyntaxError: Private field '#name' must be declared in an enclosing class
```

클래스 외부에서 private 필드에 직접 접근할 수 없지만, **접근자 프로퍼티**를 통해 간접적으로 접근하는 방법은 유효하다.

```jsx
class Person {
    // private 필드 정의
    #name = "";

    constructor(name) {
        this.#name = name;
    }

    // 접근자 프로퍼티 name
    get name() {
        return this.#name.trim();
    }
}

const me = new Person("  Roh  ");
console.log(me.name); // Roh
```

private 필드는 반드시 **클래스 몸체**에 정의해야 한다. constructor에 정의하면 에러가 발생한다.

```jsx
class Person {
    constructor(name) {
        this.#name = name;
        // SyntaxError: Private field '#name' must be declared
        // in an enclosing clsss
    }
}
```

## 7.5 static 필드 정의 제안

```jsx
class MyMath {
    // static public 필드 정의
    static PI = 22 / 7;

    // static private 필드 정의
    static #num = 10;

    // static 메서드
    static increment() {
        return ++MyMath.#num;
    }
}

console.log(MyMath.PI); // 3.142857142857143
console.log(MyMath.increment()); // 11
```

<br/><br/>

# 8. 상속에 의한 클래스 확장

## 8.1. 클래스 상속과 생성자 함수 상속

상속에 의한 클래스 확장은 프로토타입 기반 상속과는 다른 개념이다.

📌 _**상속에 의한 클래스 확장은 기존 클래스를 상속받아 새로운 클래스를 확장(extends)하여 정의하는 것이다.**_

<p align="center">
<img width="60%" src="https://user-images.githubusercontent.com/54847910/134670632-69971eb9-9d8a-4101-ab01-a6be59361867.png">
</p>

<br/>

### ✏️ 클래스 상속 예시

```jsx
class Animal {
    constructor(age, weight) {
        this.age = age;
        this.weight = weight;
    }

    eat() {
        return "eat";
    }
    move() {
        return "move";
    }
}

// 상속을 통해 Animal 클래스를 확장한 Bird 클래스
class Bird extends Animal {
    fly() {
        return "fly";
    }
}

const bird = new Bird(1, 5);

console.log(bird); // Bird {age:1, weight: 5}
console.log(bird instanceof Bird); // true
console.log(bird instanceof Animal); // true

console.log(bird.eat()); // eat
console.log(bird.move()); // move
console.log(bird.fly()); // fly
```

<p align="center">
<img width="60%" src="https://user-images.githubusercontent.com/54847910/134670765-61a61b82-54ea-479d-8e18-b6832393319b.png">
</p>

자바스크립트는 클래스 기반 언어가 아니므로 생성자 함수의 의사 클래스 상속 패턴을 사용하여 상속에 의한 클래스 확장을 흉내 내기도 했다. 클래스의 등장으로 의사 클래스 상속 패턴은 더 이상 필요하지 않다.

<br/>

## 8.2 extends 키워드

상속을 통해 클래스를 확장하려면 **extends 키워드**를 사용하여 상속받을 클래스를 정한다.

```jsx
// 슈퍼/베이스/부모 클래스
class Base {}

// 서브/파생/자식 클래스
class Derived extends Base {}
```

수퍼클래스와 서브 클래스는 인스턴스의 프로토타입 체인뿐 아니라 **클래스 간의 프로토타입 체인**도 생성한다. 이를 통해 프로토타입 메서드, 정적 메서드 모두 상속이 가능하다.

## 8.3 동적 상속

**extends 키워드**는 클래스뿐만 아니라 **생성자 함수**를 상속받아 클래스를 확장할 수 있다. 단, extends 키워드 앞에는 반드시 클래스가 와야 한다.

```jsx
// 생성자 함수
function Base(a) {
    this.a = a;
}

// 생성자 함수를 상속받는 서브클래스
class Derived extends Base {}

const derived = new Derived(1);
console.log(derived); // Derived {a: 1}
```

**extends 키워드** 다음에는 클래스뿐만이 아니라 [[Constructor]] 내부 메서드를 갖는 함수 객체로 평가될 수 있는 **모든 표현식**을 사용할 수 있다. 이를 통해 동적으로 상속받을 대상을 결정할 수 있다.

```jsx
function Base1() {}

class Base2 {}

let condition = true;

// 조건에 따라 동적으로 상속 대상을 결정하는 서브클래스
class Derived extends (condition ? Base1 : Base2) {}

const derived = new Derived();
console.log(derived); // Derived {}

console.log(derived instanceof Base1); // true
console.log(derived instanceof Base2); // false
```

## 8.4 서브클래스의 constructor

**클래스에서 constructor를 생략하면** 비어 있는 constructor가 암묵적으로 정의된다.

```jsx
constructor() {}
```

**서브 클래스에서 constructor를 생략하면** 다음과 같은 constructor가 암묵적으로 정의된다.

```jsx
constructor(...args) { super(...args); }
```

-   **args**는 new 연산자와 함께 클래스를 호출할 때 전달한 **인수의 리스트**다.
-   **super()** 는 수퍼클래스의 constructor를 호출하여 인스턴스를 생성한다.

<br/>

**수퍼클래스와 서브클래스 모두 constructor를 생략하면** 암묵적으로 constructor가 정의되고 **빈 객체가 생성**된다. 프로퍼티를 소유하는 인스턴스를 생성하려면 constructor 내부에 인스턴스 프로퍼티를 추가해야 한다.

```jsx
// 수퍼클래스
class Base {
    constructor() {}
}

// 서브클래스
class Derived extends Base {
    constructor(...args) {
        super(...args);
    }
}

const derived = new Derived();
console.log(derived); // Derived {}
```

<br/><br/>

---

<br/>

## 📗 참고

-   자바스크립트 deep dive
