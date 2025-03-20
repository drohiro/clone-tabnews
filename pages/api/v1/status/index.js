import database from "infra/database.js";

async function status(request, response) {
  // This is the current date and time in ISO format
  const updateAt = new Date().toISOString();

  // This is the query that will return the version of the database
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult?.rows[0]?.server_version;

  // This is the query that will return the maximum number of connections
  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult?.rows[0]?.max_connections;

  // This is the query that will return the current number of connections
  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult?.rows[0]?.count;

  // This is the response that will be sent to the client
  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
