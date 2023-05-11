import React from 'react';

interface SuggestedQuestionProps {
  question: string;
  onClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    question: string
  ) => void;
  disabled: boolean;
}

const SuggestedQuestion: React.FC<SuggestedQuestionProps> = ({
  question,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={`${
        disabled ? 'bg-gray-400 cursor' : 'bg-gray-300 hover:bg-gray-400'
      } text-gray-800 font-medium py-2 px-4 rounded-lg mr-2 mb-4 w-full`}
      onClick={(event) => onClick(event, question)}
      disabled={disabled}
    >
      {question}
    </button>
  );
};

export default SuggestedQuestion;

// implementation
// <h2 className="text-gray-800 font-medium text-lg mt-4 mb-4">
//         Suggested Questions:
//       </h2>
//       <div className="flex flex-wrap justify-center">
//         {suggestedQuestions.map((question) => (
//           <div className="w-full mb-2" key={question}>
//             <SuggestedQuestion
//               question={question}
//               onClick={(
//                 event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
//                 question: string
//               ) => {
//                 if (!loading) {
//                   handleMessageSubmit(event, question);
//                 }
//               }}
//               disabled={loading}
//             />
//           </div>
//         ))}
//       </div>
