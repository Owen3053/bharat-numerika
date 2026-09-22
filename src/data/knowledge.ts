export type KnowledgeTopic =
  | "number-system"
  | "zero"
  | "place"
  | "aryabhata"
  | "brahmagupta"
  | "bhaskara"
  | "katapayadi"
  | "pingala"
  | "modular"
  | "algorithmic"
  | "modern-it";

export type KnowledgeItem = {
  id: string;
  topic: KnowledgeTopic;
  title: string;
  keywords: string[];
  summary: string;
  explanation: string;
  examples: string[];
  examPoints: string[];
  modernConnection: string;
};

export const KNOWLEDGE_BASE: KnowledgeItem[] = [
  {
    id: "number-system",
    topic: "number-system",
    title: "Indian Number System",
    keywords: [
      "number system",
      "indian numerals",
      "decimal",
      "base ten",
      "digits",
      "numeration",
      "numbers",
    ],
    summary:
      "The Indian mathematical tradition developed and transmitted an efficient decimal place-value system in which the position of a digit determines its value.",
    explanation:
      "The decimal system uses ten digits, 0 through 9, and assigns value according to position. For example, in 5,432 the digit 5 represents thousands, 4 represents hundreds, 3 represents tens and 2 represents units. This positional structure makes large numbers easier to represent and calculate.",
    examples: [
      "5,432 = 5×1000 + 4×100 + 3×10 + 2",
      "The same digit can have different values depending on its position.",
    ],
    examPoints: [
      "Decimal system uses base 10.",
      "Place value gives a digit its positional value.",
      "Zero acts as a placeholder and also has numerical meaning.",
      "The system makes arithmetic with large numbers more systematic.",
    ],
    modernConnection:
      "Positional representation is fundamental to how numbers are represented and manipulated in modern computing and digital systems.",
  },

  {
    id: "zero",
    topic: "zero",
    title: "Zero in Indian Mathematics",
    keywords: [
      "zero",
      "shunya",
      "śūnya",
      "0",
      "origin of zero",
      "history of zero",
      "importance of zero",
      "zero mathematics",
    ],
    summary:
      "Zero became especially powerful when combined with a positional place-value system. Indian mathematical sources also developed explicit arithmetic rules involving zero.",
    explanation:
      "The history of zero is a long development rather than the work of one individual. The Indian mathematical tradition played a major role in developing zero as both a placeholder in positional notation and a number that could participate in arithmetic. Brahmagupta's Brahmasphutasiddhanta, composed in the 7th century, gave systematic rules for arithmetic involving zero and negative numbers.",
    examples: [
      "In 105, zero shows that there are no tens.",
      "7 + 0 = 7.",
      "7 × 0 = 0.",
      "In positional notation, zero can preserve the position of other digits.",
    ],
    examPoints: [
      "Zero is important both as a placeholder and as a number.",
      "Its use strengthened the positional decimal system.",
      "Brahmagupta gave systematic arithmetic rules involving zero.",
      "Zero made representation and calculation with large numbers more efficient.",
      "The development of zero should be understood as a historical process rather than a single invention.",
    ],
    modernConnection:
      "Zero is essential in mathematics, algebra, digital representation and computer systems. Binary computing also uses zero as one of its two basic symbols.",
  },

  {
    id: "place",
    topic: "place",
    title: "Place Value",
    keywords: [
      "place value",
      "positional notation",
      "position",
      "digit position",
      "positional system",
      "units",
      "tens",
      "hundreds",
      "thousands",
    ],
    summary:
      "Place value means that the value of a digit depends on its position in a number.",
    explanation:
      "In a positional decimal system, a digit is multiplied by a power of ten determined by its position. In 2,654, the 2 represents 2 thousands, the 6 represents 6 hundreds, the 5 represents 5 tens and the 4 represents 4 units.",
    examples: [
      "2,654 = 2×1000 + 6×100 + 5×10 + 4",
      "In 505, the zero indicates that there are no tens.",
      "The digit 5 has different values in 5, 50 and 500.",
    ],
    examPoints: [
      "Value depends on position.",
      "Decimal place values are powers of ten.",
      "Zero can act as a placeholder.",
      "Place value allows compact representation of large numbers.",
    ],
    modernConnection:
      "Positional representation is closely related to how numerical data is encoded and processed in computing.",
  },

  {
    id: "aryabhata",
    topic: "aryabhata",
    title: "Aryabhata",
    keywords: [
      "aryabhata",
      "aryabhatiya",
      "arya bhata",
      "astronomy",
      "mathematics",
      "place value",
      "pi",
      "trigonometry",
    ],
    summary:
      "Aryabhata was a major Indian mathematician and astronomer whose Aryabhatiya, composed around 499 CE, presented important mathematical and astronomical ideas.",
    explanation:
      "Aryabhata's Aryabhatiya contains work involving arithmetic, algebraic methods, geometry, trigonometry and astronomy. His work reflects a highly computational mathematical tradition. He also used a system for expressing numbers with letters, although this should not simply be equated with the later Katapayadi system.",
    examples: [
      "Aryabhata worked with arithmetic and algebraic procedures.",
      "His work included sine-related trigonometric calculations.",
      "He gave an important approximation for pi.",
    ],
    examPoints: [
      "Aryabhata was an important mathematician and astronomer.",
      "Aryabhatiya is his best-known mathematical work.",
      "His work included arithmetic, algebra, geometry and trigonometry.",
      "His mathematical methods were closely connected with astronomy.",
    ],
    modernConnection:
      "Algorithmic calculation, numerical approximation and mathematical modeling in Aryabhata's work have conceptual connections with computational mathematics today.",
  },

  {
    id: "brahmagupta",
    topic: "brahmagupta",
    title: "Brahmagupta",
    keywords: [
      "brahmagupta",
      "brahmasphutasiddhanta",
      "brahma sphuta siddhanta",
      "zero",
      "negative numbers",
      "positive numbers",
      "algebra",
    ],
    summary:
      "Brahmagupta was a major Indian mathematician and astronomer. His Brahmasphutasiddhanta contains systematic rules for arithmetic involving zero, positive numbers and negative numbers.",
    explanation:
      "Brahmagupta wrote the Brahmasphutasiddhanta in the 7th century. It contains important mathematical rules involving zero, debts and fortunes, and algebraic operations. His treatment of zero is particularly significant because it presented explicit arithmetic procedures rather than treating zero only as a placeholder.",
    examples: [
      "A positive quantity and a negative quantity can be interpreted using the language of fortune and debt.",
      "Rules were given for operations involving zero.",
      "Brahmagupta also worked on algebraic equations and astronomy.",
    ],
    examPoints: [
      "Brahmagupta was an Indian mathematician and astronomer.",
      "His major work was Brahmasphutasiddhanta.",
      "He gave systematic rules involving zero.",
      "He worked with positive and negative quantities.",
      "He made important contributions to algebra and astronomy.",
    ],
    modernConnection:
      "The systematic treatment of arithmetic rules illustrates algorithmic thinking: define operations clearly so they can be applied consistently.",
  },

  {
    id: "bhaskara",
    topic: "bhaskara",
    title: "Bhaskara II",
    keywords: [
      "bhaskara",
      "bhaskara ii",
      "bhaskaracharya",
      "lilavati",
      "siddhanta shiromani",
      "algebra",
      "astronomy",
    ],
    summary:
      "Bhaskara II was a major Indian mathematician and astronomer associated with works including Lilavati and Siddhanta Shiromani.",
    explanation:
      "Bhaskara II developed mathematical ideas in arithmetic, algebra, geometry and astronomy. Lilavati presents mathematical problems in an accessible problem-solving style, while Siddhanta Shiromani covers broader mathematical and astronomical subjects.",
    examples: [
      "Lilavati contains problems involving arithmetic and geometry.",
      "Bhaskara II worked with algebraic equations.",
      "His mathematical work was connected with astronomy.",
    ],
    examPoints: [
      "Bhaskara II was a mathematician and astronomer.",
      "Lilavati is one of his famous works.",
      "Siddhanta Shiromani is another major work.",
      "His contributions include arithmetic, algebra, geometry and astronomy.",
    ],
    modernConnection:
      "Problem-solving, abstraction and systematic calculation are central to both classical mathematics and modern computational thinking.",
  },

  {
    id: "katapayadi",
    topic: "katapayadi",
    title: "Katapayadi System",
    keywords: [
      "katapayadi",
      "katapayadi system",
      "katapay",
      "letters numbers",
      "mnemonic",
      "encoding",
      "memory",
      "sanskrit",
      "malayalam",
    ],
    summary:
      "Katapayadi refers to a family of traditional Indian mnemonic and encoding conventions in which letters are associated with numerical values.",
    explanation:
      "The Katapayadi system uses selected consonants and their associated numerical values to encode numbers into pronounceable words or phrases. Different traditions can use somewhat different conventions. One important purpose was memorization: numerical information could be represented through meaningful language.",
    examples: [
      "A number can be represented using letters whose assigned values correspond to its digits.",
      "The resulting word or phrase can be easier to memorize than a long sequence of digits.",
    ],
    examPoints: [
      "Katapayadi is a traditional mnemonic/encoding practice.",
      "Letters are associated with numerical values.",
      "It can convert numerical information into words or phrases.",
      "It demonstrates the relationship between language, memory and mathematics.",
      "Specific conventions can vary across traditions.",
    ],
    modernConnection:
      "Conceptually, Katapayadi can be compared with encoding schemes where information is represented in another symbolic form. It should not be described as a direct ancestor of modern computing.",
  },

  {
    id: "pingala",
    topic: "pingala",
    title: "Pingala and Binary-like Patterns",
    keywords: [
      "pingala",
      "chandashastra",
      "chandas",
      "laghu",
      "guru",
      "syllables",
      "binary",
      "binary like",
      "combinations",
      "patterns",
    ],
    summary:
      "Pingala's work on Sanskrit prosody involved systematic methods for arranging short and long syllables. Some of these combinatorial patterns are conceptually similar to binary representations.",
    explanation:
      "In Sanskrit prosody, short and long syllables can be treated as two categories. Pingala's Chandashastra discusses systematic ways of analyzing combinations of these syllables. Because two-state patterns can be represented using symbols such as 0 and 1, these methods are often described as binary-like. This is a conceptual comparison, not a claim that Pingala invented modern binary computing.",
    examples: [
      "A short/long pattern can be represented using two symbols.",
      "For four positions, two choices at each position give 2^4 = 16 possible patterns.",
      "Systematic generation of combinations resembles combinatorial algorithms.",
    ],
    examPoints: [
      "Pingala is associated with Sanskrit prosody.",
      "Short and long syllables form two categories.",
      "Systematic enumeration of patterns appears in the tradition.",
      "These patterns can be compared conceptually with binary combinations.",
      "The historical context is prosody, not modern computer engineering.",
    ],
    modernConnection:
      "Two-state representations and systematic generation of combinations are useful ideas in computer science, especially binary representation and combinatorial algorithms.",
  },

  {
    id: "modular",
    topic: "modular",
    title: "Modular Arithmetic",
    keywords: [
      "modular",
      "modulo",
      "mod",
      "remainder",
      "congruence",
      "clock",
      "cyclic",
      "remainders",
    ],
    summary:
      "Modular arithmetic studies numbers according to their remainders after division by a chosen modulus.",
    explanation:
      "In modular arithmetic, numbers are grouped according to the remainder they produce when divided by a modulus. For example, 125 mod 7 is 6 because 125 = 17×7 + 6. Modular arithmetic is useful for cyclic patterns and many areas of computer science.",
    examples: [
      "125 mod 7 = 6.",
      "17 mod 5 = 2.",
      "On a 12-hour clock, 15:00 corresponds to 3:00 because 15 mod 12 = 3.",
    ],
    examPoints: [
      "Modulo gives the remainder after division.",
      "A modulus defines the cycle or equivalence classes.",
      "Modular arithmetic is useful for repeating patterns.",
      "It is widely used in computer science and cryptography.",
    ],
    modernConnection:
      "Modular arithmetic is used in hashing, cryptography, checksums, cyclic data structures, scheduling and many computer algorithms.",
  },

  {
    id: "algorithmic",
    topic: "algorithmic",
    title: "Algorithmic Thinking in Indian Mathematics",
    keywords: [
      "algorithm",
      "algorithmic thinking",
      "procedure",
      "steps",
      "method",
      "problem solving",
      "computational thinking",
    ],
    summary:
      "Many mathematical traditions describe procedures as sequences of steps that can be applied systematically to solve problems.",
    explanation:
      "Algorithmic thinking means breaking a problem into clear, ordered operations. Ancient mathematical texts often present calculation procedures for arithmetic, algebra, geometry and astronomy. These procedures can be studied as examples of structured problem-solving without claiming that they were modern computer programs.",
    examples: [
      "Break a calculation into ordered steps.",
      "Apply the same rule repeatedly.",
      "Use an intermediate result to continue to the next stage.",
    ],
    examPoints: [
      "Algorithms are systematic procedures.",
      "Step-by-step mathematical methods encourage structured reasoning.",
      "Ancient procedures can be studied as examples of computational thinking.",
      "Historical mathematics should not be equated directly with modern software.",
    ],
    modernConnection:
      "Algorithmic thinking is central to programming, data structures, automation and computational problem-solving.",
  },

  {
    id: "modern-it",
    topic: "modern-it",
    title: "Indian Mathematics and Modern IT",
    keywords: [
      "modern it",
      "information technology",
      "computer",
      "computing",
      "programming",
      "computer science",
      "technology",
      "iks",
    ],
    summary:
      "Ancient Indian mathematics and modern IT are connected mainly through shared mathematical ideas such as positional representation, systematic procedures, patterns and modular arithmetic.",
    explanation:
      "Indian mathematical traditions can provide useful historical examples for understanding concepts that remain important in computing. Place-value notation demonstrates structured numerical representation, Pingala's combinatorial patterns provide a historical example of systematic pattern generation, and modular arithmetic remains directly useful in computer science. These are conceptual connections rather than claims of direct technological continuity.",
    examples: [
      "Place value → structured numerical representation.",
      "Pattern generation → combinatorial thinking.",
      "Modular arithmetic → cyclic computation and cryptography.",
      "Algorithmic procedures → step-by-step problem solving.",
    ],
    examPoints: [
      "IKS can provide historical context for mathematical ideas.",
      "Modern IT relies heavily on mathematics.",
      "Connections should be described as conceptual unless direct historical evidence exists.",
      "Mathematical reasoning supports programming and computational thinking.",
    ],
    modernConnection:
      "Mathematics remains foundational to programming, algorithms, cryptography, data representation and computer science.",
  },
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function searchKnowledge(question: string): KnowledgeItem[] {
  const text = normalize(question);
  const words = new Set(text.split(" "));

  const scored = KNOWLEDGE_BASE.map((item) => {
    let score = 0;

    for (const keyword of item.keywords) {
      const normalizedKeyword = normalize(keyword);

      if (text.includes(normalizedKeyword)) {
        score += normalizedKeyword.includes(" ") ? 8 : 5;
      }

      if (words.has(normalizedKeyword)) {
        score += 3;
      }
    }

    const topicWords = normalize(item.title).split(" ");
    for (const word of topicWords) {
      if (words.has(word)) score += 2;
    }

    return { item, score };
  });

  const relevant = scored
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((entry) => entry.item);

  if (relevant.length > 0) return relevant;

  return KNOWLEDGE_BASE.filter(
    (item) =>
      item.topic === "number-system" ||
      item.topic === "algorithmic" ||
      item.topic === "modern-it",
  ).slice(0, 3);
}

export function findKnowledge(question: string): KnowledgeItem {
  return searchKnowledge(question)[0];
}