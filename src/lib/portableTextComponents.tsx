// cSpell:disable
import { PortableTextComponents } from "@portabletext/react";

const portableTextComponents: PortableTextComponents = {
  block: {
    // Handle default text blocks (e.g., paragraphs)
    normal: ({ children }) => <p className="mb-6 text-[1.1rem]">{children}</p>,
    h3: ({ children }) => (
      <h3 className="mb-8 font-bolder text-2xl text-[#81724D]">{children}</h3>
    ),
    h4: ({ children }) => (
      <h3 className="mb-6 font-bolder text-[1.1rem] text-black">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-square pl-6">{children}</ul>, // Use list-square for square bullets
    number: ({ children }) => <ol className="list-decimal pl-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="mb-0 text-[1.1rem]">{children}</li>
    ),
    number: ({ children }) => <li className="mb-0">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bolder">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const target = value?.href?.startsWith("http") ? "_blank" : "_self";
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-blue-600 underline"
        >
          {children}
        </a>
      );
    },
  },
};

export { portableTextComponents };
