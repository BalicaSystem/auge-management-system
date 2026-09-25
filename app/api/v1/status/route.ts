import database from "@/infra/database";

export async function GET(request: Request) {
  const result = await database.query("SELECT 1 + 1 as SUM;");
  console.log(result.rows);
  return new Response(JSON.stringify({ status: "OK" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
