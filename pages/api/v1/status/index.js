import database from "../../../../infra/database";

async function status(request, response) {
  const result = await database.query("SELECT NOW();");
  console.log(result.rows);
  response.status(200).json({ status: "ok" });
}

export default status;
