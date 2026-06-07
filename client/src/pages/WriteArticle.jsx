import { Edit, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
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

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: "Short (500-800 words)" },
    { length: 1200, text: "Medium (800-1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Write an article about ${input} in ${selectedLength.text}`;
      const { data } = await axios.post(
        "/api/ai/generate-article",
        { prompt, length: selectedLength.length },
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
          <PanelHeader Icon={Sparkles} title="Article Configuration" accent="#4A7AFF" />
          <FieldLabel>Article Topic</FieldLabel>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            className={inputClass}
            placeholder="The future of artificial intelligence is..."
            required
          />
          <FieldLabel>Article Length</FieldLabel>
          <div className="mt-3 flex gap-2.5 flex-wrap">
            {articleLength.map((item, index) => (
              <Chip
                key={index}
                active={selectedLength.text === item.text}
                onClick={() => setSelectedLength(item)}
              >
                {item.text}
              </Chip>
            ))}
          </div>
          <SubmitButton
            loading={loading}
            Icon={Edit}
            gradient="linear-gradient(135deg, #226BFF, #65ADFF)"
          >
            Generate Article
          </SubmitButton>
        </form>
      </Panel>

      <Panel side="right" className="flex flex-col">
        <PanelHeader Icon={Edit} title="Generated Article" accent="#4A7AFF" />
        {!content ? (
          <EmptyState Icon={Edit}>
            Enter a topic and click "Generate Article" to get started.
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

export default WriteArticle;
