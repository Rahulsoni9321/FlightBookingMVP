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
exports.AmadeusToken = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const AmadeusToken_1 = require("./AmadeusToken");
const PlaceDetails_1 = require("./PlaceDetails");
const flights_1 = require("./flights");
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(express_1.default.json());
exports.AmadeusToken = "";
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield new Promise((resolve) => setTimeout(() => {
            //@ts-ignore
            resolve();
        }, 2000));
        exports.AmadeusToken = yield (0, AmadeusToken_1.AccessToken)();
        console.log(exports.AmadeusToken);
        setInterval(() => __awaiter(this, void 0, void 0, function* () {
            exports.AmadeusToken = yield (0, AmadeusToken_1.AccessToken)();
            console.log(exports.AmadeusToken);
        }), 1740000);
    });
})();
app.use("/api/v1", PlaceDetails_1.PlacesAPIrouter);
app.use("/api/v1/flights", flights_1.FlightRoute);
app.listen(port, () => {
    console.log(`App is listening is at ${port}`);
});
