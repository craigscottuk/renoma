// cSpell:disable
import AnimatedLink from "@/components/animated-link";
import { PortableTextComponents } from "@portabletext/react";

const portableTextComponents: PortableTextComponents = {
  block: {
    // Handle default text blocks (e.g., paragraphs)
    normal: ({ children }) => (
      <p className="mb-4 text-[1.1rem]">{children || "No content provided"}</p>
    ),
    h3: ({ children }) => (
      <h3 className="mb-8 text-2xl font-bold text-[#81724D]">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-6 text-[1.1rem] font-bold text-zinc-950">{children}</h4>
    ),
    // Fallback for unsupported block styles
    default: ({ children, value }) => (
      <div className="bg-yellow-100 p-2">
        <strong>Unsupported block style:</strong> {value?._type || "Unknown"}
        {children}
      </div>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pb-4 pl-6">{children}</ul>
    ),
    number: ({ children }) => <ol className="list-decimal pl-4">{children}</ol>,
    // Fallback for unsupported list types
    default: ({ children }) => (
      <ul className="list-none pb-4 pl-6">
        <li>{children}</li>
      </ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="mb-2 text-[1.1rem]">{children}</li>
    ),
    number: ({ children }) => <li className="mb-0">{children}</li>,
    // Fallback for unsupported list item types
    default: ({ children }) => <li className="mb-2">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      if (!value?.href) {
        // Fallback for missing href
        return <span className="text-red-500">[Invalid Link]</span>;
      }

      const target = value.href.startsWith("http") ? "_blank" : "_self";
      const rel = target === "_blank" ? "noopener noreferrer" : undefined;

      return (
        <AnimatedLink
          href={value.href}
          showArrow={false}
          className="text-gold underline"
          target={target}
          rel={rel}
        >
          {children}
        </AnimatedLink>
      );
    },
    // Fallback for unsupported marks
    default: ({ children, value }) => (
      <span className="text-red-500">
        Unsupported mark: {value?._type || "Unknown"} {children}
      </span>
    ),
  },
  types: {
    // Add custom components for specific block types (e.g., image, hero, callToAction)
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return (
          <div className="text-red-500">
            <strong>Invalid image:</strong> No image reference found.
          </div>
        );
      }
      return (
        <img
          src={`https://cdn.sanity.io/images/your-project-id/${value.asset._ref}`}
          alt={value.alt || "Default alt text"}
          className="rounded shadow-md"
        />
      );
    },
    // Fallback for unsupported types
    default: ({ value }) => (
      <div className="bg-gray-100 p-4 text-red-500">
        <strong>Unsupported content type:</strong> {value?._type || "Unknown"}
      </div>
    ),
  },
  // Handle hard breaks (\n) explicitly
  hardBreak: () => <br />,
};

export { portableTextComponents };
