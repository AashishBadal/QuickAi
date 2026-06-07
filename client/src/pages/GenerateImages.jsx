import { Sparkles, Image } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import {
  ToolLayout,
  Panel,
  PanelHeader,
  FieldLabel,
  Chip,
  SubmitButton,
  EmptyState,
  inputClass,
} from "../components/ToolUI";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const ImageStyle = [
    "Realistic",
    "Ghibli style",
    "Anime style",
    "Cartoon style",
    "Fantasy style",
    "3D style",
    "Portrait style",
  ];
  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`;
      const { data } = await axios.post(
        "/api/ai/generate-image",
        { prompt, publish },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );
      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
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
          <PanelHeader Icon={Sparkles} title="AI Image Generator" accent="#10b981" />
          <FieldLabel>Describe Your Image</FieldLabel>
          <textarea
            rows={4}
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className={`${inputClass} resize-none`}
            placeholder="Describe what you want to see in the image"
            required
          />
          <FieldLabel>Style</FieldLabel>
          <div className="mt-3 flex gap-2.5 flex-wrap">
            {ImageStyle.map((item) => (
              <Chip
                key={item}
                active={selectedStyle === item}
                onClick={() => setSelectedStyle(item)}
              >
                {item}
              </Chip>
            ))}
          </div>
          <div className="my-6 flex items-center gap-2.5">
            <label className="relative cursor-pointer">
              <input
                type="checkbox"
                onChange={(e) => setPublish(e.target.checked)}
                checked={publish}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-black/15 rounded-full peer-checked:bg-primary transition-colors" />
              <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
            </label>
            <p className="text-sm text-mid">Make this image public</p>
          </div>
          <SubmitButton
            loading={loading}
            Icon={Image}
            gradient="linear-gradient(135deg, #059669, #10b981)"
          >
            Generate Image
          </SubmitButton>
        </form>
      </Panel>

      <Panel side="right" className="flex flex-col">
        <PanelHeader Icon={Image} title="Generated Image" accent="#10b981" />
        {!content ? (
          <EmptyState Icon={Image}>
            Describe an image and click "Generate Image" to get started.
          </EmptyState>
        ) : (
          <div className="mt-4 h-full">
            <img src={content} alt="Generated" className="w-full rounded-xl" />
          </div>
        )}
      </Panel>
    </ToolLayout>
  );
};

export default GenerateImages;
