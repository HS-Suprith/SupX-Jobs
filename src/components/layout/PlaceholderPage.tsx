interface PlaceholderPageProps {
  title: string;
}

const PlaceholderPage = ({ title }: PlaceholderPageProps) => {
  return (
    <div className="flex flex-1 items-center justify-center px-10 py-24">
      <div className="text-center">
        <h1 className="font-heading text-display text-foreground">{title}</h1>
        <p className="mt-4 text-body text-muted-foreground">
          This section will be built in the next step.
        </p>
      </div>
    </div>
  );
};

export default PlaceholderPage;
