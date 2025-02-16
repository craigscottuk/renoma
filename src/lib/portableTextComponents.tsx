// cSpell:disable
import AnimatedLink from "@/components/animated-link";
import { PortableTextComponents } from "@portabletext/react";
import { Separator } from "@/components/ui/separator";

const portableTextComponents: PortableTextComponents = {
  block: {
    // Handle default text blocks (e.g., paragraphs)
    normal: ({ children }) => (
      <p className="mb-4 text-[1.1rem]">{children || "No content provided"}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-8 font-bolder text-[2rem] text-zinc-800">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-8 font-bolder text-[1.45rem] text-dullGold">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-3 mt-1 text-[1.1rem] font-bold text-zinc-950">
        {children}
      </h4>
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
    bullet: ({ children }) => <ul className="list-disc pl-6">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6">{children}</ol>,
    // Fallback for unsupported list types
    default: ({ children }) => (
      <ul className="list-none pb-4">
        <li>{children}</li>
      </ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="mb-2 list-disc text-[1.1rem]">{children}</li>
    ),
    number: ({ children }) => (
      <li className="mb-2 list-decimal text-[1.1rem]">{children}</li>
    ),
    // Fallback for unsupported list item types
    default: ({ children }) => (
      <li className="mb-2 text-[1.1rem]">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-regular tracking-wide text-zinc-900">
        {children}
      </strong>
    ),
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
    separator: () => <Separator className="mb-12 mt-12" />,
    // Fallback for unsupported types
    default: ({ value }) => (
      <div className="bg-zinc-100 p-4 text-red-500">
        <strong>Unsupported content type:</strong> {value?._type || "Unknown"}
      </div>
    ),
  },
  // Handle hard breaks (\n) explicitly
  hardBreak: () => <br />,
};

export { portableTextComponents };
