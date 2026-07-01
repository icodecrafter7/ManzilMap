import { motion } from "framer-motion";

function Test() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ padding: "20px", background: "blue", color: "white" }}
    >
      Hello ManzilMap 🚀
    </motion.div>
  );
}

export default Test;