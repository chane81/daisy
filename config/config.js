const env = process.env.NODE_ENV || 'development'; // 'development' or 'production'
//const gubun = env === "development" ? "DEV." : "PROD.";

// process.env[`${gubun}.SOCKET_SERVER_HOST`]과 같은 형태로 받을려고 했으나 undefined 가 되므로 불가함

const development = {
	
}

const production = {

}


const config = {
	development,
	production
};

module.exports = config[env];