interface LoadingProps {
  text?: string;
}

export default function Loading({ text = "加载中..." }: LoadingProps) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-500" />
        <p className="text-sm text-gray-400">{text}</p>
      </div>
    </div>
  );
}
