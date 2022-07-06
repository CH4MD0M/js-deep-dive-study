# Set

`Set` 객체는 중복되지 않는 유일한 값들의 집합이다. `Set`은 수학적 집합을 구현하기 위한 자료구조다. 따라서 `Set`을 통해 교집합, 차집합, 합집합, 여집합 등을 구현할 수 있다.

<br>

### Set 객체의 생성

`Set` 객체는 `Set` 생성자 함수로 생성한다. `Set` 생성자 함수에 인수를 전달하지 않으면 빈 `Set` 객체가 생성된다.

```jsx
const set = new Set();
console.log(set); // Set(0) {}
```

<br>

**_Set 생성자 함수는 이터러블을 인수로 받아 Set 객체를 생성한다. 이때 이터러블의 중복된 값은 Set 객체에 요소로 저장되지 않는다._**

```jsx
const set1 = new Set([1, 2, 3, 3]);
console.log(set1); // Set(3) {1, 2, 3}

const set2 = new Set("hello");
console.log(set2); // Set(4) {"h", "e", "l", "o"}
```

<br>

`Set` 객체의 특성을 이용해 배열의 중복된 요소를 제거할 수 있다.

```jsx
// 배열의 중복 요소 제거
const uniq = (array) => array.filter((v, i, self) => self.indexOf(v) === i);
console.log(uniq([2, 1, 2, 3, 4, 3, 4])); // [2, 1, 3, 4]

// Set을 사용한 배열의 중복 요소 제거
const uniq = (array) => [...new Set(array)];
console.log(uniq([2, 1, 2, 3, 4, 3, 4])); // [2, 1, 3, 4]
```

<br>

### 요소 개수 확인

`Set` 객체의 요소 개수를 확인할 때는 `Set.prototype.size` 프로퍼티를 사용한다.

```jsx
const set = new Set([1, 2, 3, 3]);
console.log(set.size); // 3

// 위와 아래는 동치다.
const { size } = new Set([1, 2, 3, 3]);
console.log(size); // 3
```

`size` 프로퍼티는 `getter` 함수만 존재하는 프로퍼티다. 따라서 `size` 프로퍼티에 숫자를 할당하여 Set 객체의 요소 개수를 변경할 수 없다.

<br>

### 요소 추가

`Set` 객체에 요소를 추가할 때는 `Set.prototype.add` 메서드를 사용한다.

```jsx
const set = new Set();
console.log(set); // Set(0) {}

set.add(1);
console.log(set); // Set(1) {1}
```

<br>

`add` 메서드는 새로운 요소가 추가된 `Set` 객체를 반환한다. 따라서 `add` 메서드를 연속적으로 호출할 수 있다.

```jsx
const set = new Set();

set.add(1).add(2);
console.log(set); // Set(2) {1, 2}
```

<br>

**일치 비교 연산자(===)** 를 사용하면 `NaN`과 `NaN`을 다르다고 평가한다. 하지만 `Set` 객체는 `NaN`과 `NaN`을 같다고 평가하여 중복 추가를 허용하지 않는다.

```jsx
const set = new Set();

console.log(NaN === NaN); // false
console.log(0 === -0); // true

// NaN과 NaN을 같다고 평가하여 중복 추가를 허용하지 않는다.
set.add(NaN).add(NaN);
console.log(set); // Set(1) {NaN}

// +0과 -0을 같다고 평가하여 중복 추가를 허용하지 않는다.
set.add(0).add(-0);
console.log(set); // Set(2) {NaN, 0}
```

<br>

`Set` 객체는 객체나 배열, 함수 등 자바스크립트의 모든 값을 요소로 저장할 수 있다.

```jsx
const set = new Set();

set.add(1)
    .add("a")
    .add(true)
    .add(undefined)
    .add(null)
    .add({})
    .add([])
    .add(() => {});

console.log(set);
// Set(8) { 1, 'a', true, undefined, null, {}, [], [Function (anonymous)] }
```

<br>

### 요소 존재 여부 확인

`Set` 객체에 특정 요소가 존재하는지 확인하려면 `Set.prototype.has` 메서드를 사용한다. `has` 메서드는 **특정 요소의 존재 여부를 나타내는 불리언 값을 반환**한다.

```jsx
const set = new Set([1, 2, 3]);

console.log(set.has(2)); // true
console.log(set.has(4)); // false
```

<br>

### 요소 삭제

`Set` 객체의 특정 요소를 삭제하려면 `Set.prototype.delete` 메서드를 사용한다. `delete` 메서드는 **삭제 성공 여부를 나타내는 불리언 값을 반환**한다.

**`Set` 객체는 순서에 의미가 없다.** 즉, 인덱스를 갖지 않는다. 따라서 `delete` 메서드에 삭제하려는 **요소값을 전달**해야 한다.

```jsx
const set = new Set([1, 2, 3]);

set.delete(2);
console.log(set); // Set(2) {1, 3}

set.delete(1);
console.log(set); // Set(1) {3}
```

<br>

`delete` 메서드는 삭제 성공 여부를 나타내는 불리언 값을 반환하기 때문에 연속적으로 호출할 수 없다.

```jsx
const set = new Set([1, 2, 3]);

set.delete(1).delete(2); // TypeError: set.delete(...).delete is not a function
```

<br>

### 요소 일괄 삭제

`Set` 객체의 모든 요소를 일괄 삭제하려면 `Set.prototype.clear` 메서드를 사용한다. `clear` 메서드는 언제나 `undefined`를 반환한다.

```jsx
const set = new Set([1, 2, 3]);

set.clear();
console.log(set); // Set(0) {}
```

<br>

### 요소 순회

`Set` 객체의 요소를 순회하려면 `Set.prototype.forEach` 메서드를 사용한다.
`Array.prototype.forEach` 메서드와 유사하게 동작한며 콜백 함수가 전달받는 인수 3가지는 다음과 같다.

-   **첫 번째 인수:** 현재 순회 중인 요소값
-   **두 번째 인수:** 현재 순회 중인 요소값
-   **세 번째 인수:** 현재 순회 중인 Set 객체 자체

<br>

첫 번째 인수와 두 번째 인수는 같은 값이다. 이처럼 동작하는 이유는 `Array.prototype.forEach` 메서드와 인터페이스를 통일하기 위함이며 다른 의미는 없다. `Set` 객체는 **순서에 의미가 없어** 배열과 같이 인덱스를 갖지 않기 때문에 두 번째 인수로 인덱스를 전달받지 않는다.

```jsx
const set = new Set([1, 2, 3]);

set.forEach((v1, v2, set) => console.log(v1, v2, set));
/*
1 1 Set(3) {1, 2, 3}
2 2 Set(3) {1, 2, 3}
3 3 Set(3) {1, 2, 3}
*/
```

<br>

**_Set 객체는 이터러블이다._** 따라서 `for…of` 문으로 순회할 수 있으며, 스프레드 문법과 배열 디스트럭처링의 대상이 될 수 있다.

```jsx
const set = new Set([1, 2, 3]);

// Set 객체는 이터러블이다.
console.log(Symbol.iterator in set); // true

// Set 객체는 for...of 문으로 순회할 수 있다.
for (const value of set) {
    console.log(value); // 1 2 3
}

// Set 객체는 스프레드 문법의 대상이 될 수 있다.
console.log([...set]); // [1, 2, 3]

// Set 객체는 배열 디스트럭처링 할당의 대상이 될 수 있다.
const [a, ...rest] = [...set];
console.log(a, rest); // 1, [2, 3]
```

`Set` 객체는 요소의 순서에 의미를 갖지 않지만 **_Set 객체를 순회하는 순서는 요소가 추가된 순서를 따르다._** 이는 ECMAScript 시양에 규정되어 있지는 않지만 다른 이터러블의 순회와 호환성을 유지하기 위함이다.

<br>

### 집합 연산

### ☑️ 교집합

```jsx
Set.prototype.intersection = function (set) {
    return new Set([...this].filter((v) => set.has(v)));
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

// setA와 setB의 교집합
console.log(setA.intersection(setB)); // Set(2) {2, 4}
// setB와 setA의 교집합
console.log(setB.intersection(setA)); // Set(2) {2, 4}
```

<br>

### ☑️ 합집합

```jsx
Set.prototype.union = function (set) {
    return new Set([...this, ...set]);
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

// setA와 setB의 합집합
console.log(setA.union(setB)); // Set(4) {1, 2, 3, 4}
// setB와 setA의 합집합
console.log(setB.union(setA)); // Set(4) {2, 4, 1, 3}
```

<br>

### ☑️ 차집합

```jsx
Set.prototype.difference = function (set) {
    return new Set([...this].filter((v) => !set.has(v)));
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

// setA에 대한 setB의 차집합
console.log(setA.difference(setB)); // Set(2) {1, 3}
// setB에 대한 setA의 차집합
console.log(setB.difference(setA)); // Set(0) {}
```

<br>

### ☑️ 부분 집합과 상위 집합

집합 A가 집합 B에 포함되는 경우$(A \subseteq B)$ 집합 A는 집합 B의 **부분 집합**이며, 집합 B는집합 A의 **상위 집합**이다.

```jsx
// this가 subset의 상위 집합인지 확인한다.
Set.prototype.isSuperset = function (subset) {
    const supersetArr = [...this];
    return [...subset].every((v) => supersetArr.includes(v));
};

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 4]);

// setA가 setB의 상위 집합인지 확인한다.
console.log(setA.isSuperset(setB)); // true
// setB가 setA의 상위 집합인지 확인한다.
console.log(setB.isSuperset(setA)); // false
```

<br><br>

# Map

`Map` 객체는 키와 값의 쌍으로 이루어진 컬렉션이다. `Map` 객체는 객체와 유사하지만 다음과 같은 차이가 있다.

| 구분                   | 객체                    | Map 객체              |
| ---------------------- | ----------------------- | --------------------- |
| 키로 사용할 수 있는 값 | 문자열 또는 심벌 값     | 객체를 포함한 모든 값 |
| 이터러블               | X                       | O                     |
| 요소 개수 확인         | Object.keys(obj).length | map.size              |

<br>

### Map 객체의 생성

`Map` 객체는 Map 생성자 함수로 생성한다. `Map` 생성자 함수에 인수를 전달하지 않으면 빈 `Map` 객체가 생성된다.

```jsx
const map = new Map();
console.log(map); // Map(0) {}
```

<br>

**_Map 생성자 함수의 인수로 전달한 이터러블에 중복된 키를 갖는 요소가 존재하면 값이 덮어써진다._**

```jsx
const map = new Map([
    ["key1", "value1"],
    ["key1", "value2"],
]);
console.log(map); // Map(1) { 'key1' => 'value2' }
```

<br>

### 요소 개수 확인

`Map` 객체의 요소 개수를 확인할 때는 `Map.prototype.size` 프로퍼티를 사용한다.

```jsx
const map = new Map([
    ["key1", "value1"],
    ["key2", "value2"],
]);
console.log(map.size); // 2
```

`size` 프로퍼티는 `getter` 함수만 존재하는 접근자 프로퍼티다. 따라서 `size` 프로퍼티에 숫자를 할당하여 `Map` 객체의 요소 개수를 변경할 수 없다.

<br>

### 요소 추가

`Map` 객체에 요소를 추가할 때는 `Map.prototype.set` 메서드를 사용한다.

```jsx
const map = new Map();
console.log(map); // Map(0) {}

map.set("key1", "value1");
console.log(map); // Map(1) {"key1" => "value1"}
```

<br>

**_set 메서드는 새로운 요소가 추가된 Map 객체를 반환한다. 따라서 set 메서드는 연속적으로 호출할 수 있다._**

```jsx
const map = new Map();

map.set("key1", "value1").set("key2", "value2");

console.log(map); // Map(2) {"key1" => "value1", "key2" => "value2"}
```

<br>

객체는 문자열 또는 심벌 값만 키로 사용할 수 있지만, `Map` 객체는 키 타입에 제한이 없다.

```jsx
const map = new Map();

const kim = { name: "Kim" };
const roh = { name: "Roh" };

// 객체도 키로 사용할 수 있다.
map.set(roh, "fe-developer").set(kim, "be-developer");

console.log(map);
// Map(2) { { name: 'Roh' } => 'fe-developer', { name: 'Kim' } => 'be-developer'}
```

<br>

### 요소 취득

`Map` 객체에서 특정 요소를 취득하려면 `Map.prototype.get` 메서드를 사용한다. `get` 메서드의 인수로 키를 전달하면 `Map` 객체에서 인수로 전달한 키를 갖는 값을 반환한다.

```jsx
const map = new Map();

map.set("roh", "fe-developer").set("kim", "be-developer");

console.log(map.get("roh")); // fe-developer
console.log(map.get("key")); // undefined
```

<br>

### 요소 존재 여부 확인

`Map` 객체에서 특정 요소가 존재하는지 확인하려면 `Map.prototype.has` 메서드를 사용한다. `has` 메서드는 존재 여부를 불리언 값으로 반환한다.

```jsx
const map = new Map([
    ["roh", "fe-developer"],
    ["kim", "be-developer"],
]);

console.log(map.has("roh")); // true
console.log(map.has("key")); // false
```

<br>

### 요소 삭제

`Map` 객체의 요소를 삭제하려면 `Map.prototype.delete` 메서드를 사용한다. `delete` 메서드는 삭제 성공 여부를 불리언 값으로 반환한다.

```jsx
const map = new Map([
    ["roh", "fe-developer"],
    ["kim", "be-developer"],
]);

map.delete("kim");
console.log(map); // Map(1) { 'roh' => 'fe-developer' }
```

`delete` 메서드는 불리언 값을 반환하기 때문에 `set` 메서드와 달리 연속적으로 호출할 수 없다.

```jsx
const map = new Map([
    ["roh", "fe-developer"],
    ["kim", "be-developer"],
]);

map.delete("roh").delete("kim");
//TypeError: map.delete(...).delete is not a function
```

<br>

### 요소 일괄 삭제

`Map` 객체의 요소를 일괄 삭제하려면 `Map.prototype.clear` 메서드를 사용한다. `clear` 메서드는 언제나 `undefined`를 반환한다.

```jsx
const map = new Map([
    ["roh", "fe-developer"],
    ["kim", "be-developer"],
]);

map.clear();
console.log(map); // Map(0) {}
```

<br>

### 요소 순회

`Map` 객체의 요소를 순회하려면 `Map.prototype.forEach` 메서드를 사용한다.

`Array.prototype.forEach` 메서드와 유사하게 동작한며 콜백 함수가 전달받는 인수 3가지는 다음과 같다.

-   **첫 번째 인수:** 현재 순회 중인 요소값
-   **두 번째 인수:** 현재 순회 중인 요소값
-   **세 번째 인수:** 현재 순회 중인 Map 객체 자체

```jsx
const map = new Map([
    ["roh", "fe-developer"],
    ["kim", "be-developer"],
]);
map.forEach((v, k, map) => console.log(v, k, map));

/*
fe-developer roh Map(2) { 'roh' => 'fe-developer', 'kim' => 'be-developer' }
be-developer kim Map(2) { 'roh' => 'fe-developer', 'kim' => 'be-developer' }
*/
```

<br>

`Map` 객체는 이터러블이다. 따라서 `for…of` 문으로 순회할 수 있고, 스프레드 문법과 배열 디스트럭처링 할당의 대상이 될 수 있다.

```jsx
const map = new Map([
    ["roh", "fe-developer"],
    ["kim", "be-developer"],
]);

// Map 객체는 Map.prototype의 Symbol.iterator 메서드를 상속받는 이터러블이다.
console.log(Symbol.iterator in map); // true

// 이터러블인 Map 객체는 for...of 문으로 순회할 수 있다.
for (const entry of map) {
    console.log(entry); // [ 'roh', 'fe-developer' ] [ 'kim', 'be-developer' ]
}

// 이터러블인 Map 객체는 스프레드 문법의 대상이 될 수 있다.
console.log([...map]);
// [ [ 'roh', 'fe-developer' ], [ 'kim', 'be-developer' ] ]

// 이터러블인 Map 객체는 배열 디스트럭처링 할당의 대상이 될 수 있다.
const [a, b] = map;
console.log(a, b);
// [ 'roh', 'fe-developer' ] [ 'kim', 'be-developer' ]
```

<br>

`Map` 객체는 이터러블이면서 동시에 이터레이터인 객체를 반환하는 메서드를 제공한다.

| Map 메서드            | 설명                                                                                    |
| --------------------- | --------------------------------------------------------------------------------------- |
| Map.prototype.keys    | Map 객체에서 요소키를 값으로 갖는 이터러블이면서 이터레이터인 객체를 반환한다.          |
| Map.prototype.values  | Map 객체에서 요소값을 값으로 갖는 이터러블이면서 이터레이터인 객체를 반환한다.          |
| Map.prototype.entries | Map 객체에서 요소키와 요소값를 값으로 갖는 이터러블이면서 이터레이터인 객체를 반환한다. |

```jsx
const map = new Map([
    ["roh", "fe-developer"],
    ["kim", "be-developer"],
]);

for (const key of map.keys()) {
    console.log(key); // roh  kim
}

for (const value of map.values()) {
    console.log(value); // fe-developer  be-developer
}

for (const entry of map.entries()) {
    console.log(entry);
    // [ 'roh', 'fe-developer' ] [ 'kim', 'be-developer' ]
}
```
