// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";

import { connectToDatabase } from "../lib/mongodb";

type Data = {
  name: string;
};

export default async function linksHandle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { db: mongodb } = await connectToDatabase();
  const tableLinks = mongodb.collection("links");
  const { method } = req;

  if (method === "POST") {
    const { title, url } = req.body;
    const titleExists = await tableLinks.findOne({ title: title });

    if (!title || !url) return res.status(400).send("");

    if (titleExists)
      return res
        .status(400)
        .json({ error: "There is already a link with the same title!" });

    const link = {
      id: v4(),
      title,
      url,
      created_at: new Date(),
      updated_at: new Date(),
    };

    try {
      const data = await tableLinks.insertOne(link);
      return res.status(201).json(link);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }

  if (method === "GET") {
    try {
      const data = await tableLinks.find().toArray();
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }

  return res.status(404).send("");
}
