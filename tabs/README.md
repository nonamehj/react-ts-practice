Fetch 사용시 Zod를 사용하는 이유

왜 Zod를 사용해야 하는가 ?

const rawData = await response.json()

json()은 타입은 any

문제점

- 타입 안정성 없음
- 서버 구조가 달라도 알 수 없음
- typescript가 보호하지 못함

그래서 Zod를 사용해 런타임 검증 + 타입 추론을 함께 처리

기본구조

1. 객체 스키마 정의
   import {z} from "zod"

const Schema = z.object({
id:z.number(),
name:z.string(),
arr : z.array(
z.object({
id:z.number(),
name:z.string().
})
)
}
)
의미

- id number
- name string
- arr 객체배열
- 배열 안 객체는 {id:number; name:string} 형태여야함

여러 타입을 허용해야 할 경우(Union)
만약 name이 문자열만이 아니라 숫자, 블린값도 올 수 있다면

방법1 체이닝
name : z.number().or(z.string()).or(z.boolean())
방법2 권장
name : z.union([z.number(),z.string(),z.boolean()])
이 배열은 데이터 배열이 아니라 허용할 타입 목록

배열 안에 객체일 경우
Schema.array()
또는
z.array(Schema)
둘은 동일

배열 관련 예시
z.string().array() //string[]
z.array(z.string()) //string[]
z.array().string() //불가능
타입은 항상 안에서 바깥으로 생성

parse vs safeParse

parse

const rawData = await response.json() //json 은 any
const data = Schema.array().parse(rawData)

- 실패하면 자동 throw
- 성공하면 바로 값 반환
- result.data없음

safeParse()

const result = Schema.array().safeParse(rawData)

Zod가 실제로 검사하는 것

- 배열인지?
- 각 요소가 객체인지?
- id가 number인지?
- name이 string인지?

반환형태
{
success: boolean;
data?: Schema[];
error?: ZodError
}

if(result.success) {
setArr(result.data)
}

interface / type만 사용하는 경우
const data:Data[] = await response.jon()

이 방식은

- 타입을 강제로 단언하는 것
- 실제 런타임 검증은 하지 않음
- 잘못된 데이터가 와도 통과 가능
