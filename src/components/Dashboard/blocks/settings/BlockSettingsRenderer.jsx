import HeroSliderSettings from "./HeroSliderSettings";
import GallerySettings from "./GallerySettings";
import PartnerSliderSettings from "./PartnerSliderSettings";
import AdvertiseSettings from "./AdvertiseSettings";

export default function BlockSettingsRenderer({ block, onChange }) {
  switch (block.block_type) {
    case "hero_slider":
      return <HeroSliderSettings value={block.settings} onChange={onChange} />;

    case "gallery":
      return <GallerySettings value={block.settings} onChange={onChange} />;

    case "partner_slider":
      return <PartnerSliderSettings value={block.settings} onChange={onChange} />;

    case "advertise": // ✅ NEW
      return <AdvertiseSettings value={block.settings} onChange={onChange} />;

    default:
      return null;
  }
}
