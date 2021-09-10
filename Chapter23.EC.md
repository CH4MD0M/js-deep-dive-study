📌 **_실행 컨텍스트(execution context)는 scope, hoisting, function, this, closure 등의 동작 원리를 담고 있는 자바스크립트의 핵심 원리이다._**

# 1. 소스코드의 타입

ECMAScript 사양은 소스코드를 4가지 타입으로 구분한다.

-   전역 코드(global code)
-   함수 코드(function code)
-   eval 코드(eval code)
-   모듈 코드(module code)

소스코드를 4가지 타입으로 구분하는 이유는 **소스코드 타입에 따라** 실행 컨텍스트를 생성하는 과정과 관리 내용이 다르기 때문이다.

<br/><br/>

# 2. 소스코드의 평가와 실행

📌 _자바스크립트 엔진은 소스코드를 **"소스코드의 평가"** 와 **"소스코드의 실행"** 2개의 과정으로 나누어 처리한다._

### ✔️ **소스코드 평가 과정**

-   실행 컨텍스트를 생성한다.
-   변수, 함수 등의 선언문만 먼저 실행하여 생성된 변수나 함수 식별자를 키로 실행 컨텍스트가 관리하는 **스코프(렉시컬 스코프의 환경 레코드)** 에 등록한다.

📌 _**소스 코드의 평가 과정이 끝나면 선언문을 제외한 소스코드가 순차적으로 실행된다(런타임이 시작된다).**_

### ✔️ **소스코드 실행 과정**

-   변수나 함수의 참조를 실행 컨텍스트가 관리하는 스코프에서 검색해서 취득한다.
-   변수 값의 변경 등 소스코드의 실행 결과는 다시 실행 컨텍스트가 관리하는 스코프에 등록된다.

<p align="center">
<img width="70%" src="https://user-images.githubusercontent.com/54847910/132620775-d652c5eb-ff03-4747-8565-ec946f4bfee1.png">
</p>

```jsx
var x;
x = 1;
```

1. **(평가 과정)** 변수 식별자 x는 실행 컨텍스트가 관리하는 스코프에 등록되고 **undefined로 초기화**된다.
2. **(실행 과정)** var x;는 평가 과정에서 실행이 완료되었으므로 실행 과정에서는 **변수 할당문 x = 1;만** 실행된다.

-   이때 실행 컨텍스트가 관리하는 스코프에 x 변수가 등록되었는지 확인한다.
-   x 변수가 선언된 변수라면 값을 할당하고 할당 결과를 실행 컨텍스트에 등록하여 관리한다.

<br/><br/>

# 3. 실행 컨텍스트의 역할

📌 **_코드가 실행되려면 다음과 같이 스코프, 식별자, 코드 실행 순서 등의 관리가 필요하다._**

-   모든 식별자(변수, 함수, 클래스 등)를 **스코프를 구분하여 등록**하고 **상태 변화**를 지속적으로 관리할 수 있어야 한다.
-   **스코프 체인**을 통해 상위 스코프로 이동하며 식별자를 검색할 수 있어야 한다.
-   현재 실행 중인 **코드의 실행 순서**를 변경할 수 있어야 하며 다시 되돌아갈 수도 있어야 한다.

<br/>

실행 컨텍스트는 소스코드를 실행하는 데 필요한 환경을 제공하고 코드의 실행 결과를 실제로 관리하는 영역이다.

실행 컨텍스트는 식별자(변수, 함수, 클래스 등)를 등록하고 관리하는 스코프와 코드 실행 순서 관리를 구현하는 내부 메커니즘으로, **_모든 코드는 실행 컨텍스트를 통해 실행되고 관리된다._**

**코드 실행 순서**는 **Execution Context Stack(실행 컨텍스트 스택)** 으로 관리하고 **식별자와 스코프**는 실행 컨텍스트의 **Lexical Environment(렉시컬 환경)** 으로 관리한다.

<br/><br/>

# 4. 실행 컨텍스트 스택(Execution Context Stack)

자바스크립트 엔진은 코드를 평가하여 실행 컨텍스트를 생성한다. 그리고 함수가 호출되면 함수 코드를 평가하여 함수 실행 컨텍스트를 생성한다.

이때 생성된 실행 컨텍스트는 **스택(stack) 자료구조**로 관리된다. 이를 **실행 컨텍스트 스택**이라 한다.

**실행 컨텍스트 스택(Execution Context Stack)** 은 **코드의 실행 순서**를 관리한다.

실행 컨텍스트 스택의 **최상위에 존재하는 실행 컨텍스트**는 언제나 **현재 실행 중인 코드의 실행 컨텍스트**이다.<br/>
따라서 실행 컨텍스트의 최상위에 존재하는 실행 컨텍스트를 **실행 중인 실행 컨텍스트(running execution context)** 라고 부른다.

<br/><br/>

# 5. 렉시컬 환경(Lexical Environment)

**렉시컬 환경(Lexical Environment)** 은 **식별자**와 **식별자에 바인딩된 값**, 그리고 **상위 스코프에 대한 참조를 기록**하는 자료구조로 실행 컨텍스트를 구성하는 컴포넌트다.

<br/>

📌 _**렉시컬 환경(Lexical Environment)은 스코프를 구분하여 식별자를 등록하고 관리하는 저장소 역할을 하는 렉시컬 스코프의 실체다.**_

**Execution Context(실행 컨텍스트)** 는 **Lexical Environment 컴포넌트**와 **Variable Environment컴포넌트**로 구성된다.

<p align="center">
<img width="60%" src="https://user-images.githubusercontent.com/54847910/132620026-694c86c5-5548-45de-9092-62bfb4373cea.png">
</p>

**Lexical Environment(렉시컬 환경)** 은 **Environment Record**와 **Outer Lexical Environment Reference**로 구성된다.

<p align="center">
<img width="30%" src="https://user-images.githubusercontent.com/54847910/132620055-990dd1ed-52b1-4921-be0b-1c3e84843423.png">
</p>

### ✔️ **Environment Record(환경 레코드)**

-   스코프에 포함된 식별자를 등록하고 식별자에 바인딩된 값을 관리하는 저장소다.
-   환경 레코드는 **소스코드의 타입에 따라** 관리하는 내용에 차이가 있다.

### ✔️ **Outer Lexical Environment Reference(외부 렉시컬 환경에 대한 참조)**

-   상위 스코프를 가리킨다.
-   외부 렉시컬 환경에 대한 참조를 통해 단방향 링크드 리스트인 **스코프 체인(scope chain)** 을 구현한다.

<br/><br/>

# 6. 실행 컨텍스트의 생성과 식별자 검색 과정

```jsx
var x = 1;
const y = 2;

function foo(a) {
    var x = 3;
    const y = 4;

    function bar(b) {
        const z = 5;
        console.log(a + b + x + y + z);
    }
    bar(10);
}

foo(20); // 42
```

## 6.1 전역 객체 생성

전역 객체는 전역 코드가 평가되기 이전에 생성된다.

-   전역 객체에는 빌트인 전역 프로퍼티와 빌트인 전역함수, 그리고 표준 빌트인 객체가 추가되며 호스트 객체를 포함한다.

전역 객체도 Object.prototype을 상속받는다. 즉, 전역 객체도 프로토타입 체인의 일원이다.

## 6.2 전역 코드 평가

소스코드가 로드되면 자바스크립트 엔진은 전역 코드를 평가한다.

1. **전역 실행 컨텍스트 생성**
2. **전역 렉시컬 환경 생서**
    1. **전역 환경 레코드 생성**
        1. 객체 환경 레코드 생성
        2. 선언적 환경 레코드 생성
    2. **this 바인딩**
    3. **외부 렉시컬 환경에 대한 참조 결정**

### **1. 전역 실행 컨텍스트 생성**

먼저 비어있는 **전역 실행 컨텍스트(Global Execution Context)** 를 생성하여 **실행 컨텍스트 스택(Execution Context Stack)** 에 푸시한다.

<p align="center">
<img width="30%" src="https://user-images.githubusercontent.com/54847910/132869709-0461bedb-a301-4981-8880-66594f57b7c1.png">
</p>

<br/>

### **2. 전역 렉시컬 환경 생성**

**전역 렉시컬 환경(Global Lexical Environment)** 을 생성하고 **전역 실행 컨텍스트(Global Execution Context)** 에 바인딩한다.

<p align="center">
<img width="60%" src="https://user-images.githubusercontent.com/54847910/132869792-97975631-f961-4ad1-b658-06ef07644eaf.png">
</p>

<br/>

#### **2.1. 전역 환경 레코드 생성**

**전역 환경 레코드(Global Environment Record)** 는 전역 변수를 관리하는 **전역 스코프**, 전역 객체의 **빌트인 전역 프로퍼티**와 **빌트인 전역 함수**, **표준 빌트인 객체**를 제공한다.

<br/>

📌 _전역 환경 레코드(Global Environment Record)는 **객체 환경 레코드(Object Environment Record)** 와 **선언적 환경 레코드(Declarative Environment Record)** 로 구성되어 있다._

-   ES6의 let, const 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 되지 않고 **개념적인 블록(선언적 환경 레코드)** 내에 존재하게 된다.
-   따라서 var키워드로 선언한 변수와 let, const로 선언한 변수를 나누어 관리하기 위해 **전역 환경 레코드**는 객체 환경 레코드와 선언적 환경 레코드로 구성된다.

<br/>

✔️ **객체 환경 레코드(Object Environment Record)**

-   var 키워드로 선언한 전역 변수와 함수 선언문으로 정의한 전역 함수, 빌트인 전역 프로퍼티와 전역함수, 표준 빌트인 객체를 관리한다.

✔️ **선언적 환경 레코드(Declarative Environment Record)**

-   let, const 키워드로 선언한 전역 변수를 관리한다.

<br/>

##### **2.1.1. 객체 환경 레코드 생성**

**객체 환경 레코드(Object Environment Record)** 는 **BindingObject**라고 부르는 객체와 연결된다.

-   **BindingObject**는 "전역 객체 생성"에서 생성된 **전역 객체**다.

var 키워드로 선언한 **전역 변수**와 함수 선언문으로 정의된 **전역 함수**는 **BindingObject를 통해 전역 객체의 프로퍼티와 메서드가 된다.**

```jsx
var x = 1;
const y = 2;

function foo(a) {
...
```

<p align="center">
<img width="70%" src="https://user-images.githubusercontent.com/54847910/132869928-362003c1-9c2b-4156-ad47-bf89ddb3fe2b.png">
</p>

📌 _**변수선언문**은 BindingObject를 통해 암묵적으로 **undefined**를 바인딩하지만, **함수선언문**은 생성된 함수 객체를 즉시 할당한다._

-   변수 호이스팅과 함수 호이스팅의 차이가 이로 인해 발생한다. 함수 선언문으로 정의한 삼수는 함수 선언문 이전에 호출 할 수 있다.

<br/>

##### **2.1.2. 선언적 환경 레코드 생성**

**선언적 환경 레코드(Declarative Environment Record)** 는 let, const 키워드로 선언한역 변수가 등록되고 관리된다.

let, const 키워드로 선언한 변수는 런타임에 컨트롤이 변수 선언문에 도달하기 전까지 **일시적 사각지대**에 빠지기 때문에 참조할 수 없다.

<p align="center">
<img width="70%" src="https://user-images.githubusercontent.com/54847910/132870013-063c2584-837c-4f5c-adf4-d72e3d65dd8b.png">
</p>

<br/>

#### 2.2. **this 바인딩**

**전역 환경 레코드(Global Environment Record)** 의 **[[GlobalThisValue]] 내부 슬롯**에 this가 바인딩된다.

📌 _this 바인딩은 **환경 레코드(전역 환경 레코드, 함수 환경 레코드)** 에만 존재한다._

<p align="center">
<img width="70%" src="https://user-images.githubusercontent.com/54847910/132870210-34125100-245c-45c6-86ee-cebb2acb4f67.png">
</p>

<br/>

#### 2.3. **외부 렉시컬 환경에 대한 참조 결정**

**외부 렉시컬 환경에 대한 참조(OuterLexicalEnvironment Reference)** 는 현재 평가 중인 소스코드를 포함하는 외부 소스코드의 **렉시컬 환경(상위 스코프)** 를 가리킨다.

-   이를 통해 단방향 링크드 리스트인 **스코프 체인**을 구현한다.

전역 코드를 포함하는 소스코드는 없으므로 전역 렉시컬 환경의 외부 렉시컬 환경에 대한 참조에 **null**이 할당된다.

-   전역 렉시컬 환경이 스코프 체인이 종점에 존재함을 의미한다.

<p align="center">
<img width="70%" src="https://user-images.githubusercontent.com/54847910/132870309-8ef8df85-10d8-4537-b828-2f6a462f9e6a.png">
</p>

<br/><br/>

---

<br/>

## 📗 참고

-   자바스크립트 deep dive
