import { useState } from "react";
import { Bot, Send, X, Check, X as XIcon } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const AISidebar = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [preview, setPreview] = useState(null);
  const { sendAIMessage } = useChatStore();

  const generatePreview = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      const { data } = await axiosInstance.post("/messages/ai/preview", {
        prompt: prompt.trim(),
      });
      setPreview(data.response);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to generate preview");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendMessage = async () => {
    if (!preview) return;

    try {
      await sendAIMessage(preview);
      setPrompt("");
      setPreview(null);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to send AI message");
    }
  };

  const handleReject = () => {
    setPreview(null);
  };

  return (
    <div className="w-64 border-l border-base-300 bg-base-200 flex flex-col">
      <div className="p-4 border-b border-base-300 flex items-center gap-2">
        <Bot className="size-5 text-primary" />
        <h2 className="font-semibold">AI Assistant</h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {preview ? (
          <div className="space-y-4">
            <div className="p-3 rounded-lg border border-base-300 bg-base-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Preview</span>
                <button
                  onClick={handleReject}
                  className="btn btn-ghost btn-xs"
                  type="button"
                >
                  <XIcon className="size-4" />
                </button>
              </div>
              <p className="text-sm whitespace-pre-wrap">{preview}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSendMessage}
                className="btn btn-primary btn-sm flex-1"
                disabled={isGenerating}
              >
                <Check className="size-4 mr-1" />
                Send
              </button>
              <button
                onClick={handleReject}
                className="btn btn-ghost btn-sm flex-1"
                disabled={isGenerating}
              >
                <XIcon className="size-4 mr-1" />
                Reject
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-base-content/70">
            Type your message below and I'll generate a response for you to review.
          </p>
        )}
      </div>

      <form onSubmit={generatePreview} className="p-4 border-t border-base-300">
        <div className="flex gap-2">
          <input
            type="text"
            className="w-0 flex-1 input input-bordered input-sm"
            placeholder="Type your message..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isGenerating}
          />
          <button
            type="submit"
            className="btn btn-primary btn-square btn-md flex-shrink-0"
            disabled={!prompt.trim() || isGenerating}
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AISidebar; 