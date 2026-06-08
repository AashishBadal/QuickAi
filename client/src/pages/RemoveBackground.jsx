import { Eraser, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
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

const RemoveBackground = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", input);
      const { data } = await axios.post(
        "/api/ai/remove-image-background",
        formData,
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
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
          <PanelHeader Icon={Sparkles} title="Background Remover" accent="#ff4938" />
          <FieldLabel>Upload Image</FieldLabel>
          <input
            onChange={(e) => setInput(e.target.files[0])}
            type="file"
            accept="image/*"
            className={fileInput}
            required
          />
          <p className="text-xs text-low mt-2">
            Supports JPG, PNG, and other image formats.
          </p>
          <SubmitButton
            loading={loading}
            Icon={Eraser}
            gradient="linear-gradient(135deg, #F6AB41, #FF4938)"
          >
            Remove Background
          </SubmitButton>
        </form>
      </Panel>

      <Panel side="right" className="flex flex-col">
        <PanelHeader Icon={Eraser} title="Processed Image" accent="#ff4938" />
        {!content ? (
          <EmptyState Icon={Eraser}>
            Upload an image and click "Remove Background" to get started.
          </EmptyState>
        ) : (
          <div className="mt-4 h-full">
            <img src={content} alt="Processed" className="w-full rounded-xl" />
          </div>
        )}
      </Panel>
    </ToolLayout>
  );
};

export default RemoveBackground;
