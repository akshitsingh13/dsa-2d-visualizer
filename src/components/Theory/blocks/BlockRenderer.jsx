import Paragraph from "./Paragraph";
import TheoryList from "./TheoryList";
import TheoryCode from "./TheoryCode";
import TheoryTable from "./TheoryTable";
import Callout from "./Callout";
import Trace from "./Trace";
import ComplexityTable from "./ComplexityTable";

function BlockRenderer({ block, theoryId }) {
  switch (block.type) {
    case "paragraph":
      return <Paragraph block={block} />;
    case "list":
      return <TheoryList block={block} />;
    case "code":
      return <TheoryCode block={block} />;
    case "table":
      return <TheoryTable block={block} />;
    case "callout":
      return <Callout block={block} />;
    case "trace":
      return <Trace block={block} />;
    case "complexityTable":
      return <ComplexityTable theoryId={theoryId} />;
    default:
      return null;
  }
}

export default BlockRenderer;
