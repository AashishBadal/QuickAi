import toast from "react-hot-toast";

/**
 * Detects whether a backend message is about hitting the free limit or a
 * premium-only feature, so we can upsell instead of showing a bare error.
 */
const isPremiumMessage = (message = "") =>
  /premium|upgrade|limit reached/i.test(message);

/**
 * Shows API error messages. For premium/limit messages it renders a richer
 * card explaining that this is a test build (no real payment needed) plus a
 * shortcut to the plans section.
 */
export const notifyApiError = (message) => {
  if (!isPremiumMessage(message)) {
    return toast.error(message || "Something went wrong");
  }

  toast.custom(
    (t) => (
      <div
        className={`max-w-sm w-full rounded-2xl border border-line bg-white/95 backdrop-blur-xl shadow-xl p-4 ${
          t.visible ? "animate-in" : "opacity-0"
        }`}
        style={{ boxShadow: "0 12px 30px -16px rgba(12,20,17,0.3)" }}
      >
        <p className="text-sm font-semibold text-[#0c1411]">
          ✨ This feature requires Premium
        </p>
        <p className="text-xs text-[#4b5563] mt-1.5 leading-relaxed">
          Heads up — this is a test version, so you don't need to spend any real
          money. Just open the plans page, click <b>Purchase</b>, and the
          premium features will unlock instantly so you can try everything out.
        </p>
        <div className="flex items-center gap-2 mt-3">
          <a
            href="/#pricing"
            onClick={() => toast.dismiss(t.id)}
            className="text-xs font-medium text-white px-4 py-2 rounded-lg"
            style={{
              background: "linear-gradient(135deg, #16a34a, #009bb3)",
            }}
          >
            View Plans
          </a>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-xs font-medium text-[#4b5563] px-3 py-2 rounded-lg hover:text-[#0c1411]"
          >
            Dismiss
          </button>
        </div>
      </div>
    ),
    { duration: 8000 }
  );
};
