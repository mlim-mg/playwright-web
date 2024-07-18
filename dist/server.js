"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const playwright_1 = require("playwright");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'index.html'));
});
app.post('/run-tests', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    const browser = yield playwright_1.chromium.launch();
    const page = yield browser.newPage();
    yield page.goto(url);
    // Add your test code here
    const title = yield page.title();
    yield browser.close();
    res.send({ title });
}));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
