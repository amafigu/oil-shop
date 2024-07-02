export const faqKeys = [
  "difuserRoomSizeQuestion",
  "difuserRoomSizeAnswer",
  "howDifuserWorksQuestion",
  "howDifuserWorksAnswer",
  "thirdQuestion",
  "thirdAnswer",
  "fourthQuestion",
  "fourthAnswer",
  "addBodyOilAndUsedAsCosmeticQuestion",
  "addBodyOilAndUsedAsCosmeticAnswer",
  "sixthQuestion",
  "sixthAnswer",
  "seventhQuestion",
  "seventhAnswer",
  "eighthQuestion",
  "eighthAnswer",
  "ninthQuestion",
  "ninthAnswer",
  "tenthQuestion",
  "tenthAnswer",
] as const

export type FaqKey = (typeof faqKeys)[number]

export interface QuestionAnswer {
  question: FaqKey
  answer: FaqKey
}

export const questionsAndAnswers: QuestionAnswer[] = [
  { question: "difuserRoomSizeQuestion", answer: "difuserRoomSizeAnswer" },
  { question: "howDifuserWorksQuestion", answer: "howDifuserWorksAnswer" },
  { question: "thirdQuestion", answer: "thirdAnswer" },
  { question: "fourthQuestion", answer: "fourthAnswer" },
  {
    question: "addBodyOilAndUsedAsCosmeticQuestion",
    answer: "addBodyOilAndUsedAsCosmeticAnswer",
  },
  { question: "sixthQuestion", answer: "sixthAnswer" },
  { question: "seventhQuestion", answer: "seventhAnswer" },
  { question: "eighthQuestion", answer: "eighthAnswer" },
  { question: "ninthQuestion", answer: "ninthAnswer" },
  { question: "tenthQuestion", answer: "tenthAnswer" },
]
