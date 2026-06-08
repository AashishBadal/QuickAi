import { HashIcon, Sparkles } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import axios from "axios";
import { notifyApiError } from "../lib/notify";
import { useAuth } from "@clerk/clerk-react";
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

const BlogTitles = () => {
  const blogCategories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory}`;
      const { data } = await axios.post(
        "/api/ai/generate-blog-title",
        { prompt },
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
          <PanelHeader Icon={Sparkles} title="AI Title Generator" accent="#f59e0b" />
          <FieldLabel>Keyword</FieldLabel>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            className={inputClass}
            placeholder="The future of artificial intelligence is..."
            required
          />
          <FieldLabel>Category</FieldLabel>
          <div className="mt-3 flex gap-2.5 flex-wrap">
            {blogCategories.map((item) => (
              <Chip
                key={item}
                active={selectedCategory === item}
                onClick={() => setSelectedCategory(item)}
              >
                {item}
              </Chip>
            ))}
          </div>
          <SubmitButton
            loading={loading}
            Icon={HashIcon}
            gradient="linear-gradient(135deg, #f59e0b, #d97706)"
          >
            Generate Title
          </SubmitButton>
        </form>
      </Panel>

      <Panel side="right" className="flex flex-col">
        <PanelHeader Icon={HashIcon} title="Generated Titles" accent="#f59e0b" />
        {!content ? (
          <EmptyState Icon={HashIcon}>
            Enter a keyword and click "Generate Title" to get started.
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

export default BlogTitles;
