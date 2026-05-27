export interface Chapter {
  id: string;
  subject: 1 | 2;
  title: string;
  slug: string;
  description: string;
  questionCount?: number;
}

export const CHAPTERS: Chapter[] = [
  // 1과목
  {
    id: "1-1-1",
    subject: 1,
    title: "데이터 모델링의 이해",
    slug: "data-modeling-basics",
    description: "데이터 모델의 개념, 엔터티, 속성, 관계, 식별자",
  },
  {
    id: "1-1-2",
    subject: 1,
    title: "데이터 모델과 SQL",
    slug: "data-model-and-sql",
    description: "정규화, 반정규화, 대용량 데이터, 성능 SQL",
  },
  // 2과목 — SQL 기본
  {
    id: "2-1-1",
    subject: 2,
    title: "SELECT 문 · WHERE · ORDER BY",
    slug: "select-where-orderby",
    description: "기본 SELECT, 조건절, 정렬, NULL 처리",
  },
  {
    id: "2-1-2",
    subject: 2,
    title: "단일행 함수",
    slug: "single-row-functions",
    description: "문자·숫자·날짜·변환·NULL 처리 함수",
  },
  {
    id: "2-1-3",
    subject: 2,
    title: "GROUP BY · HAVING · 집계함수",
    slug: "groupby-having",
    description: "집계함수, GROUP BY, HAVING 절",
  },
  {
    id: "2-1-4",
    subject: 2,
    title: "JOIN",
    slug: "join",
    description: "INNER JOIN, OUTER JOIN, SELF JOIN, CROSS JOIN",
  },
  // 2과목 — SQL 활용
  {
    id: "2-2-1",
    subject: 2,
    title: "서브쿼리",
    slug: "subquery",
    description: "스칼라·인라인 뷰·중첩 서브쿼리, IN/ANY/ALL/EXISTS",
  },
  {
    id: "2-2-2",
    subject: 2,
    title: "집합 연산자",
    slug: "set-operators",
    description: "UNION, UNION ALL, INTERSECT, MINUS",
  },
  {
    id: "2-2-3",
    subject: 2,
    title: "그룹 함수",
    slug: "group-functions",
    description: "ROLLUP, CUBE, GROUPING SETS, GROUPING 함수",
  },
  {
    id: "2-2-4",
    subject: 2,
    title: "윈도우 함수",
    slug: "window-functions",
    description: "RANK, ROW_NUMBER, LAG/LEAD, SUM OVER 등",
  },
  {
    id: "2-2-5",
    subject: 2,
    title: "계층형 질의",
    slug: "hierarchical-query",
    description: "CONNECT BY, START WITH, LEVEL, SYS_CONNECT_BY_PATH",
  },
  // 2과목 — 관리 구문
  {
    id: "2-3-1",
    subject: 2,
    title: "DDL",
    slug: "ddl",
    description: "CREATE, ALTER, DROP, RENAME, TRUNCATE",
  },
  {
    id: "2-3-2",
    subject: 2,
    title: "DML · TCL",
    slug: "dml-tcl",
    description: "INSERT, UPDATE, DELETE, MERGE, COMMIT, ROLLBACK, SAVEPOINT",
  },
  {
    id: "2-3-3",
    subject: 2,
    title: "DCL",
    slug: "dcl",
    description: "GRANT, REVOKE, 권한 관리",
  },
];
