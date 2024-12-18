type Props = {
  title: string;
  href: string;
};

export default function ExternalLink({ href, title }: Props) {
  return (
    <a className="" href={href} rel="noreferrer" target="_blank">
      <p className="mt-1 text-[1.1rem] text-zinc-100">
        {title} <span className="ml-2 inline-block">→</span>
      </p>
    </a>
  );
}
