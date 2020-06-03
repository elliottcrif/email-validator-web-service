import { Router } from "express";
import { uniqueEmails } from "../util";
import { OK } from "http-status-codes";
const router = Router();

interface EmailValidationPostRequest {
  emails: string[];
}

interface EmailValidationResponse {
  uniqueEmails: number;
}

router.post("/email-validation", (req, res) => {
  const { emails } = req.body as EmailValidationPostRequest;
  const response: EmailValidationResponse = {
    uniqueEmails: uniqueEmails(emails),
  };
  return res.status(OK).json(response);
});

export default router;
