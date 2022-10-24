const SkeletonCard = () => {
  return (
    <div className="w-full border mx-auto">
      <div className="flex animate-pulse items-center h-full px-6 py-3 gap-10">
        <div className="bg-gray-300 w-12 h-12 rounded-full" />
        <div className="w-full h-8 bg-gray-300 rounded-lg" />
      </div>
    </div>
  );
};

export default SkeletonCard;
