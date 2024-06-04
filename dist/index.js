"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routing_controllers_1 = require("routing-controllers");
const userController_1 = require("./controllers/userController");
const dataBase_1 = require("./dataBase");
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
dataBase_1.DB.initialize()
    .then(() => {
    console.log("Database has been initialized");
})
    .catch((err) => {
    console.error("Error during Database initialization:", err);
});
const app = (0, routing_controllers_1.createExpressServer)({
    controllers: [userController_1.UserController],
    validation: true
});
const server = (0, express_1.default)();
server.use(body_parser_1.default.json());
server.use(body_parser_1.default.urlencoded({ extended: true }));
server.use(express_1.default.static(path_1.default.join(__dirname, "images")));
(0, routing_controllers_1.useExpressServer)(server, {});
const PORT = 3000;
server.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
