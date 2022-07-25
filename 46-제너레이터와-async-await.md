# 제너레이터란?

ES6에서 도입된 **제너레이터(generator)** 는 코드 블록의 실행을 일시 중지 했다가 필요한 시점에 재개할 수 있는 특수한 함수다.
<br/>

### 일반 함수와 제너레이터의 차이점

**제너레이터 함수는 함수 호출자에게 함수 실행의 제어권을 양도할 수 있다.**

-   일반 함수를 호출하면 제어권이 함수에게 넘어가고 함수 코드를 일괄 실행한다. 즉 함수 함수 호출자(caller)는 함수를 호출한 이후 함수 실행을 제어할 수 없다.
-   제너레이터 함수는 함수 실행을 함수 호출자가 제어할 수 있다. 즉, **함수의 제어권을 함수가 독점하는 것이 아니라 함수 호출자에게 양도(yield)할 수 있다.**

<br/>

**제너레이터 함수는 함수 호출자와 함수의 상태를 주고 받을 수 있다.**

-   일반 함수는 함수가 실행되고 있는 동안에는 함수 외부에서 함수 내부로 값을 전달하여 함수의 상태를 변경할 수 없다.
-   **제너레이터 함수는 함수 호출자에게 상태를 전달할 수 있고, 함수 호출자로부터 상태를 전달받을 수도 있다.**

<br/>

**제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.**

-   제너레이터 함수를 호출하면 함수 코드를 실행하는 것이 아니라 이터러블이면서 이터레이터인 제너레이터 객체를 반환한다.

<br/><br/>

# 제너레이터 함수의 정의

제너레이터 함수는 `function*` 키워드로 선언한다. 그리고 하나 이상의 `yield` 표현식을 포함한다.

```jsx
// 제너레이터 함수 선언문
function* genDecFunc() {
    yield 1;
}

// 제너레이터 함수 표현식
const genExpFunc = function* () {
    yield 1;
};

// 제너레이터 메서드
const obj = {
    *genObjMethod() {
        yield 1;
    },
};

// 제너레이터 클래스 메서드
class MyClass {
    *genClsMethod() {
        yield 1;
    }
}
```

> **애스터리스크(\*)** 의 위치는 `function` 키워드와 함수 이름 사이라면 어디든지 상관 없다. 하지말 일관성을 유지하기 위해 `function` 키워드 바로 뒤에 붙이는 것을 권장한다.

<br/>

제너레이터 함수는 화살표 함수로 정의할 수 없다.

```jsx
const genArrowFunc = *() => {
    yield 1;
}; // SyntaxError: Unexpected token '*'
```

<br/>

제너레이터 함수는 `new` 연산자와 함께 생성자 함수로 호출할 수 없다.

```jsx
function* genFunc() {
    yield 1;
}

new genFunc(); // TypeError: genFunc is not a constructor
```

<br/><br/>

# 제너레이터 객체

제너레이터 함수를 호출하면 제너레이터 객체를 생성해 반환한다. 제너레이터 함수가 반환한 제너레이터 객체는 이터러블(Iterable)이면서 이터레이터(iterator)다.

```jsx
function* genFunc() {
    yield 1;
    yield 2;
    yield 3;
}

// 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
const generator = genFunc();

// 이터러블은 Symbol.iterator 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 객체다.
console.log(Symbol.iterator in generator); // true
// 이터레이터는 next 메서드를 갖는다.
console.log("next" in generator); // true
```

제너레이터 객체는 이터레이터에는 없는 `return`, `throw` 메서드를 갖는다.

<br/>

### next

`next` 메서드를 호출하면 제너레이터 함수의 **yield 표현식까지** 코드 블록을 실행하고 **yield된 값**을 `value` 프로퍼퍼티 값으로, `false`를 `done` 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.

```jsx
function* genFunc() {
    try {
        yield 1;
        yield 2;
        yield 3;
    } catch (e) {
        console.error(e);
    }
}

const generator = genFunc();

console.log(generator.next()); // {value: 1, done: false}
```

<br/>

### return

`return` 메서드를 호출하면 인수로 **전달받은 값**을 `value` 프로퍼티 값으로, `true`를 `done` 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.

```jsx
function* genFunc() {
    try {
        yield 1;
        yield 2;
        yield 3;
    } catch (e) {
        console.error(e);
    }
}

const generator = genFunc();

console.log(generator.return("End!")); // {value: "End!", done: true}
```

<br/>

### throw

`throw` 메서드를 호출하면 인수로 전달받은 에러를 발생시키고 `undefined`를 `value` 프로퍼티 값으로, `true`를 `done` 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.

```jsx
function* genFunc() {
    try {
        yield 1;
        yield 2;
        yield 3;
    } catch (e) {
        console.error(e);
    }
}

const generator = genFunc();

console.log(generator.throw("Error!")); // {value: undefined, done: true}
```

<br/>
<br/>

# 제너레이터의 일시 중지와 재개

제너레이터는 `yield` 키워드와 `next` 메서드를 통해 실행을 일시 중지했다가 필요한 시점에 다시 재개할 수 있다.

제너레이터 함수를 호출하면 제너레이터 함수의 코드 블록이 실행되는 것이 아니라 제너레이터 객체를 반환한다. 제너레이터 객체의 `next` 메서드를 호출하면 제너레이터 함수의 코드 블록을 실행한다. 단, **_일반 함수처럼 한 번에 모든 코드를 실행하는 것이 아니라_** `yield` **_표현식까지만 실행한다._**

`**yield**` **_키워드는 제너레이터 함수의 실행을 일시 중지시키거나_** `yield` **_키워드 뒤에 오는 표현식의 평가 결과를 제너레이터 함수 호출자에게 반환한다._**

<br/>

```jsx
function* genFunc() {
    yield 1;
    yield 2;
    yield 3;
}

// 제너레이터 함수를 호출하면 제너레이터 객체를 반환한다.
const generator = genFunc();

// 처음 next 메서드를 호출하면 첫 번째 yield 표현식까지 실행되고 일시 중지된다.
console.log(generator.next()); // {value: 1, done: false}

// 다시 next 메서드를 호출하면 두 번째 yield 표현식까지 실행되고 일시 중지된다.
console.log(generator.next()); // {value: 2, done: false}

// 다시 next 메서드를 호출하면 세 번째 yield 표현식까지 실행되고 일시 중지된다.
console.log(generator.next()); // {value: 3, done: false}

// 다시 next 메서드를 호출하면 남은 yield 표현식이 없으므로 제너레이터 함수의 마지막까지 실행한다.
console.log(generator.next()); // {value: undefined, done: true}
```

제너레이터 객체의 `next` 메서드는 `value`, `done` 프로퍼티를 갖는 **이터레이터 리절트 객체**를 반환한다.

-   `value` 프로퍼티에는 `yield` 표현식에서 `yield` 된 값이 할당되고,
-   `done` 프로퍼티에는 제너레이터 함수가 끝까지 실행되었는지를 나타내는 **불리언 값**이 할당된다.

<br/><br/>

# async/await

ES8에서는 제너레이터보다 간단하고 가독성 좋게 비동기 처리를 동기 처리처럼 동작하도록 구현할 수 있는 `async/await` 이 추가되었다.

`async/await` 은 프로미스를 기반으로 동작한다. 그리고 **프로미스의 후속 처리 메서드 없이** 동기 처리처럼 프로미스가 처리 결과를 반환하도록 구현할 수 있다.

```jsx
async function fetchTodo() {
    const url = "https://jsonplaceholder.typicode.com/todos/1";

    const response = await fetch(url);
    const todo = await response.json();
    console.log(todo);
    // {userId: 1, id: 1, title: 'delectus aut autem', completed: false}
}

fetchTodo();
```

<br/>

### async 함수

**async 함수**는 `async` 키워드를 사용해 정의하며 언제나 프로미스를 반환한다. async 함수가 명시적으로 프로미스를 반환하지 않더라도 암묵적으로 반환값을 resolve 하는 프로미스를 반환한다.

```jsx
// async 함수 선언문
async function foo(n) {
    return n;
}
foo(1).then((v) => console.log(v)); // 1

// async 함수 표현식
const bar = async function (n) {
    return n;
};
bar(2).then((v) => console.log(v)); // 2

// async 화살표 함수
const baz = async (n) => n;
baz(3).then((v) => console.log(v)); // 3

// async 메서드
const obj = {
    async foo(n) {
        return n;
    },
};
obj.foo(4).then((v) => console.log(v)); // 4

// async 클래스 메서드
class MyClass {
    async bar(n) {
        return n;
    }
}
const myClass = new MyClass();
myClass.bar(5).then((v) => console.log(v)); // 5
```

<br/>

클래스의 `constructor` 메서드는 `async` 메서드가 될 수 없다. 클래스의 `constructor` 메서드는 인스턴스를 반환해야 하지만 async 함수는 언제나 프로미스를 반환해야 한다.

```jsx
class MyClass {
    async constructor() {}
    // SyntaxError: Class constructor may not be an async method
}

const myClass = new MyClass();
```

<br/>

### await 키워드

`await` 키워드는 반드시 async 함수 내부에서 사용해야 한다.

`await` 키워드는 프로미스가 `settled` 상태가 되면 프로미스가 resolve 한 결과를 반환한다. `await` 키워드는 반드시 프로미스 앞에서 사용해야 한다.

<br/>

```jsx
const getGithubUserName = async (id) => {
    const res = await fetch(`https://api.github.com/users/${id}`); // ①
    const { name } = await res.json(); // ②
    console.log(name); // Kihoon Roh
};

getGithubUserName("ch4md0m");
```

`await` 키워드는 프로미스가 `settled` 상태가 될 때까지 대기한다. 따라서 ①의 fetch 함수가 수행한 HTTP 요청에 대한 응답이 도착할 때까지 ①은 대기하게 된다. 이후 프로미스가 `settled` 상태가 되면 프로미스가 resolve한 처리 결과가 res 변수에 할당된다.

<br/>

### 에러 처리

`async/await` 에서 에러 처리는 `try…catch` 문을 사용할 수 있다. 콜백 함수를 인수로 전달받는 비동기 함수와는 달리 프로미스를 반환하는 비동기 함수는 명시적으로 호출할 수 있기 때문에 호출자가 명확하다.

```jsx
const foo = async () => {
    try {
        const wrongUrl = "https://wrong.url";
        const response = await fetch(wrongUrl);
        const data = await response.json();
        console.log(data);
    } catch (err) {
        console.error(err); // TypeError: Failed to fetch
    }
};

foo();
```

위 예제의 foo 함수의 `catch` 문은 HTTP 통신에섭 라생한 네트워크 에러뿐 아니라 `try` 코드 블록 내의 모든 문에서 발생한 일반적인 에러까지 모두 캐치할 수 있다.

<br/>

**_async 함수 내에서 catch 문을 사용해서 에러 처리를 하지 않으면 async 함수는 발생한 에러를 reject 하는 프로미스를 반환한다._**

따라서 async 함수를 호출하고 후속 처리 메서드를 사용해 에러를 캐치할 수도 있다.

```jsx
const foo = async () => {
    const wrongUrl = "https://wrong.url";

    const response = await fetch(wrongUrl);
    const data = await response.json();
    return data;
};

foo().then(console.log).catch(console.error); // TypeError: Failed to fetch
```
