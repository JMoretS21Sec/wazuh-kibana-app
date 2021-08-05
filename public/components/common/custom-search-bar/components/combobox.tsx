/*
 * Wazuh app - React component Combobox
 * Copyright (C) 2015-2021 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import React, { useEffect, useState } from 'react';
import { EuiComboBox } from '@elastic/eui';
import { IValueSuggestion, useValueSuggestion } from '../../hooks';

export const Combobox = ({ item, onChange, selectedOptions }) => {
  const { suggestedValues, isLoading, setQuery }: IValueSuggestion = useValueSuggestion(
    item.key,
    item?.options
  );
  const [comboOptions, setComboOptions] = useState<{ key: any; label: any; value: any }[]>();

  useEffect(() => {
    if (!isLoading) {
      setComboOptions(
        suggestedValues
          .map((value, key) => ({
            key: key,
            label: value,
            value: item.key,
            filterByKey: item.filterByKey,
          }))
          .sort((a, b) => a.label - b.label)
      );
    }
  }, [suggestedValues, isLoading, setQuery]);

  const onSearch = (selectedOptions) => {
    setQuery(selectedOptions);
  };

  return (
    <EuiComboBox
      data-test-subj={`combobox-${item.key}`}
      placeholder={item.placeholder}
      className={'filters-custom-combobox'}
      options={comboOptions}
      isClearable={false}
      isLoading={isLoading}
      onSearchChange={onSearch}
      onChange={onChange}
      selectedOptions={selectedOptions}
    />
  );
};