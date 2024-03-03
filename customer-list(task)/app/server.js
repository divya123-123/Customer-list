const express = require("express");

const app = express();

const cors = require("cors");

const pool = require("./db");

//middleware

app.use(cors());

app.use(express.json());

//Routes//
app.get("/records", async (req, res) => {
  const Results = {};

  try {
    const searchData = req.query.searchData;

    const sortData = req.query.sortData;

    const pageData = req.query.pageData;

    const offlimit = (pageData - 1) * 20;

    let sortBy = "sno";

    if (sortData === "time") {
      sortBy = "created_at::TIME";
    } else if (sortData === "date") {
      sortBy = "DATE(created_at)";
    }

    //query to get datafrom databasee

    const newData = await pool.query(
      `SELECT * FROM records WHERE location ILIKE $1 OR customer_name ILIKE $2 ORDER BY ${sortBy} 
OFFSET ${offlimit} LIMIT 20;`,

      ["%" + searchData + "%", "%" + searchData + "%"]
    );

    Results["results"] = newData.rows;
    res.status(200).json(Results);
  } catch (err) {
    console.error(err.message);
  }
});

const port = process.env.PORT || 2000;

app.listen(port, () => {
  console.log("server has started on port 2000");
});
