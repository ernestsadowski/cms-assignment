import { groq } from "next-sanity";

import errors from "@/lib/errors";

import { fetchSanityLive } from "./fetch";

export const LINK_QUERY = `
	...,
	internal->{
		_type,
		title,
		metadata
	}
`;

export const IMAGE_QUERY = `
	...,
	'lqip': @.asset->metadata.lqip
`;

const ASSET_IMG_QUERY = `
	...,
	image { ${IMAGE_QUERY} }
`;

const RICHTEXT_QUERY = `
	...,
	_type == 'image' => { ${IMAGE_QUERY} },
	...select(
		defined(markDefs) && count(markDefs) > 0 => {
			"markDefs": markDefs[]{
				...,
				${LINK_QUERY}
			}
		},
		{}
	)
`;

const CTA_QUERY = `
	...,
	link{ ${LINK_QUERY} }
`;

export const MODULES_QUERY = `
	...,
	ctas[]{
		...,
		link{ ${LINK_QUERY} }
	},
	_type == 'card-list' => {
		cards[]{
			...,
			ctas[]{ ${CTA_QUERY} }
		}
	},
	_type == 'hero' => {
		content[]{
			${RICHTEXT_QUERY}
		},
		assets[]{
			...,
			_type == 'img' => { ${ASSET_IMG_QUERY} }
		}
	},
	_type == 'hero.split' => {
		content[]{
			${RICHTEXT_QUERY}
		},
		assets[]{
			...,
			_type == 'img' => { ${ASSET_IMG_QUERY} }
		}
	},
	_type == 'richtext-module' => {
		content[]{
			${RICHTEXT_QUERY}
		},
		'headings': select(
			tableOfContents => content[style in ['h2', 'h3', 'h4', 'h5', 'h6']]{
				style,
				'text': pt::text(@)
			}
		),
	},
`;

export const GLOBAL_MODULE_EXCLUDE_QUERY = `
    select(
        defined(excludePaths) => count(excludePaths[string::startsWith($slug, @)]) == 0,
        true
    )
`;

export const GLOBAL_MODULE_PATH_QUERY = `
	string::startsWith($slug, path)
	&& ${GLOBAL_MODULE_EXCLUDE_QUERY}
`;

export const TRANSLATIONS_QUERY = `
	'translations': *[_type == 'translation.metadata' && references(^._id)].translations[].value->{
		'slug': metadata.slug.current,
		language
	}
`;

export async function getSite() {
  const site = await fetchSanityLive<Sanity.Site>({
    query: groq`
			*[_type == 'site'][0]{
				...,
				'ogimage': ogimage.asset->url
			}
		`,
  });

  if (!site) throw new Error(errors.missingSiteSettings);

  return site;
}

export async function getHeader() {
  const header = await fetchSanityLive<Sanity.Header>({
    query: groq`
			*[_type == 'header'][0]{
				...,
				logo { ${IMAGE_QUERY} },
				menu[]{
					${LINK_QUERY},
					link{ ${LINK_QUERY} },
					links[]{ ${LINK_QUERY} }
				},
				ctas[]{ ${CTA_QUERY} }
			}
		`,
  });

  if (!header) throw new Error(errors.missingHeaderSettings);

  return header;
}

export async function getFooter() {
  const footer = await fetchSanityLive<Sanity.Footer>({
    query: groq`
			*[_type == 'footer'][0]{
				...,
				logo{ ${IMAGE_QUERY} },
				social[]{ ${LINK_QUERY} },
				navigation[]{
					...,
					links[]{ ${LINK_QUERY} }
				},
				importantLinks[]{ ${LINK_QUERY} }
			}
		`,
  });

  if (!footer) throw new Error(errors.missingFooterSettings);

  return footer;
}

export async function getTranslations() {
  return await fetchSanityLive<Sanity.Translation[]>({
    query: groq`*[_type == 'page' && defined(language)]{
			'slug': '/' + select(
				metadata.slug.current != 'index' => metadata.slug.current,
				''
			),
			'translations': *[_type == 'translation.metadata' && references(^._id)].translations[].value->{
				'slug': '/' + select(
					metadata.slug.current != 'index' => language + '/' + metadata.slug.current,
					language
				),
				language
			}
		}`,
  });
}
