module.exports = {
    module: {
        rules: [
            // `js` and `jsx` files are parsed using `babel`
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: ["babel-loader"],
            },
              // `ts` and `tsx` files are parsed using `ts-loader`
            {
              test: /\.(ts|tsx)$/,
              loader: "ts-loader"
            }
        ],
    },
    devtool: "source-map",
    resolve: {
        extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
    },
}