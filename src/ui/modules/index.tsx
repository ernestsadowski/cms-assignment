import { createDataAttribute } from "next-sanity";

import CardList from "./CardList";
import CustomHTML from "./CustomHTML";
import Hero from "./Hero";
import HeroSplit from "./HeroSplit";
import RichtextModule from "./RichtextModule";
import SearchModule from "./SearchModule";
import FeatureSection from "./FeatureSection";

const MODULE_MAP = {
  "card-list": CardList,
  "custom-html": CustomHTML,
  hero: Hero,
  "hero.split": HeroSplit,
  "richtext-module": RichtextModule,
  "search-module": SearchModule,
  "feature-section": FeatureSection,
} as const;

const Modules = ({
  modules,
  page,
}: {
  modules?: Sanity.Module[];
  page?: Sanity.Page;
}) => {
  const getAdditionalProps = (_module: Sanity.Module) => ({});

  return (
    <>
      {modules?.map((module) => {
        if (!module) return null;

        const Component = MODULE_MAP[module._type as keyof typeof MODULE_MAP];

        if (!Component) return null;

        return (
          <Component
            {...module}
            {...getAdditionalProps(module)}
            data-sanity={
              !!page?._id &&
              createDataAttribute({
                id: page._id,
                type: page?._type,
                path: `page[_key == "${module._key}"]`,
              }).toString()
            }
            key={module._key}
          />
        );
      })}
    </>
  );
};

export default Modules;
