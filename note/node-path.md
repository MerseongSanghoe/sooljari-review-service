# path 문제

import시 경로 관련은 언제나 고민이 많다

../custom/env.js는 솔직히 이상한거같고

# 그래서

https://elfinlas.github.io/node-js/220228_node-absolute-path/

```json
{
  ...
    "license": "None",
    "type": "module",
    "imports": {
        ...
        "#middleware/*": "./some_path/src/middleware/*",
        "#config/*": "./some_path/src/config/*",
        "#route/*": "./some_path/src/route/*",
        "#entity/*": "./some_path/src/entity/*",
        "#util/*": "./some_path/src/utils/*"
        ...
    },
    "scripts": {
        "dev": " nodemon ./start.js",
    }
  ....
}
```

와 같이, imports를 넣어 해결했다.
