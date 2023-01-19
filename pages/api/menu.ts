// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  menu: string[];
};

export default function menu(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({
    menu: [
      "รายวิชา",
      "การทดสอบ",
      "รายชื่อ",
      "เพิ่มผู้สอน",
      "คลังข้อสอบ",
      "คะแนน",
      "วิเคราะห์ข้อมูล",
    ],
  });
}
