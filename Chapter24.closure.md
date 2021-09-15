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

<br/><br/>

---

<br/>

## 📗 참고

-   자바스크립트 deep dive
