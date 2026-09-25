import database from "@/infra/database";

export async function GET(request: Request) {
  const updatedAt = new Date().toISOString();

  const databaseName = process.env.POSTGRES_DB;
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionValue =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;

  return new Response(
    JSON.stringify({
      updated_at: updatedAt,
      dependecies: {
        database: {
          version: databaseVersionValue,
          max_connections: parseInt(databaseMaxConnectionValue),
          opened_connections: databaseOpenedConnectionsValue,
        },
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  );
}
