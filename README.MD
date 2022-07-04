## whatap 채용 프로젝트 - product서버

framework : express  
db: mysql

### api

| method | url            | comment                    | fin |
| ------ | -------------- | -------------------------- | --- |
| GET    | /getProducts   | 전체 상품 조회             | O   |
|        | /getOrders     | 상품에 대한 전체 주문 조회 |
|        | /getProduct    | 단일 상품 조회             | O   |
| POST   | /addProduct    | 상품 추가                  | O   |
| PUT    | /updateProduct | 상품 정보 수정             | O   |
| DELETE | /deleteProduct | 상품 삭제                  | O   |

---
