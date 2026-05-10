import React from "react";

export default function Table({

  columns = [],

  data = [],

}) {

  return (

    <div style={wrapper}>

      <table style={table}>

        <thead>

          <tr>

            {columns.map(
              (col, index) => (

                <th
                  key={index}
                  style={th}
                >
                  {col}
                </th>
              )
            )}

          </tr>

        </thead>

        <tbody>

          {data.length === 0 ? (

            <tr>

              <td
                colSpan={
                  columns.length
                }
                style={empty}
              >
                No Data Found
              </td>

            </tr>

          ) : (

            data.map(
              (row, index) => (

                <tr
                  key={index}
                  style={tr}
                >

                  {columns.map(
                    (
                      col,
                      idx
                    ) => (

                      <td
                        key={idx}
                        style={td}
                      >

                        {
                          row[
                            col
                              .toLowerCase()
                          ]
                        }

                      </td>
                    )
                  )}

                </tr>
              )
            )
          )}

        </tbody>

      </table>

    </div>
  );
}

/* ================= STYLES ================= */

const wrapper = {

  width: "100%",

  overflowX: "auto",

  borderRadius: "16px",
};

const table = {

  width: "100%",

  borderCollapse:
    "collapse",

  background: "#1e293b",

  color: "white",

  borderRadius: "16px",

  overflow: "hidden",
};

const th = {

  background: "#0f172a",

  padding: "16px",

  textAlign: "left",

  fontSize: "15px",

  borderBottom:
    "1px solid rgba(255,255,255,0.1)",
};

const tr = {

  transition: "0.3s",
};

const td = {

  padding: "16px",

  borderBottom:
    "1px solid rgba(255,255,255,0.05)",

  color: "#cbd5e1",
};

const empty = {

  padding: "30px",

  textAlign: "center",

  color: "#94a3b8",
};