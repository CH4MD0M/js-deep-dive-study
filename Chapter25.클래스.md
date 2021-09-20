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

<br/><br/>

---

<br/>

## 📗 참고

-   자바스크립트 deep dive
