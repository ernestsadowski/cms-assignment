import { draftMode } from "next/headers";
import { groq, VisualEditing } from "next-sanity";

import { fetchSanityLive } from "@/sanity/lib/fetch";

import DraftModeControls from "./DraftModeControls";

const VisualEditingControls = async () => {
  const globalModules = await fetchSanityLive<Sanity.GlobalModule[]>({
    query: groq`*[_type == 'global-module']{
			_id,
			path,
			excludePaths[]
		}`,
  });

  return (
    <>
      {(await draftMode()).isEnabled && (
        <>
          <VisualEditing />
          <DraftModeControls globalModules={globalModules} />
        </>
      )}
    </>
  );
};

export default VisualEditingControls;
