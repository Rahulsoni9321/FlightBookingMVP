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
exports.AccessToken = void 0;
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
function AccessToken() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = qs_1.default.stringify({
                grant_type: "client_credentials",
                client_id: `${process.env.AMADEUS_API_KEY}`,
                client_secret: `${process.env.AMADEUS_API_SECRET}`,
            });
            let config = {
                method: "post",
                maxBodyLength: Infinity,
                url: "https://test.api.amadeus.com/v1/security/oauth2/token",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                data: data,
            };
            const response = yield axios_1.default.request(config);
            return response.data.access_token;
        }
        catch (error) {
            console.log(error);
            return { message: "Something went wrong while fetching Acess Token ." };
        }
    });
}
exports.AccessToken = AccessToken;
