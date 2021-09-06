# 1. strict mode란?

**strict mode**는 자바스크립트 언어의 문법을 좀 더 엄격히 적용하여 **오류를 발생시킬 가능성이 높거나 자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드**에 대해 **명시적인 에러를 발생시킨다.**

ES6에서 도입된 클래스와 모듈은 기본적으로 strict mode가 적용된다.

### ✏️ 암묵적 전역(implicit global)

```jsx
function foo() {
    x = 10;
}
foo();

console.log(x);
```

위 코드는 에러가 발생되지 않는다.

자바스크립트 엔진은 **암묵적으로** 전역 객테에 x 프로퍼티를 **동적 생성**한다. 이때 전역 객체의 x프로퍼티는 마치 전역 변수처럼 사용할 수 있다. 이런 현상을 **암묵적 전역**이라 한다.

<br/><br/>

# 2. strict mode의 적용

**전역의 선두 또는 함수 몸체의 선두**에 **'use strict';**를 추가한다.

```jsx
"use strict";
function foo() {
    x = 10;
}
foo();
```

**함수 몸체의 선두에 추가하면** 해당 함수와 중첩 함수에 strict mode가 적용된다.

```jsx
function foo() {
    "use strict";

    x = 10;
}
foo();
```

**코드의 선두에 위치시키지 않으면** strict mode가 제대로 동작하지 않는다.

```jsx
function foo() {
    x = 10;
    ("use strict");
}
foo();
```

<br/><br/>

# 3. 전역에 strict mode를 적용하는 것은 피하자

strict mode는 **스크립트 단위**로 적용된다.

-   html에서 `<script>`태그를 사용할 때 strict mode는 스크립트 단위로 적용되기 때문에 다른 스크립트에는 영향을 주지 않고 해당 스크립트에만 한정되어 적용된다.

strict mode 스크립트와 non-strict mode 스크립트를 혼용하는 것은 오류를 발생시킬 수 있다.

-   **서드 파티 라이브러리**를 사용하는 경우 라이브러리가 non-strict mode인 경우도 있기 때문에 즉시실행함수로 스크립트 전체를 감싸서 사용하는 것이 바람직하다.

```jsx
(function () {
    "use strict";

    // code...
})();
```

<br/><br/>

# 4. 함수 단위로 strict mode를 적용하는 것도 피하자

strict mode가 적용된 함수가 참조할 함수 외부의 컨텍스트에 strict mode를 적용하지 않으면 문제가 발생할 수 있다. 그리고 함수에 일일이 strict mode를 적용하는 것은 번거로운 일이기도 하다.

```jsx
(function () {
    // non-strict mode
    var let = 10;

    function foo() {
        "use strict";

        let = 20; // SyntaxError: Unexpected strict mode reserved word
    }
    foo();
})();
```

**📌** _strict mode는 즉시 실행 함수(IIFE)로 감싼 스크립트 단위로 적용하는 것이 바람직하다._

<br/><br/>

# 5. strict mode가 발생시키는 에러

## 5.1 암묵적 전역

**선언하지 않은 변수를 참조**하면 ReferenceError가 발생한다.

```jsx
(function () {
    "use strict";

    x = 10;
    console.log(x); // ReferenceError: x is not defied
})();
```

## 5.2 변수, 함수, 매개변수의 삭제

**delete 연산자**로 변수, 함수, 매개변수를 삭제하면 SyntaxError가 발생하다.

```jsx
(function() {
		'use strict';

		var x = 10;
		delete x;
		// SyntaxError: Delete of an unqualified identifier in strict mode.

		function foo(a){
				delete a;
				// SyntaxError: Delete of an unqualified identifier in strict mode.
		}
		delete foo;
		// SyntaxError: Delete of an unqualified identifier in strict mode.
}());
```

## 5.3 매개변수 이름의 중복

**중복된 매개변수 이름**을 사용하면 SyntaxError가 발생한다.

```jsx
(function () {
    "use strict";

    // SyntaxError: Duplicate parameter name not allowed in this context
    function foo(x, x) {
        console.log(x);
    }
})();
```

<br/><br/>

# 6. strict mode 적용에 의한 변화

## 6.1 일반 함수의 this

strict mode에서 함수를 일반 함수로서 호출하면 **this에 undefined가 바인딩**된다.

-   생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요가 없기 때문이다.

```jsx
(function () {
    "use strict";

    function foo() {
        console.log(this); // undefined
    }
    foo();

    function Foo() {
        console.log(this); // Foo
    }
    new Foo();
})();
```

## 6.2 arguments 객체

strict mode에서는 **매개변수에 전달된 인수를 재할당**하여 변경해도 arguments 객체에 반영되지 않는다.

```jsx
(function (a) {
    "use strict";
    // 매개변수에 전달된 인수를 재할당하여 변경
    a = 2;

    // 변경된 인수가 arguments 객체에 반영되지 않는다.
    console.log(arguments); // {0: 1, length: 1}
})(1);
```
