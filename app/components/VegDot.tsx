export default function VegDot({ isVeg }: { isVeg: number }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-4 h-4 rounded-sm border-2 shrink-0 ${
        isVeg ? "border-[#60b246]" : "border-[#db3226]"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${isVeg ? "bg-[#60b246]" : "bg-[#db3226]"}`}
      />
    </span>
  );
}
