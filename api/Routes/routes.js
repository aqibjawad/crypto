const authRoutes = require("../Modules/Auth/Auth.routes");

const rechargeRoutes = require ("../Modules/Recharge/Recharge.Routes");

const witdarwalRoutes = require ("../Modules/Witdarwal/Withdarwal.Route");

module.exports = function router(app) {
    app
      // Auth routes
      .use("/api/v1/auth", authRoutes)

      .use("/api/v1/recharge", rechargeRoutes)

      .use("/api/v1/witdarwal", witdarwalRoutes)
  
  };