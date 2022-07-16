# Ajax란?

**Ajax(Asynchronous JavaScript and XML)** 란 자바스크립트를 사용하여 브라우저가 서버에게 비동기 방식으로 데이터를 요청하고, 서버가 응답한 데이터를 수신하여 웹페이지를 동적으로 갱신하는 **프로그래밍 방식**을 말한다.

**Ajax**는 브라우저에서 제공하는 Web API인 **XMLHttpRequest 객체**를 기반으로 동작한다.<br> **XMLHttpRequest**는 HTTP 비동기 통신을 위한 메서드와 프로퍼티를 제공한다.

<br>

### 전통적인 웹페이지의 생명주기

이전의 웹페이지는 html 태그로 시작해서 html 태그로 끝나는 완전한 HTML을 서버로부터 전송받아 웹페이지 전체를 처음부터 다시 렌더링하는 방식으로 동작했다.

<p align="center">
<img src="https://user-images.githubusercontent.com/54847910/179346188-90c57bf6-b54e-458b-8bc7-ea49e76d8800.png" width="50%"/>
</p>

-   변경할 필요가 없는 부분까지 포함된 완전한 HTML을 서버로부터 매번 다시 전송받기 때문에 불필요한 데이터 통신이 발생한다.
-   변경할 필요가 없는 부분까지 다시 렌더링하게 된다. 이때 화면이 순간적으로 깜박이는 현상이 발생한다.
-   클라이언트와 서버와의 통신이 **동기 방식**으로 동작하기 때문에 서버로부터 응답이 있을때까지 다음 처리는 블로킹된다.

<br>

### Ajax

Ajax의 등장으로 서버로부터 웹페이지의 변경에 필요한 데이터만 비동기 방식으로 전송받아 웹페이지를 변경할 필요가 없는 부분은 다시 렌더링하지 않고, 변경이 필요한 부분만 렌더링할 수 있게 되었다. 이를 통해 브라우저에서도 데스크톱 애플리케이션과 유사한 빠른 퍼포먼스와 부드러운 화면 전환이 가능해졌다.

<p align="center">
<img src="https://user-images.githubusercontent.com/54847910/179346192-deccd715-78b0-4af5-b7ff-16e6d2d3feb2.png" width="50%"/>
</p>

-   변경할 부분을 갱신하는 데 필요한 데이터만 서버로부터 전송받기 때문에 불필요한 데이터 통신이 발생하지 않는다.
-   변경할 필요가 없는 부분은 다시 렌더링 하지 않는다. 따라서 화면이 순간적으로 깜박이는 현상이 발생하지 않는다.
-   클라이언트와 서버와의 통신이 **비동기 방식**으로 동작하기 때문에 서버에게 요청을 보낸 이후 블로킹이 발생하지 않는다.

<br><br>

# JSON

**JSON(JavaScript Object Nation)** 은 클라이언트와 서버 간의 HTTP 통신을 위한 **텍스트 데이터 포맷**이다.<br>
자바스크립트에 종속되지 않는 **언어 독립형 데이터 포맷**으로, 대부분의 프로그래밍 언어에서 사용할 수 있다.

<br>

### JSON 표기 방식

JSON은 자바스크립트의 객체 리터럴과 유사하게 키와 값으로 구성된 순수한 텍스트다.

```jsx
{
    name: "Roh",
    age: 20,
    alive: true,
    hobby: ["traveling", "tennis"],
};
```

JSON의 키는 반드시 `큰따옴표`로 묶어야 한다. 값은 객체 리터럴과 같은 표기법을 사용할 수 있지만, 문자열은 반드시 `큰따옴표`로 묶어야 한다.

<br>

### JSON.stringify

`JSON.stringify` 메서드는 객체를 JSON 포맷의 문자열로 변환한다.

클라이언트가 서버로 객체를 전송하려면 객체를 문자열화해야 하는데 이를 **직렬화(serializing)** 라 한다.

```jsx
JSON.stringify(value[, replacer[, space]])
```

| 매개변수           | 설명                                                                                                                                                 |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| value              | JSON 문자열로 변환할 값.                                                                                                                             |
| replacer(optional) | JSON 문자열에 포함시킬 객체의 속성들을 선택하기 위한 함수 또는 배열.<br>파라미터 값이 비어있거나 null로 지정되면 모든 속성이 JSON 문자열에 포함되다. |
| space(optional)    | JSON 문자열 형식의 가독성을 높이기 위해 공백을 조정하는 값.                                                                                          |

<br>

### ☑️ stringify 사용 예제

```jsx
const obj = {
    name: "Roh",
    age: 20,
    alive: true,
    hobby: ["traveling", "tennis"],
};

const json = JSON.stringify(obj);

console.log(typeof json); // string
console.log(json);
// {"name":"Roh","age":20,"alive":true,"hobby":["traveling","tennis"]}
```

<br>

### ☑️ replacer 사용 예제

```jsx
const obj = {
    name: "Roh",
    age: 20,
    alive: true,
    hobby: ["traveling", "tennis"],
};

function filter(key, value) {
    return typeof value === "number" ? undefined : value;
}

// JSON.stringify 메서드에 두 번째 인수로 replacer 함수를 전달한다.
const strFilteredObject = JSON.stringify(obj, filter, 2);
console.log(strFilteredObject);
/*
{
    "name": "Roh",
    "alive": true,
    "hobby": [
      "traveling",
      "tennis"
    ]
}
*/
```

<br>

`JSON.stringfy` 메서드는 배열도 JSON 포맷의 문자열로 변환할 수 있다.

```jsx
const todos = [
    { id: 1, content: "HTML", completed: true },
    { id: 2, content: "CSS", completed: true },
    { id: 3, content: "Javascript", completed: false },
];

// 배열을 JSON 포맷의 문자열로 변환한다.
const json = JSON.stringify(todos, null, 2);
console.log(json);
/*
[
  {
    "id": 1,
    "content": "HTML",
    "completed": true
  },
  {
    "id": 2,
    "content": "CSS",
    "completed": true
  },
  {
    "id": 3,
    "content": "Javascript",
    "completed": false
  }
]
*/
```

<br>

### JSON.parse

`JSON.parse` 메서드는 JSON 포맷의 문자열을 객체로 변환한다.

서버로부터 클라이언트에게 전송된 JSON 데이터는 문자열을 객체로서 사용하려면 이 문자열을 객체화해야 하는데 이를 **역직렬화(deserializing)** 라고 한다.

```jsx
const obj = {
    name: "Roh",
    age: 20,
    alive: true,
    hobby: ["traveling", "tennis"],
};

// 객체를 JSON 포맷의 문자열로 변환한다.
const json = JSON.stringify(obj);
// JSON 포맷의 문자열을 객체로 변환한다.
const parsed = JSON.parse(json);

console.log(typeof parsed);
// object
console.log(parsed);
// {name: "Roh", age: 20, alive: true, hobby: ["traveling", "tennis"]}
```
