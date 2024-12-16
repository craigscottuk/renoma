// cSpell:disable
import AnimatedLink from "@/components/animated-link";
import { PortableTextComponents } from "@portabletext/react";

const portableTextComponents: PortableTextComponents = {
  block: {
    // Handle default text blocks (e.g., paragraphs)
    normal: ({ children }) => <p className="mb-4 text-[1.1rem]">{children}</p>,
    h3: ({ children }) => (
      <h3 className="mb-8 font-bolder text-2xl text-[#81724D]">{children}</h3>
    ),
    h4: ({ children }) => (
      <h3 className="mb-6 font-bolder text-[1.1rem] text-black">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pb-4 pl-6">{children}</ul>
    ), // Add text-lg for larger bullets
    number: ({ children }) => <ol className="list-decimal pl-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="mb-2 text-[1.1rem]">{children}</li>
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
        <AnimatedLink
          href={value?.href}
          showArrow={false}
          className="text-gold underline"
          target={target}
        >
          {children}
        </AnimatedLink>
      );
    },
  },
};

export { portableTextComponents };
