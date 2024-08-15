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
exports.PlacesAPIrouter = void 0;
const axios_1 = __importDefault(require("axios"));
const express_1 = require("express");
const _1 = require(".");
const router = (0, express_1.Router)();
exports.PlacesAPIrouter = router;
router.get("/place", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const placename = req.query.name || "";
    try {
        const response = yield axios_1.default.get(`https://test.api.amadeus.com/v1/reference-data/locations/cities?keyword=${placename}&max=10&include=AIRPORTS`, {
            headers: {
                Authorization: `Bearer ${_1.AmadeusToken}`
            }
        });
        return res.json({
            Placedetails: response.data.data
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "No such Place Exist"
        });
    }
}));
