import React from 'react';

type SuggestedQuestionProps = {
  question: string;
  onClick: (question: string) => void;
};

const SuggestedQuestion: React.FC<SuggestedQuestionProps> = ({
  question,
  onClick,
}) => {
  return (
    <div
      className="p-2 my-2 cursor-pointer border border-gray-300 rounded-md shadow-md hover:shadow-lg"
      onClick={() => onClick(question)}
    >
      <p className="text-lg font-medium text-gray-800">{question}</p>
    </div>
  );
};

export default SuggestedQuestion;
