interface Props {
  code: string;
  currentLine: number;
}

export default function CodePanel({ code, currentLine }: Props) {
  const lines = code.split("\n");

  return (
    <div className="h-full overflow-auto rounded-lg bg-gray-900 p-4 font-mono text-sm leading-6 whitespace-pre">
      {lines.map((line, i) => {
        const lineNum = i + 1;//当前行号
        const isActive = lineNum === currentLine;//是否高亮布尔类型
        return (
          <div
            key={i}
            className={`flex transition-colors duration-200 ${
              isActive ? "bg-blue-500/20 border-l-2 border-blue-400" : "border-l-2 border-transparent"
            }`}
          >
            <span className="mr-4 inline-block w-8 shrink-0 text-right text-gray-500 select-none">
              {lineNum}
            </span>
            <span className={`${isActive ? "text-white" : "text-gray-300"}`}>
              {line || " "}
            </span>
          </div>
        );
      })}
    </div>
  );
}
