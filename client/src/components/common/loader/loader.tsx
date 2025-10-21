export const Loader = () => {
  return (
    <div className="bg-background w-full h-full top-0 left-0 z-50 fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
      </div>
    </div>
  );
};
