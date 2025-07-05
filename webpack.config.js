const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    entry: "./src/index.tsx",
    mode: "development",
    devServer: {
        port: 8001,
        historyApiFallback: true
    },
    output: {
        publicPath: "auto"
    },
    module: {
        rules: [
            {
                test: /\.(tsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset/resource"
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "app1",
            filename: "remoteEntry.js",
            exposes: {
                "./Widget": "./src/components/Widget",
                "./Form": "./src/components/Form",
                "./App": "./src/App"
            }/*,
            shared: {
                react: { singleton: true, requiredVersion: "^18.2.0" },
                "react-dom": { singleton: true, requiredVersion: "^18.2.0" }
            }*/
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        })
    ],
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    }
};
