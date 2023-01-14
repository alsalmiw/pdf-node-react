import React from "react";
import Colors from "./Colors";

const GenerateHtml = ({ field }) => {
  return (
    <div>
      <Question question={field.question} />
      <SimpleInput value={field.value} />
    </div>
  );
};
export default GenerateHtml;

const SimpleInput = ({ value }) => {
  return (
    <p
      style={{
        display: "flex",
        justifyContent: "flex-start",
        border: "1px solid",
        borderColor: Colors.lineGreyMedium,
        paddingTop: "10px",
        paddingBottom: "-5px",
        paddingLeft: "5px",
        borderRadius: 5,
        margin: 12,
        marginVertical: 5,
        width: "50%",
        minHeight: 20,
        break: "before",
        fontSize: 12,
        color: Colors.darkGrey,
        pageBreakInside: "avoid",
      }}
    >
      <span>{value}</span>
    </p>
  );
};
const Paragraph = ({ value }) => {
  const styles = {
    paragraph: {
      border: 1,
      borderColor: Colors.lineGreyMedium,
      padding: 5,
      borderRadius: 5,
      margin: 12,
      marginVertical: 5,
      width: "85%",
      minHeight: 120,
      break: "before",
      fontSize: 12,
      color: Colors.darkGrey,
    },
  };
  return <div style={styles.paragraph}>{value}</div>;
};

const Question = ({ question }) => {
  return (
    <p
      style={{
        display: "flex",
        justifyContent: "flex-start",
        color: Colors.darkGrey,
        fontSize: 12,
        fontWeight: "bold",
        margin: 5,
        pageBreakInside: "avoid",
      }}
    >
      {question}
    </p>
  );
};
