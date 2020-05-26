import axios from "axios";
import xml2js from "xml2js";

export class S3Client {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async listObjects(pathInBucket) {
    const response = await axios.get(this.baseUrl + pathInBucket, { responseType: "text" });
    let xmlAsString = response.data;
    let parsedXml = await xml2js.parseStringPromise(xmlAsString);
    return {
      maxResults: parsedXml.ListBucketResult.MaxKeys,
      returnedResults: parsedXml.ListBucketResult.Contents.length,
      results: parsedXml.ListBucketResult.Contents.map((entry) => {
        return {
          name: entry.Key[0],
          lastModified: entry.LastModified[0],
          size: entry.Size[0],
        };
      }),
    };
  }
}
