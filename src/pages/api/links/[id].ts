import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../lib/mongodb";

export default async function linkHandle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db: mongodb } = await connectToDatabase();
  const tableLinks = mongodb.collection("links");

  const { method } = req;
  const { id } = req.query;

  const linkExists = await tableLinks.findOne({ id: id });

  if (!linkExists) {
    return res.status(404).send("User not found");
  }

  if (method === "GET") {
    return res.status(200).json(linkExists);
  }

  if (method === "PATCH") {
    const { title, url } = req.body;

    const link = {
      ...linkExists,
      title: title ? title : linkExists.title,
      url: url ? url : linkExists.url,
      updated_at: new Date(),
    };

    try {
      await tableLinks.updateOne(
        { id: id },
        {
          $set: { ...link },
        }
      );

      const linkUpdated = await tableLinks.findOne({ id: id });

      return res.status(202).json(linkUpdated);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }

  return res.status(404).send("");
}
