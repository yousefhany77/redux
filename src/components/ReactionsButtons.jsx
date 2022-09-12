import { useAddReactionMutation } from "../features/postSlice";
import "./reactions.css";
const reactionsEmoji = {
  like: "👍",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
  wow: "😲",
};
const ReactionsButtons = ({ post }) => {
  const [addReaction] = useAddReactionMutation();
  const reactions = Object.entries(reactionsEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reaction-btn"
        onClick={() => {
          const newValue = post.reactions[name] + 1;
          addReaction({
            postId: post.id,
            reactions: { ...post.reactions, [name]: newValue },
          });
        }}
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });

  return <div className="reactions">{reactions}</div>;
};

export default ReactionsButtons;
