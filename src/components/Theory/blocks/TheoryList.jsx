import { renderRichText } from "./RichText";

function TheoryList({ block }) {
  const ListTag = block.ordered ? "ol" : "ul";

  return (
    <ListTag>
      {block.items.map((item, index) => (
        <li key={index}>{renderRichText(item)}</li>
      ))}
    </ListTag>
  );
}

export default TheoryList;
