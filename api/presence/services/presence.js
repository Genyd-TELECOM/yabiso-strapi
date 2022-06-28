"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */
const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  async createPresence(ctx) {
    const { statut, eleve, date } = ctx.request.body;
    const { nom, post_nom, prenom, Numero_parent_telephone } = await strapi
      .query("eleve")
      .model.findOne({ id: eleve });
    const createPresence = await strapi
      .query("presence")
      .model.create({ statut, eleve, date });

    await strapi.services.sms.sendSMS(
      `+243${Numero_parent_telephone}`,
      `${prenom} ${nom} ${post_nom} est ${statut} en classe`
    );
    ctx.send(
      {
        data: createPresence,
        message: `${prenom} ${nom} ${post_nom} est ${statut} en classe`,
      },
      200
    );
  },
};
