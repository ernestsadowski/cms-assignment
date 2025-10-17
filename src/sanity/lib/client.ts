import { createClient } from "next-sanity";

import { projectId, dataset, apiVersion, readonlyToken } from "@/sanity/lib/env";
import { dev } from "@/lib/env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: !dev,
  token: readonlyToken,
  stega: {
    studioUrl: "/admin",
  },
});
