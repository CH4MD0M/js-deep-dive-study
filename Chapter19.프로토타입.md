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

### 📢 결론

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
