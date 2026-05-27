export type Difficulty = "하" | "중" | "상" | "빈출";

export interface Choice {
  num: 1 | 2 | 3 | 4;
  text: string;
}

export interface Question {
  id: string;          // "subquery-001"
  chapterId: string;   // "2-2-1"
  difficulty: Difficulty;
  question: string;
  code?: string;       // SQL 코드 블록 (있을 때만)
  choices: Choice[];
  answer: 1 | 2 | 3 | 4;
  explanation: string; // 전체 해설
  choiceExplanations?: Partial<Record<1 | 2 | 3 | 4, string>>; // 보기별 해설
  tags?: string[];
}

// ── 서브쿼리 (2-2-1) ──────────────────────────────────────────────
export const QUESTIONS: Question[] = [
  {
    id: "subquery-001",
    chapterId: "2-2-1",
    difficulty: "빈출",
    question: "서브쿼리에 대한 설명으로 옳지 않은 것은?",
    choices: [
      { num: 1, text: "서브쿼리는 반드시 괄호로 감싸야 한다." },
      { num: 2, text: "인라인 뷰(FROM 절 서브쿼리)에서는 ORDER BY를 사용할 수 있다." },
      { num: 3, text: "스칼라 서브쿼리 안에서 ORDER BY를 사용할 수 있다." },
      { num: 4, text: "비연관 서브쿼리는 서브쿼리가 메인쿼리보다 먼저 실행된다." },
    ],
    answer: 3,
    explanation:
      "스칼라 서브쿼리(SELECT 절)와 중첩 서브쿼리(WHERE 절) 안에서는 ORDER BY를 사용할 수 없다. ORDER BY가 허용되는 위치는 인라인 뷰(FROM 절)뿐이다.",
    choiceExplanations: {
      1: "옳은 설명. 서브쿼리는 반드시 괄호()로 감싸야 한다.",
      2: "옳은 설명. FROM 절의 인라인 뷰는 ORDER BY 사용이 가능하다.",
      3: "틀린 설명. 스칼라 서브쿼리 내부에 ORDER BY를 쓰면 오류가 발생한다.",
      4: "옳은 설명. 비연관 서브쿼리는 메인쿼리와 독립적으로 먼저 실행된다.",
    },
    tags: ["ORDER BY", "인라인뷰", "스칼라서브쿼리"],
  },
  {
    id: "subquery-002",
    chapterId: "2-2-1",
    difficulty: "빈출",
    question: "스칼라 서브쿼리에 대한 설명으로 옳은 것은?",
    choices: [
      { num: 1, text: "SELECT 절에 사용하며, 여러 행을 반환할 수 있다." },
      { num: 2, text: "결과가 없으면 오류가 발생한다." },
      { num: 3, text: "결과는 반드시 1행 1열이어야 하며, 없으면 NULL을 반환한다." },
      { num: 4, text: "FROM 절에서만 사용할 수 있다." },
    ],
    answer: 3,
    explanation:
      "스칼라 서브쿼리는 SELECT 절에서 사용하며 반드시 1행 1열(단일 값)만 반환해야 한다. 해당 데이터가 없을 경우 오류가 아닌 NULL을 반환한다. 2행 이상 반환되면 오류가 발생한다.",
    choiceExplanations: {
      1: "오답. 여러 행이 반환되면 오류 발생.",
      2: "오답. 결과가 없으면 NULL을 반환한다.",
      3: "정답.",
      4: "오답. 스칼라 서브쿼리는 SELECT 절에서 사용한다. FROM 절은 인라인 뷰.",
    },
    tags: ["스칼라서브쿼리", "NULL"],
  },
  {
    id: "subquery-003",
    chapterId: "2-2-1",
    difficulty: "중",
    question: "연관 서브쿼리(Correlated Subquery)에 대한 설명으로 옳은 것은?",
    choices: [
      { num: 1, text: "서브쿼리가 메인쿼리보다 먼저 단 한 번만 실행된다." },
      { num: 2, text: "서브쿼리 안에 메인쿼리의 컬럼이 포함되어 있다." },
      { num: 3, text: "FROM 절에서만 사용할 수 있다." },
      { num: 4, text: "항상 비연관 서브쿼리보다 성능이 좋다." },
    ],
    answer: 2,
    explanation:
      "연관 서브쿼리는 서브쿼리 안에 메인쿼리의 컬럼이 포함된 것이 핵심이다. 메인쿼리 행을 한 줄씩 읽으면서 서브쿼리를 반복 실행하므로, 비연관 서브쿼리보다 성능이 낮을 수 있다.",
    choiceExplanations: {
      1: "오답. 연관 서브쿼리는 메인쿼리 행마다 반복 실행된다.",
      2: "정답.",
      3: "오답. 연관 서브쿼리는 WHERE, SELECT 절 등 다양한 위치에서 사용 가능하다.",
      4: "오답. 메인 행마다 서브쿼리를 반복 실행하므로 성능이 더 낮을 수 있다.",
    },
    tags: ["연관서브쿼리", "실행순서"],
  },
  {
    id: "subquery-004",
    chapterId: "2-2-1",
    difficulty: "빈출",
    question: "다음 SQL에서 오류가 발생하는 이유로 올바른 것은?",
    code: "SELECT * FROM 사원\nWHERE 부서ID = (SELECT 부서ID FROM 사원 WHERE 직급 = '과장');",
    choices: [
      { num: 1, text: "서브쿼리에 괄호가 없어서" },
      { num: 2, text: "서브쿼리가 여러 행을 반환할 수 있는데 단일행 연산자(=)를 사용해서" },
      { num: 3, text: "WHERE 절에 서브쿼리를 사용할 수 없어서" },
      { num: 4, text: "SELECT * 는 서브쿼리와 함께 사용할 수 없어서" },
    ],
    answer: 2,
    explanation:
      "과장이 여러 명이면 서브쿼리가 여러 행을 반환한다. 단일행 연산자(=)는 1행만 처리할 수 있으므로 오류가 발생한다. 이 경우 IN이나 =ANY를 사용해야 한다.",
    tags: ["단일행연산자", "다중행", "오류"],
  },
  {
    id: "subquery-005",
    chapterId: "2-2-1",
    difficulty: "빈출",
    question: "다음 조건의 의미로 올바른 것은?",
    code: "WHERE 급여 > ALL (SELECT 급여 FROM 사원 WHERE 부서ID = 'D02')",
    choices: [
      { num: 1, text: "D02 부서 사원 중 한 명이라도 급여가 작으면 참" },
      { num: 2, text: "D02 부서 사원 중 가장 낮은 급여보다 높으면 참" },
      { num: 3, text: "D02 부서 사원 전원보다 급여가 높아야 참 (= D02 최고 급여 초과)" },
      { num: 4, text: "D02 부서의 평균 급여보다 높으면 참" },
    ],
    answer: 3,
    explanation:
      "ALL은 목록의 모든 값 조건을 만족해야 한다. 'A > ALL(목록)'은 목록의 최댓값보다 커야 참이다. 반대로 'A > ANY(목록)'는 목록의 최솟값보다 크면 참이다.",
    choiceExplanations: {
      2: "이는 > ANY(목록)의 의미다.",
      3: "정답. ALL은 '모두보다' 크다는 의미이므로 최댓값 초과여야 한다.",
    },
    tags: ["ALL", "ANY", "다중행연산자"],
  },
  {
    id: "subquery-006",
    chapterId: "2-2-1",
    difficulty: "중",
    question: "EXISTS를 사용하여 보너스를 받은 사원 목록을 올바르게 조회한 것은?\n(테이블: EMPLOYEE(EMP_ID, EMP_NAME), BONUS(BONUS_ID, EMP_ID, AMOUNT))",
    choices: [
      { num: 1, text: "WHERE EXISTS (SELECT EMP_ID FROM BONUS)" },
      { num: 2, text: "WHERE EXISTS (SELECT 1 FROM BONUS B WHERE EMPLOYEE.EMP_ID = B.EMP_ID)" },
      { num: 3, text: "WHERE EMP_ID = ALL (SELECT EMP_ID FROM BONUS)" },
      { num: 4, text: "SELECT * FROM BONUS WHERE EMP_ID = EMPLOYEE.EMP_ID" },
    ],
    answer: 2,
    explanation:
      "EXISTS는 반드시 메인쿼리 컬럼을 서브쿼리 안에서 참조하는 연관 서브쿼리로 사용해야 한다. ①은 연관 조건 없이 BONUS에 데이터가 있기만 하면 전 직원이 출력된다. ③은 = ALL로 모든 보너스 사번과 동시에 일치해야 하므로 아무도 출력되지 않는다.",
    choiceExplanations: {
      1: "오답: 연관 조건이 없어 BONUS 테이블에 행이 하나라도 있으면 전원 출력된다.",
      2: "정답: 연관 서브쿼리로 직원별로 보너스 존재 여부를 확인한다.",
      3: "오답: = ALL은 목록의 모든 값과 일치해야 하므로 사실상 결과가 없다.",
      4: "오답: FROM 절에 EMPLOYEE 테이블 없이 EMPLOYEE.EMP_ID를 참조하면 오류.",
    },
    tags: ["EXISTS", "연관서브쿼리"],
  },
  {
    id: "subquery-007",
    chapterId: "2-2-1",
    difficulty: "빈출",
    question: "NOT IN과 NOT EXISTS의 차이에 대한 설명으로 옳은 것은?",
    choices: [
      { num: 1, text: "NOT IN과 NOT EXISTS는 항상 동일한 결과를 반환한다." },
      { num: 2, text: "서브쿼리 결과에 NULL이 포함되면 NOT IN은 아무 행도 반환하지 않을 수 있다." },
      { num: 3, text: "NOT EXISTS는 서브쿼리 결과에 NULL이 있으면 오류가 발생한다." },
      { num: 4, text: "NOT IN이 NOT EXISTS보다 항상 성능이 좋다." },
    ],
    answer: 2,
    explanation:
      "NOT IN은 서브쿼리 결과에 NULL이 포함되면 NULL과의 비교가 UNKNOWN이 되어 아무 행도 반환되지 않는다. SQL에서 'NULL = 어떤값'은 항상 UNKNOWN이기 때문이다. NOT EXISTS는 행의 존재 여부만 확인하므로 NULL의 영향을 받지 않는다.",
    tags: ["NOT IN", "NOT EXISTS", "NULL"],
  },
  {
    id: "subquery-008",
    chapterId: "2-2-1",
    difficulty: "중",
    question: "인라인 뷰(Inline View)에 대한 설명으로 옳지 않은 것은?",
    choices: [
      { num: 1, text: "FROM 절에 서브쿼리를 사용하여 가상 테이블처럼 활용한다." },
      { num: 2, text: "ORDER BY를 사용할 수 있다." },
      { num: 3, text: "메인 쿼리의 컬럼을 인라인 뷰 안에서 자유롭게 참조할 수 있다." },
      { num: 4, text: "인라인 뷰에는 별칭(Alias)을 지정해야 한다." },
    ],
    answer: 3,
    explanation:
      "인라인 뷰는 독립적으로 실행되므로 메인 쿼리의 컬럼을 안에서 참조할 수 없다. (LATERAL 조인을 사용하면 가능하지만 SQLD 시험 범위 외) ORDER BY는 인라인 뷰 안에서 사용 가능하며, 별칭 지정은 필수다.",
    tags: ["인라인뷰", "FROM절"],
  },
  {
    id: "subquery-009",
    chapterId: "2-2-1",
    difficulty: "중",
    question: "다음 WHERE 조건을 풀어 쓴 것으로 올바른 것은?",
    code: "WHERE (부서ID, 직급) IN (('D01', '과장'), ('D02', '대리'))",
    choices: [
      { num: 1, text: "(부서ID='D01' OR 직급='과장') AND (부서ID='D02' OR 직급='대리')" },
      { num: 2, text: "(부서ID='D01' AND 직급='과장') OR (부서ID='D02' AND 직급='대리')" },
      { num: 3, text: "부서ID IN ('D01','D02') AND 직급 IN ('과장','대리')" },
      { num: 4, text: "(부서ID='D01' OR 직급='과장') OR (부서ID='D02' OR 직급='대리')" },
    ],
    answer: 2,
    explanation:
      "다중 컬럼 IN: 괄호 쌍 내부는 AND(두 컬럼이 모두 일치), 괄호 쌍 사이는 OR(어느 쌍이든 일치하면 됨). 즉, (부서ID='D01' AND 직급='과장') OR (부서ID='D02' AND 직급='대리')와 동일하다.",
    tags: ["다중컬럼서브쿼리", "IN"],
  },
  {
    id: "subquery-010",
    chapterId: "2-2-1",
    difficulty: "상",
    question: "다음 SQL의 실행 결과로 올바른 것은? (사원 테이블: 김철수 D01/5000만, 이영희 D01/3500만, 박민수 D02/5200만, 강다혜 NULL/1800만)",
    code: "SELECT 이름 FROM 사원\nWHERE 부서ID NOT IN (SELECT 부서ID FROM 사원 WHERE 이름 = '강다혜');",
    choices: [
      { num: 1, text: "김철수, 이영희, 박민수가 출력된다." },
      { num: 2, text: "강다혜를 제외한 모든 사원이 출력된다." },
      { num: 3, text: "아무 행도 출력되지 않는다." },
      { num: 4, text: "오류가 발생한다." },
    ],
    answer: 3,
    explanation:
      "강다혜의 부서ID는 NULL이다. 서브쿼리 결과가 NULL을 포함하면 NOT IN 조건에서 'X NOT IN (..., NULL)'은 항상 UNKNOWN이 되어 아무 행도 반환되지 않는다.",
    tags: ["NOT IN", "NULL", "함정"],
  },

  // ── JOIN (2-1-4) ──────────────────────────────────────────────
  {
    id: "join-001",
    chapterId: "2-1-4",
    difficulty: "빈출",
    question: "OUTER JOIN에 대한 설명으로 옳은 것은?",
    choices: [
      { num: 1, text: "두 테이블에서 JOIN 조건을 만족하는 행만 반환한다." },
      { num: 2, text: "LEFT OUTER JOIN은 왼쪽 테이블의 모든 행을 반환하고, 오른쪽에서 일치하지 않으면 NULL을 채운다." },
      { num: 3, text: "FULL OUTER JOIN은 Oracle에서 지원되지 않는다." },
      { num: 4, text: "OUTER JOIN에서는 ON 절 대신 WHERE 절만 사용해야 한다." },
    ],
    answer: 2,
    explanation:
      "LEFT OUTER JOIN은 왼쪽(기준) 테이블의 모든 행을 반환하며, 오른쪽 테이블에서 일치하는 행이 없으면 NULL로 채운다. ①은 INNER JOIN의 설명이다.",
    tags: ["OUTER JOIN", "LEFT JOIN", "NULL"],
  },
  {
    id: "join-002",
    chapterId: "2-1-4",
    difficulty: "중",
    question: "Oracle 전용 외부 조인 표기법으로 올바른 것은?",
    choices: [
      { num: 1, text: "SELECT * FROM A LEFT JOIN B ON A.ID = B.ID" },
      { num: 2, text: "SELECT * FROM A, B WHERE A.ID = B.ID(+)" },
      { num: 3, text: "SELECT * FROM A OUTER JOIN B ON A.ID = B.ID" },
      { num: 4, text: "SELECT * FROM A, B WHERE A.ID(+) = B.ID(+)" },
    ],
    answer: 2,
    explanation:
      "Oracle의 (+) 표기법은 데이터가 없는 쪽(NULL이 채워지는 쪽)에 붙인다. 'A.ID = B.ID(+)'는 B 쪽에 (+)가 있으므로 A가 기준인 LEFT OUTER JOIN과 동일하다. ④처럼 양쪽에 (+)를 붙이는 것은 허용되지 않는다.",
    tags: ["OUTER JOIN", "Oracle", "(+)"],
  },

  // ── GROUP BY / 집계함수 (2-1-3) ──────────────────────────────────
  {
    id: "groupby-001",
    chapterId: "2-1-3",
    difficulty: "빈출",
    question: "다음 SQL 실행 시 오류가 발생하는 이유로 옳은 것은?",
    code: "SELECT 부서ID, 이름, COUNT(*)\nFROM 사원\nGROUP BY 부서ID;",
    choices: [
      { num: 1, text: "COUNT(*)는 GROUP BY와 함께 사용할 수 없다." },
      { num: 2, text: "SELECT 절에 GROUP BY에 없는 컬럼(이름)이 있다." },
      { num: 3, text: "FROM 절에 별칭을 지정하지 않아서 오류가 발생한다." },
      { num: 4, text: "GROUP BY 다음에 ORDER BY가 없어서 오류가 발생한다." },
    ],
    answer: 2,
    explanation:
      "GROUP BY 사용 시 SELECT 절에는 GROUP BY에 포함된 컬럼 또는 집계함수만 올 수 있다. '이름' 컬럼은 GROUP BY에 없으므로 오류가 발생한다.",
    tags: ["GROUP BY", "오류"],
  },
  {
    id: "groupby-002",
    chapterId: "2-1-3",
    difficulty: "중",
    question: "WHERE 절과 HAVING 절의 차이에 대한 설명으로 옳은 것은?",
    choices: [
      { num: 1, text: "WHERE 절은 집계 함수 결과에 조건을 걸 때 사용한다." },
      { num: 2, text: "HAVING 절은 GROUP BY 없이도 항상 사용 가능하다." },
      { num: 3, text: "WHERE 절은 행 단위 필터, HAVING 절은 그룹 단위 필터다." },
      { num: 4, text: "HAVING 절은 SELECT 절보다 먼저 실행된다." },
    ],
    answer: 3,
    explanation:
      "WHERE는 그룹화 이전에 개별 행을 필터링하며, HAVING은 GROUP BY로 그룹화된 결과에 조건을 거는 데 사용된다. 집계함수(SUM, COUNT 등)를 조건으로 쓰려면 HAVING을 사용해야 한다.",
    tags: ["WHERE", "HAVING", "GROUP BY"],
  },

  // ── 단일행 함수 (2-1-2) ──────────────────────────────────────────
  {
    id: "func-001",
    chapterId: "2-1-2",
    difficulty: "빈출",
    question: "다음 중 NULL 처리 함수와 그 설명이 올바르게 연결된 것은?",
    choices: [
      { num: 1, text: "NVL(A, B) — A가 NULL이 아니면 B, NULL이면 A를 반환" },
      { num: 2, text: "NULLIF(A, B) — A와 B가 같으면 NULL, 다르면 A를 반환" },
      { num: 3, text: "COALESCE(A, B, C) — A, B, C 중 가장 큰 값을 반환" },
      { num: 4, text: "NVL2(A, B, C) — A가 NULL이면 B, NULL이 아니면 C를 반환" },
    ],
    answer: 2,
    explanation:
      "NULLIF(A, B)는 A와 B가 같으면 NULL을 반환하고, 다르면 A를 반환한다. NVL(A, B)는 A가 NULL이면 B를 반환한다. COALESCE는 인수 중 첫 번째 NULL이 아닌 값을 반환한다. NVL2(A, B, C)는 A가 NULL이 아니면 B, NULL이면 C를 반환한다.",
    choiceExplanations: {
      1: "오답. NVL(A, B)는 A가 NULL이면 B를 반환한다.",
      2: "정답.",
      3: "오답. COALESCE는 첫 번째 NULL이 아닌 값을 반환한다.",
      4: "오답. NVL2(A, B, C)는 A가 NULL이 아니면 B, NULL이면 C를 반환한다.",
    },
    tags: ["NVL", "NULLIF", "COALESCE", "NULL처리"],
  },

  // ── 윈도우 함수 (2-2-4) ──────────────────────────────────────────
  {
    id: "window-001",
    chapterId: "2-2-4",
    difficulty: "빈출",
    question: "RANK()와 DENSE_RANK()의 차이에 대한 설명으로 옳은 것은? (급여 순위: 5000, 5000, 4000)",
    choices: [
      { num: 1, text: "RANK()는 1,2,3 / DENSE_RANK()는 1,2,3을 반환한다." },
      { num: 2, text: "RANK()는 1,1,2 / DENSE_RANK()는 1,1,3을 반환한다." },
      { num: 3, text: "RANK()는 1,1,3 / DENSE_RANK()는 1,1,2를 반환한다." },
      { num: 4, text: "RANK()와 DENSE_RANK()는 항상 동일한 결과를 반환한다." },
    ],
    answer: 3,
    explanation:
      "RANK()는 동점 처리 후 다음 순위를 건너뛴다(1,1,3). DENSE_RANK()는 건너뛰지 않고 연속된 순위를 부여한다(1,1,2). ROW_NUMBER()는 동점이어도 고유한 순번을 부여한다(1,2,3).",
    tags: ["RANK", "DENSE_RANK", "윈도우함수"],
  },
  {
    id: "window-002",
    chapterId: "2-2-4",
    difficulty: "중",
    question: "다음 윈도우 함수에 대한 설명으로 옳은 것은?",
    code: "SELECT 이름, 급여,\n       SUM(급여) OVER (ORDER BY 급여) AS 누적합\nFROM 사원;",
    choices: [
      { num: 1, text: "모든 사원의 급여 합계를 동일하게 출력한다." },
      { num: 2, text: "급여 기준으로 정렬하여 현재 행까지의 누적 합계를 출력한다." },
      { num: 3, text: "파티션별로 급여 합계를 출력한다." },
      { num: 4, text: "OVER 절 없이도 SUM 함수는 누적합을 계산한다." },
    ],
    answer: 2,
    explanation:
      "OVER (ORDER BY 급여)는 급여 오름차순으로 정렬하여 현재 행까지의 누적 합계를 계산한다. PARTITION BY가 없으면 전체 데이터가 하나의 파티션이 된다.",
    tags: ["SUM OVER", "누적합", "윈도우함수"],
  },

  // ── DDL (2-3-1) ──────────────────────────────────────────────
  {
    id: "ddl-001",
    chapterId: "2-3-1",
    difficulty: "빈출",
    question: "DDL 명령어에 대한 설명으로 옳지 않은 것은?",
    choices: [
      { num: 1, text: "CREATE TABLE로 테이블을 생성한다." },
      { num: 2, text: "DROP TABLE은 테이블 구조와 데이터를 모두 삭제하며, ROLLBACK이 불가능하다." },
      { num: 3, text: "TRUNCATE는 테이블 구조는 남기고 데이터만 삭제하며, ROLLBACK이 가능하다." },
      { num: 4, text: "ALTER TABLE로 컬럼을 추가하거나 데이터 타입을 변경할 수 있다." },
    ],
    answer: 3,
    explanation:
      "TRUNCATE는 DDL 명령어이므로 자동 COMMIT이 되어 ROLLBACK이 불가능하다. DELETE(DML)는 ROLLBACK이 가능하다. TRUNCATE는 테이블 구조는 유지하면서 데이터를 전량 삭제한다.",
    choiceExplanations: {
      3: "오답. TRUNCATE는 DDL이라 AUTO COMMIT되어 ROLLBACK 불가.",
    },
    tags: ["TRUNCATE", "DDL", "ROLLBACK"],
  },

  // ── DML · TCL (2-3-2) ──────────────────────────────────────────
  {
    id: "tcl-001",
    chapterId: "2-3-2",
    difficulty: "빈출",
    question: "TCL(Transaction Control Language)에 대한 설명으로 옳지 않은 것은?",
    choices: [
      { num: 1, text: "COMMIT은 트랜잭션의 변경사항을 영구적으로 저장한다." },
      { num: 2, text: "ROLLBACK은 트랜잭션 시작 시점 또는 SAVEPOINT까지 되돌린다." },
      { num: 3, text: "SAVEPOINT를 설정하면 해당 지점까지만 ROLLBACK할 수 있다." },
      { num: 4, text: "DDL 문장(CREATE, DROP 등)은 ROLLBACK으로 취소할 수 있다." },
    ],
    answer: 4,
    explanation:
      "DDL 명령어는 실행 시 자동으로 COMMIT되므로 ROLLBACK으로 취소할 수 없다. DML(INSERT, UPDATE, DELETE)은 COMMIT 전까지 ROLLBACK이 가능하다.",
    tags: ["TCL", "ROLLBACK", "DDL", "자동COMMIT"],
  },

  // ── 데이터 모델링 (1-1-1) ──────────────────────────────────────────
  {
    id: "modeling-001",
    chapterId: "1-1-1",
    difficulty: "빈출",
    question: "엔터티(Entity)에 대한 설명으로 옳지 않은 것은?",
    choices: [
      { num: 1, text: "업무에서 관리가 필요한 관심사의 집합이다." },
      { num: 2, text: "엔터티는 반드시 속성을 가져야 한다." },
      { num: 3, text: "엔터티는 다른 엔터티와 최소 한 개 이상의 관계를 가져야 한다." },
      { num: 4, text: "인스턴스가 하나뿐이어도 엔터티가 될 수 있다." },
    ],
    answer: 4,
    explanation:
      "엔터티는 2개 이상의 인스턴스 집합이어야 한다. 인스턴스가 하나뿐이면 엔터티로 정의하기 어렵다. 또한 엔터티는 반드시 속성을 가지고, 다른 엔터티와 관계를 가져야 한다.",
    tags: ["엔터티", "인스턴스", "데이터모델링"],
  },
  {
    id: "modeling-002",
    chapterId: "1-1-1",
    difficulty: "중",
    question: "식별자(Identifier)에 대한 설명으로 옳은 것은?",
    choices: [
      { num: 1, text: "주식별자는 여러 개의 속성으로 구성될 수 없다." },
      { num: 2, text: "외부식별자(FK)는 다른 엔터티의 주식별자를 참조한다." },
      { num: 3, text: "주식별자 속성에는 NULL 값이 허용된다." },
      { num: 4, text: "대리식별자(Surrogate Key)는 업무적 의미를 가지는 자연 키다." },
    ],
    answer: 2,
    explanation:
      "외부식별자(FK, Foreign Key)는 다른 엔터티의 주식별자를 참조하여 엔터티 간 관계를 표현한다. 주식별자는 NULL 불가, 복합 속성 허용, 유일성·최소성을 만족해야 한다. 대리식별자는 업무 의미 없이 시스템이 생성하는 키다.",
    tags: ["식별자", "PK", "FK", "대리키"],
  },

  // ── 정규화 (1-1-2) ──────────────────────────────────────────────
  {
    id: "norm-001",
    chapterId: "1-1-2",
    difficulty: "빈출",
    question: "제2정규형(2NF)에 대한 설명으로 옳은 것은?",
    choices: [
      { num: 1, text: "모든 속성이 기본키에 완전 함수 종속되어야 한다." },
      { num: 2, text: "이행적 함수 종속을 제거해야 한다." },
      { num: 3, text: "다치 종속을 제거해야 한다." },
      { num: 4, text: "조인 종속을 제거해야 한다." },
    ],
    answer: 1,
    explanation:
      "제2정규형은 제1정규형을 만족하면서, 모든 비주요 속성이 기본키에 완전 함수 종속되어야 한다. 부분 함수 종속을 제거하는 것이 핵심이다. ②는 3NF, ③은 4NF, ④는 5NF(PJNF)의 설명이다.",
    tags: ["정규화", "2NF", "완전함수종속"],
  },

  // ── 집합 연산자 (2-2-2) ──────────────────────────────────────────
  {
    id: "set-001",
    chapterId: "2-2-2",
    difficulty: "빈출",
    question: "UNION과 UNION ALL의 차이에 대한 설명으로 옳은 것은?",
    choices: [
      { num: 1, text: "UNION은 중복 행을 포함하고, UNION ALL은 중복을 제거한다." },
      { num: 2, text: "UNION은 중복을 제거하므로 UNION ALL보다 성능이 좋다." },
      { num: 3, text: "UNION ALL은 중복을 제거하지 않아 UNION보다 빠를 수 있다." },
      { num: 4, text: "UNION과 UNION ALL의 결과 행 수는 항상 동일하다." },
    ],
    answer: 3,
    explanation:
      "UNION은 중복 행을 제거하기 위해 정렬 작업이 추가로 발생하므로 성능이 더 낮다. UNION ALL은 중복을 그대로 유지하므로 정렬 없이 빠르게 처리된다. 중복이 없음이 보장될 때는 UNION ALL 사용을 권장한다.",
    tags: ["UNION", "UNION ALL", "중복제거", "성능"],
  },
  {
    id: "set-002",
    chapterId: "2-2-2",
    difficulty: "중",
    question: "집합 연산자 사용 시 제약 조건으로 옳은 것은?",
    choices: [
      { num: 1, text: "각 SELECT 문의 컬럼 수가 달라도 된다." },
      { num: 2, text: "각 SELECT 문의 컬럼 데이터 타입이 호환되어야 한다." },
      { num: 3, text: "ORDER BY는 각 SELECT 문마다 사용할 수 있다." },
      { num: 4, text: "INTERSECT는 Oracle에서 지원되지 않는다." },
    ],
    answer: 2,
    explanation:
      "집합 연산자 사용 시 각 SELECT 문의 컬럼 수가 동일해야 하고, 대응되는 컬럼의 데이터 타입이 호환되어야 한다. ORDER BY는 마지막 SELECT 문 뒤에만 한 번 사용할 수 있다. INTERSECT와 MINUS는 Oracle에서 모두 지원된다.",
    tags: ["UNION", "집합연산자", "제약조건"],
  },
];
