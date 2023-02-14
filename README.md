# clo-assignment
clo assignment


## Buid Setting
+ .env 작성
  + .env.template를 참고하여 db 연결 및 서버를 위한 변수들을 채워주세요. 

+ 서버 실행
  + 서버 기본 세팅
    다음의 절차로 이루어져 있습니다.
    + 1. npm install (프로젝트에서 사용하는 library를 일괄적으로 download, project setting) 
    + 2. npm run start
    
  + 위의 절차에 따라 .env를 모두 작성한 후 아래의 명령어를 프로젝트 폴더에서 실행하면 서버가 동작합니다.
  ```
  npm install && npx tsc && npm run start
  ```
  
## API 명세
+ swagger
  서버 실행 후 localhost:[port-number]/api-docs 을 통해 접속하시면 api 명세에 대한 정리문서를 확인할 수 있습니다.

+ GET /api/employee?page={page}&pageSize={pageSize}
  query(selective):
    page: 페이지 번호
    pageSize: 페이지 크기
  permission: allowAny
  response: Application/json
  ```
  data: [{
    "name": string,
    "email": string,
    "tel": string,
    "joined": string
  }],
    page: number
  }
  ```

+ GET /api/employee/{name}
  - 존재하지 않을 경우 빈 데이터를 돌려줍니다.
  permission: allowAny
  response: Application/json
  ```
  data: {
    "name": string,
    "email": string,
    "tel": string,
    "joined": string
  }
  ```

+ POST /api/employee
  + 1) 공통 세팅
    - api 중 이름을 통한 검색 기능이 있으므로 name을 unique한 parameter로 설정했습니다.
    - 입력한 정보 중 이미 등록된 이름이 있을 경우 400 bad request를 돌려줍니다.
    - 입력한 정보 중 인적사항(이름, 이메일, 전화번호, 가입한 날짜) 중 하나가 누락되어있을 경우 400 bad request를 돌려줍니다.
    - 400 bad request error를 돌려보낸 경우 같이 등록된 이름들도 저장되지 않습니다.
  + 2) csv 파일 등록
    - multipart/form - file 을 통해 csv 파일을 틍록시 local의 uploads 파일에 파일을 저장한 후 이를 불러와 데이터를 파싱한 후 DB에 적합한 형태로 업로드합니다.
    - response: 201 created
    
  + 3) json 파일 등록
    - multipart/form - file 을 통해 csv 파일 등록시 local의 uploads 파일에 파일을 저장한 후 이를 불러와 데이터를 파싱한 후 DB에 적합한 형태로 업로드합니다.
    - response: 201 created
  
  + 4) plain text 입력
    - application/json - { employees: "plain-text"} 의 형태로 payload를 받아와 json의 형태로 파싱한 후 DB에 적합한 형태로 업로드합니다. textarea에서 입력받은 값은 employees라는 key 값에 저장하여 전달되어야 제대로 동작합니다.
    - body:
    ```
    {
      employees: string
    }
    ```
    - response: 201 created
  + 5) 이외의 확장자로 파일을 업로드하는 경우
    - response 403:Forbidden 를 되돌려줍니다.

  

## 필수 요소 이외에 설계에 추가된 부분
+ CQRS 구조로 프로젝트를 설계했습니다. post 명령어 수행시 eventHandler에서 db를 처리하고 있습니다.
+ winstone logger를 추가했습니다. 서버를 수행한 후 terminal 에서 실시간으로 log를 확인할 수 있으며, 로컬의 /logs 디렉토리에서도 log 내용을 모아 볼 수 있습니다.
+ jest 를 통한 test 코드가 구현되어있습니다. 아래의 명령어를 통해 package.json 에서 설정해둔 jest setting에 따라 test를 수행할 수 있습니다.
```
npm run test
```