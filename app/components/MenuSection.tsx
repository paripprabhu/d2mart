import { MenuSection as MenuSectionType } from "@/app/lib/types";
import MenuItemComponent from "./MenuItem";

interface Props {
  section: MenuSectionType;
  restaurantId: number;
  restaurantName: string;
}

export default function MenuSection({ section, restaurantId, restaurantName }: Props) {
  return (
    <div id={`section-${section.id}`} className="mb-4">
      <h3 className="text-base font-bold text-[#3d4152] py-3 border-b-2 border-[#f0f0f5] flex items-center justify-between">
        {section.name}
        <span className="text-xs text-[#93959f] font-normal">{section.items.length} items</span>
      </h3>
      {section.items.map((item) => (
        <MenuItemComponent
          key={item.id}
          item={item}
          restaurantId={restaurantId}
          restaurantName={restaurantName}
        />
      ))}
    </div>
  );
}
