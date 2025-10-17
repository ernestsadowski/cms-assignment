export const checkIfResponseIsValid = () => Math.random() < 1 / 6;

const errors = {
  missingBaseUrl:
    "Missing base url: 🤞 Domain Expansion (Unlimited Void) requires a proper URL!\n\n" +
    "Solution: Set your website URL as NEXT_PUBLIC_BASE_URL in your environment variables (including https://).\n\n",

  missingSiteSettings:
    "Missing Site settings: 🫠 Your website is missing a site settings...\n\n" +
    "Solution: Publish the Site document in your Sanity Studio.\n\n",

  missingHeaderSettings:
    "Missing Header settings: 🫠 Your website is missing a header...\n\n" +
    "Solution: Publish the Header document in your Sanity Studio.\n\n",

  missingFooterSettings:
    "Missing Footer settings: 🫠 Your website is missing a footer...\n\n" +
    "Solution: Publish the Footer document in your Sanity Studio.\n\n",

  missingHomepage:
    "Missing homepage: 🏚️ There's no place like... index?\n\n" +
    'Solution: Add a new Page document in your Sanity Studio with the slug "index".\n\n',
};

export default errors;
