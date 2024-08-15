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
exports.FlightRoute = void 0;
const axios_1 = __importDefault(require("axios"));
const express_1 = require("express");
const _1 = require(".");
const router = (0, express_1.Router)();
exports.FlightRoute = router;
router.post("/flightdetails", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    // const draftdayId = req.query.dayid;
    try {
        const response = yield axios_1.default.get(`${process.env.AMADEUS_BASE_URL}/shopping/flight-offers`, {
            params: {
                originLocationCode: payload.Origin,
                destinationLocationCode: payload.Destination,
                departureDate: payload.StartDate,
                adults: payload.Adults,
                max: 5,
                nonStop: true
            },
            headers: {
                Authorization: `Bearer ${_1.AmadeusToken}`,
            },
        });
        return res.json({
            flightdetails: response.data.data,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong while getting flight details."
        });
    }
}));
