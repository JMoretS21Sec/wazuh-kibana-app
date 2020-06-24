/*
 * Wazuh app - Get agents filter value
 * Copyright (C) 2015-2020 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import { WzRequest } from "../../../../../react-services/wz-request";

export async function getAgentFilterValues(field, value, filters = {}) {
  const filter = {
    ...filters,
    fields: field,
    limit: 30,
  };
  if (value) {
    filter["search"] = value;
  }
  const result = await WzRequest.apiReq(
    "GET",
    `/agents/stats/distinct`,
    filter
  );
  const getChild = (item, field) => {
    const subFields = field.split(".");
    if (subFields.length < 2) {
      return item[field];
    } else {
      const currentField = subFields.shift();
      if (!item[currentField]) {
        return "";
      }
      return getChild(item[currentField], subFields.join("."));
    }
  };

  const arrayResult = (((result || {}).data || {}).data || {}).items.map(
    (item) => {
      return getChild(item, field);
    }
  );
  return arrayResult.filter((item) => item && item.length);
}
