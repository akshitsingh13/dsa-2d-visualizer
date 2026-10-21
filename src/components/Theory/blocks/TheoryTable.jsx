import { renderRichText } from "./RichText";
import "./TheoryTable.css";

function TheoryTable({ block }) {
  return (
    <figure className="theory-table-wrap">
      <table className="theory-table">
        {block.caption ? <caption>{block.caption}</caption> : null}

        <thead>
          <tr>
            {block.headers.map((header, index) => (
              <th key={index} scope="col">
                {renderRichText(header)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {block.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{renderRichText(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

export default TheoryTable;
