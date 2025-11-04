// Next.js의 서버 컴포넌트로, URL 경로의 동적 파라미터(id)에 따라 데이터를 가져오는 페이지입니다.
export default async function Read({ params }) {
  // Next.js 15 이상에서는 params가 Promise로 제공되므로, await으로 풀어서 id 값을 꺼냅니다.
  const { id } = await params;

  // 해당 id를 이용해 로컬 서버에서 topic 데이터를 요청합니다.
  // cache: "no-store" → 매번 서버에서 새 데이터를 가져오도록 지정 (SSR 시 최신 데이터 유지)
  const resp = await fetch(`http://localhost:9999/topics/${id}`, {
    cache: "no-store",
  });

  // fetch 요청이 실패했을 경우 (404, 500 등), 에러를 발생시켜 Next.js의 에러 바운더리로 전달합니다.
  if (!resp.ok) {
    throw new Error(`Failed to fetch topic: ${resp.statusText}`);
  }

  // 응답이 성공하면 JSON 형식으로 변환하여 topic 객체를 얻습니다.
  const topic = await resp.json();

  // 가져온 topic 데이터를 화면에 렌더링합니다.
  // topic.title → 제목, topic.body → 내용
  return (
    <div>
      <h1>{topic.title}</h1>
      <p>{topic.body}</p>
    </div>
  );
}
