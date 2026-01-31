## 컴포넌트 생성 규칙

### 파일 위치

- UI 컴포넌트: `src/components/ui/컴포넌트명.tsx`

### 코드 패턴

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// 1. variants 정의 (cva 사용)
const 컴포넌트Variants = cva("기본 스타일", {
  variants: {
    variant: { ... },
    size: { ... },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

// 2. Props 타입 정의
interface 컴포넌트Props
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof 컴포넌트Variants> {}

// 3. 컴포넌트 함수 (function 키워드 사용)
function 컴포넌트({ className, variant, size, ...props }: 컴포넌트Props) {
  return (
    <element
      data-slot="컴포넌트명"
      className={cn(컴포넌트Variants({ variant, size }), className)}
      {...props}
    />
  )
}

// 4. export
export { 컴포넌트, 컴포넌트Variants }
```

### 필수 사항

- `cva`로 variants 관리
- `cn()` 유틸로 className 병합
- `data-slot` 속성 추가
- `function` 키워드 사용 (arrow function X)
- variants와 컴포넌트 모두 export

---

## 커밋 규칙

작업 완료 후 항상 적절한 커밋 메시지와 함께 커밋합니다.

### 커밋 메시지 형식

```
<type>: <subject>

<body>
```

### 타입

- `feat`: 새로운 기능
- `fix`: 버그 수정
- `refactor`: 리팩토링
- `style`: 스타일 변경 (코드 동작에 영향 없음)
- `docs`: 문서 변경
- `chore`: 빌드, 설정 등 기타 변경

### 커밋 시점

- 기능 구현 완료 시
- 버그 수정 완료 시
- 사용자 요청 작업 완료 시
