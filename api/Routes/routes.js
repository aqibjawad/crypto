const authRoutes = require("../Modules/Auth/Auth.routes");

const rechargeRoutes = require ("../Modules/Recharge/Recharge.Routes");

const addwalletRoutes = require ("../Modules/AddWallet/AddWallet.Route");

const aboutRoutes = require ("../Modules/About/About.Route");

const announcementRoutes = require ("../Modules/Announcement/Announcement.Route");

module.exports = function router(app) {
    app
      // Auth routes
      .use("/api/v1/auth", authRoutes)

      .use("/api/v1/recharge", rechargeRoutes)

      .use("/api/v1/addwallet", addwalletRoutes)

      .use("/api/v1/about", aboutRoutes)

      .use("/api/v1/announcements", announcementRoutes)
  
  };