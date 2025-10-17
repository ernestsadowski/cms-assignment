import { groq } from "next-sanity";

import Modules from "@/ui/modules";
import { fetchSanityLive } from "@/sanity/lib/fetch";
import { MODULES_QUERY } from "@/sanity/lib/queries";

async function get404() {
  return await fetchSanityLive<Sanity.Page>({
    query: groq`*[_type == 'page' && metadata.slug.current == '404'][0]{
			...,
			'modules': (
				// global modules (before)
				*[_type == 'global-module' && path == '*'].before[]{ ${MODULES_QUERY} }
				// page modules
				+ modules[]{ ${MODULES_QUERY} }
				// global modules (after)
				+ *[_type == 'global-module' && path == '*'].after[]{ ${MODULES_QUERY} }
			)
		}`,
  });
}

export async function generateMetadata() {
  return (await get404())?.metadata;
}

const NotFound = async () => {
  const page = await get404();

  if (!page)
    return (
      <h1 className="section heading-1 flex min-h-[50vh] items-center justify-center">
        404
      </h1>
    );

  return <Modules modules={page?.modules} />;
};

export default NotFound;
