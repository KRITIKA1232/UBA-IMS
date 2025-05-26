
import app from './server'; 

// const app = require("./server").default; // ✅ CommonJS import

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
