interface ContextHeaderProps {
  headline: string;
  subtext: string;
}

const ContextHeader = ({ headline, subtext }: ContextHeaderProps) => {
  return (
    <section className="border-b px-10 py-10">
      <h1 className="font-heading text-display text-foreground">{headline}</h1>
      <p className="mt-2 text-body-lg text-muted-foreground text-prose">{subtext}</p>
    </section>
  );
};

export default ContextHeader;
