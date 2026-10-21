export default function SubHeading({
  children,
  visible,
}: {
  children: React.ReactNode;
  visible: boolean;
}) {
  return (
    <div
      className="flex items-center gap-4 mb-3"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease" }}
    >
      <h3 className="font-mono text-[#4a5568] dark:text-gray-400 text-xs tracking-[0.1em] uppercase shrink-0">
        {children}
      </h3>
      <span className="h-px flex-1 bg-[rgba(15,22,38,0.12)] dark:bg-gray-800" />
    </div>
  );
}
