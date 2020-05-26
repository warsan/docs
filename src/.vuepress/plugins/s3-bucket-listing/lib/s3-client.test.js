/**
 * @jest-environment node
 */

import { S3Client } from "./s3-client";

describe("The S3Client", () => {
  let s3Client = new S3Client("https://s3.amazonaws.com/builds.handlebarsjs.com");

  it("should list all objects", async () => {
    let list = await s3Client.listObjects("/");
    console.log(list);
    expect(list).not.toBeNull();
  });
});
