export default async function Read({ params }) {
  const { id } = await params;

  return (
    <>
      <h2>Read</h2>
      parameter : {id}
    </>
  );
}
