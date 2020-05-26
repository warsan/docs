import path from "path";

export function s3BucketListing() {
  return {
    name: "s3-bucket-listing",
    plugins: {
      "@vuepress/register-components": {
        componentsDir: path.join(__dirname, "global-components"),
      },
    },
  };
}
