type InfoItemProps = {
  number: string;
  title: string;
  description: string;
};

export default function InfoItem({ number, title, description }: InfoItemProps) {
  return (
    <div>
      <h4 className="font-semibold text-base-green">
        {number}. {title}
      </h4>
      <p className="ml-4 text-sm text-base-green">{description}</p>
    </div>
  );
}
