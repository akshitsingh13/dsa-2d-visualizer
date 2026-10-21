import { renderRichText } from "./RichText";

function Paragraph({ block }) {
  return <p>{renderRichText(block.text)}</p>;
}

export default Paragraph;
