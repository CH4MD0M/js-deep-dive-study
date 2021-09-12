📌 _**실행 컨텍스트(execution context)는 scope, hoisting, function, this, closure 등의 동작 원리를 담고 있는 자바스크립트의 핵심 원리이다.**_

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

### ✔️ 소스코드 평가 과정

-   실행 컨텍스트를 생성한다.
-   변수, 함수 등의 선언문만 먼저 실행하여 생성된 변수나 함수 식별자를 키로 실행 컨텍스트가 관리하는 **스코프(렉시컬 스코프의 환경 레코드)** 에 등록한다.

📌 _**소스 코드의 평가 과정이 끝나면 선언문을 제외한 소스코드가 순차적으로 실행된다(런타임이 시작된다).**_

### ✔️ 소스코드 실행 과정

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

### ✔️ Environment Record(환경 레코드)

-   스코프에 포함된 식별자를 등록하고 식별자에 바인딩된 값을 관리하는 저장소다.
-   환경 레코드는 **소스코드의 타입에 따라** 관리하는 내용에 차이가 있다.

### ✔️ Outer Lexical Environment Reference(외부 렉시컬 환경에 대한 참조)

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

<br/>

### 1. 전역 실행 컨텍스트 생성

먼저 비어있는 **전역 실행 컨텍스트(Global Execution Context)** 를 생성하여 **실행 컨텍스트 스택(Execution Context Stack)** 에 푸시한다.

<p align="center">
<img width="25%" src="https://user-images.githubusercontent.com/54847910/132869709-0461bedb-a301-4981-8880-66594f57b7c1.png">
</p>

### 2. 전역 렉시컬 환경 생성

**전역 렉시컬 환경(Global Lexical Environment)** 을 생성하고 **전역 실행 컨텍스트(Global Execution Context)** 에 바인딩한다.

<p align="center">
<img width="50%" src="https://user-images.githubusercontent.com/54847910/132869792-97975631-f961-4ad1-b658-06ef07644eaf.png">
</p>

<br/>

#### 2.1. 전역 환경 레코드 생성

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

#### 2.1.1. 객체 환경 레코드 생성

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
<img width="100%" src="https://user-images.githubusercontent.com/54847910/132869928-362003c1-9c2b-4156-ad47-bf89ddb3fe2b.png">
</p>

📌 _**변수선언문**은 BindingObject를 통해 암묵적으로 **undefined**를 바인딩하지만, **함수선언문**은 생성된 함수 객체를 즉시 할당한다._

-   변수 호이스팅과 함수 호이스팅의 차이가 이로 인해 발생한다. 함수 선언문으로 정의한 삼수는 함수 선언문 이전에 호출 할 수 있다.

<br/>

#### 2.1.2. 선언적 환경 레코드 생성

**선언적 환경 레코드(Declarative Environment Record)** 는 let, const 키워드로 선언한역 변수가 등록되고 관리된다.

let, const 키워드로 선언한 변수는 런타임에 컨트롤이 변수 선언문에 도달하기 전까지 **일시적 사각지대**에 빠지기 때문에 참조할 수 없다.

<p align="center">
<img width="100%" src="https://user-images.githubusercontent.com/54847910/132870013-063c2584-837c-4f5c-adf4-d72e3d65dd8b.png">
</p>

<br/>

#### 2.2. this 바인딩

**전역 환경 레코드(Global Environment Record)** 의 **[[GlobalThisValue]] 내부 슬롯**에 this가 바인딩된다.

📌 _this 바인딩은 **환경 레코드(전역 환경 레코드, 함수 환경 레코드)** 에만 존재한다._

<p align="center">
<img width="100%" src="https://user-images.githubusercontent.com/54847910/132870210-34125100-245c-45c6-86ee-cebb2acb4f67.png">
</p>

<br/>

#### 2.3. 외부 렉시컬 환경에 대한 참조 결정

**외부 렉시컬 환경에 대한 참조(OuterLexicalEnvironment Reference)** 는 현재 평가 중인 소스코드를 포함하는 외부 소스코드의 **렉시컬 환경(상위 스코프)** 를 가리킨다.

-   이를 통해 단방향 링크드 리스트인 **스코프 체인**을 구현한다.

전역 코드를 포함하는 소스코드는 없으므로 전역 렉시컬 환경의 외부 렉시컬 환경에 대한 참조에 **null**이 할당된다.

-   전역 렉시컬 환경이 스코프 체인이 종점에 존재함을 의미한다.

<p align="center">
<img width="100%" src="https://user-images.githubusercontent.com/54847910/132870309-8ef8df85-10d8-4537-b828-2f6a462f9e6a.png">
</p>

<br/>

## 6.3 전역 코드 실행

변수 할당문이 실행되어 전역 변수 x, y에 값이 할당된다. 그리고 foo함수가 호출된다.

<p align="center">
<img width="100%" src="https://user-images.githubusercontent.com/54847910/132939506-2983ac07-9397-4261-9828-352e5d926dfd.png">
</p>
<br/>

### ✏️ 식별자 결정

변수 할당문 또는 함수 호출문을 실행하려면 먼저 변수 또는 함수 이름이 **선언된 식별자인지 확인**해야 한다. 선언되지 않는 식별자는 참조할 수 없으므로 할당이나 호출도 할 수 없기 때문이다.

동일한 이름의 식별자가 다른 스코프에도 여러개 존재할 수 있다. 따라서 **어느 스코프의 식별자인지**를 판별하고 결정할 필요가 있는데 이를 **식별자 결정(identifier resolution)** 이라고 한다.

📌 **_이것이 스코프 체인의 동작 원리다._**

<br/>

## 6.4 foo 함수 코드 평가

현재 상황은 foo **함수를 호출하기 직전**이다. foo 함수가 호출되면 전역 코드의 실행을 일시 중단하고 foo 함수 내부로 코드의 **제어권이 이동**한다. 그리고 함수 코드를 평가하기 시작한다.

1. 함수 실행 컨텍스트 생성
2. 함수 렉시컬 환경 생성
    1. 함수 환경 레코드 생성
    2. this 바인딩
    3. 외부 렉시컬 환경에 대한 참조 결정

<br/>

### 1. 함수 실행 컨텍스트 생성

foo **함수 실행 컨텍스트(Function Execution Context)** 를 생성한다.

📌 _생성된 **함수 실행 컨텍스트(Function Execution Context)** 는 **함수 렉시컬 환경(Function Lexical Emvironment)** 이 완성된 다음 **실행 컨텍스트 스택(Execution Context Stack)** 에 푸시된다._

-   이때 foo 함수 실행 컨텍스트는 실행 컨텍스트 스탱의 최상위, 즉 **실행 중인 실행 컨텍스트(running execution context)** 가 된다.

<p align="center">
<img width="25%" src="https://user-images.githubusercontent.com/54847910/132939523-104e4821-da01-4780-a575-7c858664cc21.png">
</p>

<br/>

### 2. 함수 렉시컬 환경 생성

foo **함수 렉시컬 환경(Function Lexical Environment)** 을 생성하고 foo **함수 실행 컨텍스트(Function Execution Context)** 에 바인딩한다.

-   렉시컬 환경은 환경 레코드와 외부 렉시컬에 대한 참조로 구성된다.

<p align="center">
<img width="50%" src="https://user-images.githubusercontent.com/54847910/132939573-a8c0f010-536c-486d-abaf-a217f7b3be4a.png">
</p>

<br/>

#### 2.1 함수 환경 레코드 생성

**함수 환경 레코드(Function Environment Record)** 는 매개변수, arguments 객체, 함수 내부에서 선언한 지역 변수와 중첩 함수를 등록하고 관리한다.

<p align="center">
<img width="100%" src="https://user-images.githubusercontent.com/54847910/132939588-5f857ba1-465a-47d6-9a61-dd4ef830c915.png">
</p>

<br/>

#### 2.2 this 바인딩

**함수 환경 레코드(Function Environment Record)** 의 **[[ThisValue]] 내부 슬롯**에 this가 바인딩된다.

-   [[ThisValue]] 내부 슬롯에 바인딩될 객체는 함수 호출 방식에 따라 결정된다.
-   foo 함수는 일반 함수로 호출되었으므로 this는 전역 객체를 가리킨다. 따라서 함수 환경 레코드의 [[ThisValue]] 내부 슬롯에는 전역 객체가 바인딩 된다.

📌 _함수 내부에서 this를 참조하면 함수 환경 레코드(Function Environment Record)의 **[[ThisValue]] 내부 슬롯에 바인딩되어 있는 객체**가 반환된다._

<p align="center">
<img width="100%" src="https://user-images.githubusercontent.com/54847910/132939608-2ce49a90-b263-4178-9b32-d7afc670e43e.png">
</p>

<br/>

#### 2.3 외부 렉시컬 환경에 대한 참조 결정 ⭐

📌 _**외부 렉시컬 환경에 대한 참조 결정(Outer Lexical Environment Reference)은 현재 호출된 함수가 선언될 당시의 렉시컬 환경(Lexical Environment)를 참조한다.**_

-   foo 함수는 전역 코드에 정의된 전역 함수다.
-   foo 함수 정의는 전역 코드 평가 시점에 평가된다.
-   이 시점의 실행 중인 실행 컨텍스트는 **전역 실행 컨텍스트(Global Execution Context)** 다.

따라서 **외부 렉시컬 환경에 대한 참조(Outer Lexical Environment Reference)** 에는 **전역 렉시컬 환경(Global Lexical Environment)** 이 할당된다.

<p align="center">
<img width="100%" src="https://user-images.githubusercontent.com/54847910/132939624-f1fef5d6-9b41-41cc-b727-be58c3e0696a.png">
</p>

자바스크립트 엔진은 함수 정의를 평가하여 함수 객체를 생성할 때 함수의 상위 스코프를 함수 객체의 내부 슬롯 [[Environment]]에 저장한다.

함수 렉시컬 환경의 외부 렉시컬 환경에 대한 첨조에 할당되느느것은 바로 함수의 상위 스코프를 가리키는 함수 객체의 내부 슬로 [[Environment]]에 저장된 렉시컬 환경의 참조다.

📌 **_함수 객체의 내부 슬롯 [[Environment]]가 바로 렉시컬 스코프를 구현하는 메커니즘이다._**

<br/>

## 6.5 foo 함수 코드 실행

<p align="center">
<img width="100%" src="https://user-images.githubusercontent.com/54847910/132991459-b7ee4e99-79b6-498b-a6f2-5c11d8470664.png">
</p>

매개변수에 인수가 할당되고, 변수 할당문이 실행되어 지역 변수 x, y에 값이 할당된다. 그리고 **bar함수가 호출**된다.

-   이때 식별자 결정을 위해 실행 중인 실행 컨텍스트의 렉시컬 환경에서 식별자를 검색하기 시작한다.
-   만약 실행 중인 실행 컨텍스트의 렉시컬 환경에서 식별자를 검색할 수 없으면 외부 렉시컬 환경에 대한 참조가 가리키는 렉시컬 환경으로 이동하여 식별자를 검색한다.

<br/>

## 6.6 bar 함수 코드 평가

bar 함수가 호출되면 bar 함수 내부로 코드의 제어권이 이동한다. 실행 컨텍스트와 렉시컬 환경의 생성 과정은 foo 함수와 동일하다.

<p align="center">
<img width="100%" src="https://user-images.githubusercontent.com/54847910/132991478-ce05d557-7ee2-4674-ad54-e1aa72d6fb44.png">
</p>

<br/>

## 6.7 bar 함수 코드 실행

런타임이 시작되어 bar 함수의 소스코드가 순차적으로 실행되기 시작한다. 매개변수에 인수가 할당되고, 변수 할당문이 실행되어 지역 변수 z에 값이 할당된다.

<p align="center">
<img width="100%" src="https://user-images.githubusercontent.com/54847910/132991491-5ec457b0-7d8b-496b-ab04-92c227ea810a.png">
</p>

<br/>

## 6.8 bar함수 코드 실행 종료

console.log 메서드가 호출되고 종료도면 더는 실행할 코드가 없으므로 bar 함수 코드의 실행이 종료된다.

bar 함수의 실행 컨텍스트가 실행 컨텍스트 스택에서 **팝(pop)** 되고, 함수 foo의 실행 컨텍스트가 **실행중인 컨텍스트(최상위 컨텍스트)** 가 된다.

<br/>

## 6.9 foo함수 코드 실행 종료

bar 함수가 종료되면 더는 실행할 코드가 없으므로 foo 함수 코드의 실행이 종료된다.

foo 함수의 실행 컨텍스트가 실행 컨텍스트 스택에서 **팝(pop)** 되고, 전역 실행 컨텍스트가 **실행중인 컨텍스트(최상위 컨텍스트)** 가 된다.

<br/>

## 6.10 전역 코드 실행 종료

foo 함수가 종료되면 더는 실행할 전역 코드가 없으므로 전역 코드의 실행이 종료되고 전역 실행 컨텍스트가 실행 컨텍스트 스택에서 팝(pop)된다.

<br/><br/>

# 7. 실행 컨텍스트와 블록 레벨 스코프

```jsx
let x = 1;
if (true) {
    let x = 10;
    console.log(x); // 10
}

console.log(x); // 1
```

if 문의 코드 블록이 실행되면 if 문의 코드 블록을 위한 **블록 레벨 스코프(block-level scope)**를 생성해야 한다.

이를 위해 **선언적 환경 레코드(Declarative Environment Record)** 를 갖는 **렉시컬 환경(Lexical Environment)** 을 새롭게 생성하여 기존의 전역 렉시컬 환경을 교체한다.

if 문의 코드 블록을 위한 렉시컬 환경의 **외부 렉시컬 환경에 대한 참조(Outer Lexical Environment Reference)** 는 if문이 실행되기 이전의 전역 렉시컬 환경(Global Lexical Environment)을 가리킨다.

<p align="center">
<img width="100%" src="https://user-images.githubusercontent.com/54847910/132991350-6551d4c9-9da7-4777-bcae-be4803bd7f6f.png">
</p>

if 문 코드 블록의 실행이 종료되면 if 뭄의 코드 블록이 실행되기 이전의 렉시컬 환경으로 되돌린다.

<p align="center">
<img width="100%" src="https://user-images.githubusercontent.com/54847910/132991363-99d42a3c-91c0-4de7-8fed-1cd69df7af42.png">
</p>

<br/><br/>

---

<br/>

## 📗 참고

-   자바스크립트 deep dive
