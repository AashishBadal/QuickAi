import { Scissors, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import axios from "axios";
import { notifyApiError } from "../lib/notify";
import {
  ToolLayout,
  Panel,
  PanelHeader,
  FieldLabel,
  SubmitButton,
  EmptyState,
  inputClass,
} from "../components/ToolUI";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const fileInput =
  "w-full text-sm text-mid glass rounded-xl px-3.5 py-2.5 mt-2 cursor-pointer file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-primary/15 file:text-primary file:text-sm file:cursor-pointer";

const RemoveObject = () => {
  const [input, setInput] = useState("");
  const [object, setObject] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (object.split(" ").length > 1) {
        setLoading(false);
        return toast("Please enter only one object name");
      }
      const formData = new FormData();
      formData.append("image", input);
      formData.append("object", object);
      const { data } = await axios.post(
        "/api/ai/remove-image-object",
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
          <PanelHeader Icon={Sparkles} title="Object Remover" accent="#4a7aff" />
          <FieldLabel>Upload Image</FieldLabel>
          <input
            onChange={(e) => setInput(e.target.files[0])}
            type="file"
            accept="image/*"
            className={fileInput}
            required
          />
          <FieldLabel>Describe object to remove</FieldLabel>
          <textarea
            onChange={(e) => setObject(e.target.value)}
            value={object}
            rows={4}
            className={`${inputClass} resize-none`}
            placeholder="e.g. watch or spoon — only a single object name"
            required
          />
          <SubmitButton
            loading={loading}
            Icon={Scissors}
            gradient="linear-gradient(135deg, #417DF6, #2563EB)"
          >
            Remove Object
          </SubmitButton>
        </form>
      </Panel>

      <Panel side="right" className="flex flex-col">
        <PanelHeader Icon={Scissors} title="Processed Image" accent="#4a7aff" />
        {!content ? (
          <EmptyState Icon={Scissors}>
            Upload an image and click "Remove Object" to get started.
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

export default RemoveObject;
