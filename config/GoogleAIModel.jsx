// from: https://aistudio.google.com/app/prompts/new_chat

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


export const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
        {
            role: "user",
            parts: [
                { text: "reference to: \n{\n   \"time\": 1550476186479,\n   \"blocks\": [\n      {\n         \"id\": \"oUq2g_tl8y\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"Editor.js\",\n            \"level\": 2\n         }\n      },\n      {\n         \"id\": \"zbGZFPM-iI\",\n         \"type\": \"paragraph\",\n         \"data\": {\n            \"text\": \"Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.\"\n         }\n      },\n      {\n         \"id\": \"qYIGsjS5rt\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"Key features\",\n            \"level\": 3\n         }\n      },\n      {\n         \"id\": \"XV87kJS_H1\",\n         \"type\": \"list\",\n         \"data\": {\n            \"style\": \"unordered\",\n            \"items\": [\n               \"It is a block-styled editor\",\n               \"It returns clean data output in JSON\",\n               \"Designed to be extendable and pluggable with a simple API\"\n            ]\n         }\n      },\n      {\n         \"id\": \"AOulAjL8XM\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"What does it mean «block-styled editor»\",\n            \"level\": 3\n         }\n      },\n      {\n         \"id\": \"cyZjplMOZ0\",\n         \"type\": \"paragraph\",\n         \"data\": {\n            \"text\": \"Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\\\"cdx-marker\\\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core.\"\n         }\n      }\n   ],\n   \"version\": \"2.8.1\"\n}\n" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"time\": 1678884641947,\n  \"blocks\": [\n    {\n      \"id\": \"zQ5J5J8Q\",\n      \"type\": \"header\",\n      \"data\": {\n        \"text\": \"Grocery TODO List\",\n        \"level\": 1\n      }\n    },\n    {\n      \"id\": \"Z87H4L9F\",\n      \"type\": \"paragraph\",\n      \"data\": {\n        \"text\": \"This is your grocery list. Add items and mark them as completed.\"\n      }\n    },\n    {\n      \"id\": \"pO5U74D9\",\n      \"type\": \"list\",\n      \"data\": {\n        \"style\": \"unordered\",\n        \"items\": [\n          \"Milk\",\n          \"Eggs\",\n          \"Bread\"\n        ]\n      }\n    }\n  ],\n  \"version\": \"2.8.1\"\n}\n```\n\n**Explanation:**\n\n* **\"time\"**: This represents the timestamp when the JSON was created.\n* **\"blocks\"**: An array containing the individual blocks of content.\n*   * **\"id\"**: Unique identifier for each block.\n*   * **\"type\"**: The type of block, e.g., \"header\", \"paragraph\", \"list\".\n*   * **\"data\"**: The data associated with the block:\n    * **\"header\"**: Contains the text and level (e.g., \"h1\", \"h2\").\n    * **\"paragraph\"**: Contains the text.\n    * **\"list\"**:  Contains the list style (ordered or unordered) and the items in the list.\n* **\"version\"**:  The version of the Editor.js library used to generate this content.\n\n**How to Use This Template:**\n\n1.  **Integration:** Integrate this JSON template into your Editor.js-powered application. You'll likely have functions to load, save, and manipulate this JSON data.\n2.  **Customization:**  Add custom blocks as needed. Editor.js is extendable, allowing you to create custom blocks for specific functionalities. \n3.  **Data Storage:**  Use a database (e.g., MongoDB, PostgreSQL) or local storage to persistently store and retrieve the grocery list data.\n\n**Possible Enhancements:**\n\n*   **Custom Blocks:** Create custom blocks for:\n    *   **Checkboxes:** To mark items as completed.\n    *   **Input Fields:** For adding new items to the list.\n    *   **Categories:** To categorize grocery items (e.g., \"Produce\", \"Dairy\", \"Bakery\").\n*   **Sorting:**  Implement functionality to sort items in the list alphabetically, by priority, or by category.\n*   **Editing:** Allow users to edit existing list items.\n*   **User Authentication:**  If you're building a multi-user application, consider adding user authentication so users can manage their own grocery lists.\n\nRemember, this template is a starting point. You can extend it to build a fully functional grocery TODO list app with Editor.js. \n" },
            ],
        },
    ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
