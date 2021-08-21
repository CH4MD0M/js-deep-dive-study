
# 1. 변수의 생명 주기

- 변수는 생성되고 소멸되는 생명 주기(Life cycle)가 있다.
- <span style=background-color:#ddebf1>**변수의 생명 주기**</span>는 메모리 공간이 확보된 시점부터 메모리공간이 해제되어 가용 메모리 풀에 반환되는 시점까지이다.

<br/>

## <span style=color:#0c6e99>1.1 지역 변수의 생명 주기</span>

<span style=background-color:#ddebf1>**전역 변수의 선언**</span>은 런타임에 실행되는 것이 아니라 <span style=color:#0c6e99>**런타임 이전 단계에서**</span> 자바스크립트 엔진에 의해 먼저 실행된다. 

<span style=background-color:#ddebf1>**함수 내부에서 선언한 변수**</span>는 함수가 호출된 직후에 코드가 한 줄씩 실행되기 이전에 자바스크립트 엔진에 의해 먼저 실행된다.

<span style=background-color:#fbe4e4>**지역 변수의 생명 주기는 함수의 생명 주기와 일치한다.**</span>

<br/>

> ###  <span style=color:#318b7e>**📌 지역 변수가 함수보다 오래 생존하는 경우.**</span>
> 함수 내부에서 선언된 <span style=color:#0c6e99>**지역 변수**</span>는 함수가 생성한 <span style=color:#0c6e99>**스코프**</span>에 등록된다.<br/>
> 
> <span style=background-color:#fbe4e4>변수는 자신이 등록된 스코프가 소멸(메모리 해제)될 때 까지 유효하다.</span><br/>
> 누군가 메모리 공간을 참조하고 있으면 해제되지 않고 확보된 상태로 남아있게 된다.
>
> 일반적으로 함수가 종료되면 함수가 생성한 스코프도 소멸한다. <br/>
> 하지만, 누군가가 스코프를 참조하고 있다면 스코프는 해제되지 않고 생존하게 된다.

<br/>

## <span style=color:#0c6e99>1.2 전역 변수의 생명 주기</span>

전역 코드는 함수 호출과 같이 전역 코드를 실행하는 특별한 진입점이 없고 코드가 로드되자마자 곧바로 해석되고 실행된다.

전역 코드 는 마지막 문이 실행되어 더 이상 실행할 문이 없을 때 종료된다.

var 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 된다.

- var 키워드로 선언한 전역 변수는 웹페이지를 닫을 때까지 유효하다.
- <span style=background-color:#fbe4e4>**var 키워드로 선언한 전역 변수의 생명 주기는 전역 객체의 생명 주기와 일치한다.**</span>

<br/><br/><br/>

# 2. 전역 변수의 문제점</span>
### <span style=color:#318b7e>1) 암묵적 결합</span>

<span style=background-color:#ddebf1>**전역 변수의 선언**</span>은 모든 코드가 전역 변수를 참조하고 변경할 수 있는<span style=color:#0c6e99> **암묵적 결합(implicit coupling)**</span>을 허용하는 것이다.
- 변수의 유효 범위가 크면 클수록 코드의 가독성은 나빠지고 의도치 않게 상태가 변경될 수 있다.

### <span style=color:#318b7e> 2) 긴 생명 주기</span>

긴 생명 주기 때문에 메모리 리소스도 오래 소비하고,
전역 변수의 상태를 변경할 수 있는 시간도 길고 기회도 많다.

### <span style=color:#318b7e>3) 스코프 체인 상에서 종점에 존재</span>

<span style=background-color:#fbe4e4>**전역 변수의 검색 속도가 가장 느리다.**</span>

- 전역 변수는 스코프 체인 상에서 종점에 존재한다.
- 변수를 검색할 때 전역 변수가 가장 마지막에 검색된다.

### <span style=color:#318b7e>4) 네임스페이스 오염</span>

<span style=background-color:#fbe4e4>**자바스크립트의 가장 큰 문제점 중 하나는 파일이 분리되어 있다 해도 하나의 전역 스코프를 공유한다는 것이다.**</span>

- 다른 파일 내에서 동일한 이름의 전역 변수나 전역 함수가 존재한다면 예상치 못한 결과를 가져올 수 있다.

<br/><br/>

---
### 📗 참고
- 자바스크립트 deep dive

