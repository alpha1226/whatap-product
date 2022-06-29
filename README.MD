## whatap 채용 프로젝트 - product서버

framework : express  
db: mysql

### api

| method | url            | comment                    |
| ------ | -------------- | -------------------------- |
| GET    | /getProducts   | 전체 상품 조회             |
|        | /getOrders     | 상품에 대한 전체 주문 조회 |
|        | /getProduct    | 단일 상품 조회             |
| POST   | /addProduct    | 상품 추가                  |
| PUT    | /updateProduct | 상품 정보 수정             |
| DELETE | /deleteProduct | 상품 삭제                  |

---
