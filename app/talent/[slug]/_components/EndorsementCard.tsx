interface EndorsementCardProps {
  quote: string;
  author: string;
}

export function EndorsementCard({ quote, author }: EndorsementCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-5 bg-gradient-to-br from-purple-50 to-blue-50 space-y-3">
      <h4 className="font-semibold text-[#01317F] text-lg">Endorsement</h4>
      <p className="text-gray-700 italic leading-relaxed">"{quote}"</p>
      <p className="text-gray-600 text-sm text-right">— {author}</p>
    </div>
  );
}