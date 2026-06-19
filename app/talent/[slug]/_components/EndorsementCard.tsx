interface EndorsementCardProps {
  quote: string;
  author: string;
}

export function EndorsementCard({ quote, author }: EndorsementCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-white space-y-3">
      <h4 className="font-bold text-blue-900 text-base">Endorsement</h4>
      <p className="text-gray-700 text-sm italic">{quote}</p>
      <p className="text-gray-600 text-sm text-right">— {author}</p>
    </div>
  );
}