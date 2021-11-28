import path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const __dirname = path.resolve();
const isProduction = process.env.NODE_ENV === "production";

export default {
    entry: "./src/server.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "server.bundle.cjs",
    },
    target: "node",
    plugins: [
        new CleanWebpackPlugin(),
    ],
    mode: isProduction ? "production" : "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: "babel-loader",
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: "asset",
            },
        ],
    },
};
