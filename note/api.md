# Review API

## Review Schema

아래 서술되는 ReviewBlock과 ReviewSchema에 대한 내용입니다.

```js
const reviewBlock = {
  block_type: Number, // 리뷰 블록의 타입, enum으로 변환
  // 현재는 enum 없이 0만 사용 -> 태그만 있는 블록
  tags: [String], // 해당 블록의 태그들
};
const reviewSchema = {
  writer_id: Number, // 작성자 ID
  alcohol_linked: Boolean, // 주류 연결 여부
  alcohol_linked_id: Number, // 주류 연결시 해당 주류의 ID
  alcohol_info: {
    title: String,
    category: String,
    degree: Number,
  }, // alcohol_linked가 false인 경우에만 사용
  reviews: [reviewBlock],

  createdAt: Timestamp, // 생성일
  updatedAt: Timestamp, // 최종수정일
};
```

## GET /review

모든 리뷰를 가져오는 API

직접적으로 사용할 일은 없을것

### request

#### Query Parameters

- `page`
  - 선택 파라미터 (default 0)
  - 검색 페이지 (zero-based)
- `size`
  - 선택 파라미터 (default 10)
  - 한 페이지의 사이즈

### response

#### Response Status Code

`200`

#### Response Body

- `data`: 검색 결과 컨텐츠, array
  - `[reviewSchema]`
- `count`: 검색 결과의 총 개수
- `page`: request의 `page` 파라미터 값
- `size`: request의 `size` 파라미터 값

### Examples

`GET /review?page=4&size=2`

```json
{
  "data": [
    {
      "_id": "6565bd4d0f2e084e938d1981",
      "writer_id": 2,
      "alcohol_linked": true,
      "alcohol_linked_id": 223,
      "reviews": [
        {
          "block_type": 0,
          "tags": ["hello", "world"],
          "_id": "6565bd4d0f2e084e938d1982"
        }
      ],
      "createdAt": "2023-11-28T10:13:33.935Z",
      "updatedAt": "2023-11-28T10:13:33.935Z",
      "__v": 0
    },
    {
      "_id": "6565bd4d0f2e084e938d197e",
      "writer_id": 2,
      "alcohol_linked": true,
      "alcohol_linked_id": 223,
      "reviews": [
        {
          "block_type": 0,
          "tags": ["hello", "world"],
          "_id": "6565bd4d0f2e084e938d197f"
        }
      ],
      "createdAt": "2023-11-28T10:13:33.533Z",
      "updatedAt": "2023-11-28T10:13:33.533Z",
      "__v": 0
    }
  ],
  "page": 4,
  "size": 2,
  "count": 14
}
```

## POST /review

새로운 리뷰를 작성합니다

### request

#### body

- `writerId`: 작성자 ID
  - required, number
- `alcoholId`: 주류 ID (임시, 이후 required 제거 예정)
  - required, number
- `reviews`: 리뷰 블럭들
  - required, Array<reviewBlock>

### response

#### Response Status Code

`200`

#### Response Body

- reviewSchema

### Example

`POST /review`

- Request body

```json
{
  "writerId": 2,
  "alcoholId": 223,
  "reviews": [
    {
      "tags": ["hello", "world"]
    }
  ]
}
```

- Response

```json
{
  "writer_id": 2,
  "alcohol_linked": true,
  "alcohol_linked_id": 223,
  "reviews": [
    {
      "block_type": 0,
      "tags": ["hello", "world"],
      "_id": "6565bd590f2e084e938d19a6"
    }
  ],
  "_id": "6565bd590f2e084e938d19a5",
  "createdAt": "2023-11-28T10:13:45.340Z",
  "updatedAt": "2023-11-28T10:13:45.340Z",
  "__v": 0
}
```

## GET /review/byalc/:id

ID에 해당하는 주류에 관한 리뷰들을 가져오는 API

### request

#### Parameters

- `id`
  - 작성자의 ID

#### Query Parameters

- `page`
  - 선택 파라미터 (default 0)
  - 검색 페이지 (zero-based)
- `size`
  - 선택 파라미터 (default 10)
  - 한 페이지의 사이즈

### response

#### Response Status Code

`200`

#### Response Body

- `data`: 검색 결과 컨텐츠, array
  - `[reviewSchema]`
- `count`: 검색 결과의 총 개수
- `page`: request의 `page` 파라미터 값
- `size`: request의 `size` 파라미터 값

### Examples

`GET /review/byalc/223?page=2&size=2`

```json
{
  "data": [
    {
      "_id": "6565bd4f0f2e084e938d198d",
      "writer_id": 2,
      "alcohol_linked": true,
      "alcohol_linked_id": 223,
      "reviews": [
        {
          "block_type": 0,
          "tags": ["hello", "world"],
          "_id": "6565bd4f0f2e084e938d198e"
        }
      ],
      "createdAt": "2023-11-28T10:13:35.622Z",
      "updatedAt": "2023-11-28T10:13:35.622Z",
      "__v": 0
    },
    {
      "_id": "6565bd4f0f2e084e938d198a",
      "writer_id": 2,
      "alcohol_linked": true,
      "alcohol_linked_id": 223,
      "reviews": [
        {
          "block_type": 0,
          "tags": ["hello", "world"],
          "_id": "6565bd4f0f2e084e938d198b"
        }
      ],
      "createdAt": "2023-11-28T10:13:35.235Z",
      "updatedAt": "2023-11-28T10:13:35.235Z",
      "__v": 0
    }
  ],
  "page": 2,
  "size": 2,
  "count": 13
}
```

## GET /review/bywrt/:id

ID에 해당하는 유저가 작성한 리뷰들을 가져오는 API

### request

#### Parameters

- `id`
  - 작성자의 ID

#### Query Parameters

- `page`
  - 선택 파라미터 (default 0)
  - 검색 페이지 (zero-based)
- `size`
  - 선택 파라미터 (default 10)
  - 한 페이지의 사이즈

### response

#### Response Status Code

`200`

#### Response Body

- `data`: 검색 결과 컨텐츠, array
  - `[reviewSchema]`
- `count`: 검색 결과의 총 개수
- `page`: request의 `page` 파라미터 값
- `size`: request의 `size` 파라미터 값

### Examples

`GET /review/bywrt/1?page=0`

```json
{
    "data":[
        {
            "_id": "65646a2652dbe7c747d0db64",
            "writer_id": 1,
            "alcohol_linked": true,
            "alcohol_linked_id": 223,
            "reviews":[{"block_type": 0, "tags":["hello", "world" ], "_id": "65646a2652dbe7c747d0db65"…],
            "createdAt": "2023-11-27T10:06:30.235Z",
            "updatedAt": "2023-11-27T10:06:30.235Z",
            "__v": 0
        },
        {
            "_id": "65646a2252dbe7c747d0db61",
            "writer_id": 1,
            "alcohol_linked": true,
            "alcohol_linked_id": 222,
            "reviews":[{"block_type": 0, "tags":["hello", "world" ], "_id": "65646a2252dbe7c747d0db62"…],
            "createdAt": "2023-11-27T10:06:26.909Z",
            "updatedAt": "2023-11-27T10:06:26.909Z",
            "__v": 0
        }
    ],
    "page": 0,
    "size": 10,
    "count": 2
}
```
