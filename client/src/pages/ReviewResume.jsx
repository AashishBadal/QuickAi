import { FileText, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import axios from "axios";
import Markdown from "react-markdown";
import { notifyApiError } from "../lib/notify";
import {
  ToolLayout,
  Panel,
  PanelHeader,
  FieldLabel,
  SubmitButton,
  EmptyState,
} from "../components/ToolUI";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const fileInput =
  "w-full text-sm text-mid glass rounded-xl px-3.5 py-2.5 mt-2 cursor-pointer file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-primary/15 file:text-primary file:text-sm file:cursor-pointer";

const ReviewResume = () => {
  const [input, setInput] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", input);
      const { data } = await axios.post("/api/ai/resume-review", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setContent(data.content);
      } else {
        notifyApiError(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <ToolLayout>
      <Panel side="left">
        <form onSubmit={onSubmitHandler}>
          <PanelHeader Icon={Sparkles} title="Resume Review" accent="#00da83" />
          <FieldLabel>Upload Resume</FieldLabel>
          <input
            onChange={(e) => setInput(e.target.files[0])}
            type="file"
            accept="application/pdf"
            className={fileInput}
            required
          />
          <p className="text-xs text-low mt-2">Supports PDF resumes only.</p>
          <SubmitButton
            loading={loading}
            Icon={FileText}
            gradient="linear-gradient(135deg, #00da83, #009bb3)"
          >
            Review Resume
          </SubmitButton>
        </form>
      </Panel>

      <Panel side="right" className="flex flex-col">
        <PanelHeader Icon={FileText} title="Analysis Result" accent="#00da83" />
        {!content ? (
          <EmptyState Icon={FileText}>
            Upload a resume and click "Review Resume" to get started.
          </EmptyState>
        ) : (
          <div className="mt-4 h-full overflow-y-scroll md-body">
            <Markdown>{content}</Markdown>
          </div>
        )}
      </Panel>
    </ToolLayout>
  );
};

export default ReviewResume;
